<?php
declare(strict_types=1);
require __DIR__ . '/../app/bootstrap.php';

/**
 * Restrict CORS to the configured frontend origin only (no wildcard).
 * Next.js same-origin proxy is preferred for admin; contact may be called cross-origin in some setups.
 */
function applyCors(bool $withCredentials = false): void {
    $allowed = rtrim(env('FRONTEND_URL', 'http://localhost:3000'), '/');
    $origin = rtrim((string)($_SERVER['HTTP_ORIGIN'] ?? ''), '/');
    if ($origin !== '' && hash_equals($allowed, $origin)) {
        header('Access-Control-Allow-Origin: ' . $allowed);
        header('Vary: Origin');
        if ($withCredentials) {
            header('Access-Control-Allow-Credentials: true');
        }
    }
    // If Origin does not match, omit ACAO — browser will block cross-origin reads.
}

header('X-Content-Type-Options: nosniff'); header('X-Frame-Options: DENY'); header('Referrer-Policy: same-origin'); header('Cache-Control: no-store, max-age=0');
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if (str_starts_with($path, '/api/admin/')) require __DIR__ . '/../app/admin-api.php';
if ($path === '/api/content' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json; charset=utf-8');
    $siteSettings = settings();
    echo json_encode([
        'settings' => [
            'siteName' => $siteSettings['siteName'] ?? 'Road Smart Tyre',
            'logo' => $siteSettings['logo'] ?? '',
        ],
        'blogs' => records('blogs', true),
        'reviews' => records('reviews', true),
    ], JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR); exit;
}
if ($path === '/api/contact' && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    applyCors(false);
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
    header('Access-Control-Max-Age: 86400');
    http_response_code(204);
    exit;
}
if ($path === '/api/contact' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json; charset=utf-8');
    applyCors(false);
    try {
        $input = $_POST;
        if (!$input) {
            $raw = file_get_contents('php://input');
            $json = json_decode($raw ?: '[]', true);
            if (is_array($json)) $input = $json;
        }
        $name = trim((string)($input['name'] ?? ''));
        $email = trim((string)($input['email'] ?? ''));
        $company = trim((string)($input['company'] ?? ''));
        $service = trim((string)($input['service'] ?? ''));
        $course = trim((string)($input['course'] ?? ''));
        $message = trim((string)($input['message'] ?? ''));
        if ($name === '' || mb_strlen($name) > 120) throw new InvalidArgumentException('Please enter your name.');
        if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 200) throw new InvalidArgumentException('Please enter a valid email address.');
        if (mb_strlen($company) > 160) throw new InvalidArgumentException('Company name is too long.');
        if (mb_strlen($service) > 160) throw new InvalidArgumentException('Service is too long.');
        if (mb_strlen($course) > 200) throw new InvalidArgumentException('Course selection is too long.');
        if ($message === '' || mb_strlen($message) > 3000) throw new InvalidArgumentException('Please enter a message (max 3000 characters).');
        if (env('SMTP_HOST') === '' || env('SMTP_USERNAME') === '' || env('SMTP_PASSWORD') === '') {
            http_response_code(503);
            echo json_encode(['error' => 'Email delivery is not configured yet. Add the Hostinger mailbox username and password to backend/.env, then restart the backend.']);
            exit;
        }
        $settings = settings();
        $mailCfg = defaultEmailSettings($settings);
        $notifyTo = $mailCfg['notifyTo'] ?: ($settings['contactEmail'] ?? '') ?: env('CONTACT_NOTIFY_TO', '');
        if (!filter_var($notifyTo, FILTER_VALIDATE_EMAIL)) {
            http_response_code(503);
            echo json_encode(['error' => 'Set a valid admin notification email in the admin website settings before accepting enquiries.']);
            exit;
        }
        if (empty($mailCfg['autoReplyEnabled'])) {
            http_response_code(503);
            echo json_encode(['error' => 'Enable visitor auto-replies in admin website settings before accepting enquiries.']);
            exit;
        }
        $fromEmail = env('MAIL_FROM', env('SMTP_USERNAME'));
        if (!filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
            http_response_code(503);
            echo json_encode(['error' => 'Set MAIL_FROM to a valid address belonging to your configured mail service.']);
            exit;
        }
        $ip = (string)($_SERVER['REMOTE_ADDR'] ?? '');
        $since = time() - 900;
        $stmt = db()->prepare('SELECT COUNT(*) FROM contacts WHERE ip=? AND created_at>=?');
        $stmt->execute([$ip, $since]);
        if ((int)$stmt->fetchColumn() >= 8) {
            http_response_code(429);
            echo json_encode(['error' => 'Too many messages. Please try again later.']);
            exit;
        }
        db()->prepare('INSERT INTO contacts(name,email,company,service,course,message,status,created_at,ip) VALUES(?,?,?,?,?,?,?,?,?)')
            ->execute([$name, $email, $company, $service, $course, $message, 'new', time(), $ip]);

        $vars = [
            'name' => $name,
            'email' => $email,
            'company' => $company,
            'service' => $service,
            'course' => $course,
            'message' => $message,
            'siteName' => $settings['siteName'] ?? 'Sol Tekkers',
        ];
        $fromName = $mailCfg['fromName'] ?: ($settings['siteName'] ?? 'Sol Tekkers');

        // Internal notification (admin inbox) — format controlled from dashboard
        $adminMailSent = sendFormattedMail(
            $notifyTo,
            renderEmailTemplate($mailCfg['notifySubject'], $vars),
            renderEmailTemplate($mailCfg['notifyBody'], $vars),
            $fromName,
            $email
        );

        // Auto-reply to the visitor — format controlled from dashboard
        $visitorMailSent = sendFormattedMail(
            $email,
            renderEmailTemplate($mailCfg['autoReplySubject'], $vars),
            renderEmailTemplate($mailCfg['autoReplyBody'], $vars),
            $fromName
        );
        if (!$adminMailSent || !$visitorMailSent) {
            error_log('Contact saved, but one or more SMTP messages were not accepted for delivery.');
            http_response_code(502);
            echo json_encode(['error' => 'Your enquiry was saved, but email delivery failed. Please contact us directly; do not submit the form again.']);
            exit;
        }

        echo json_encode(['ok' => true, 'message' => 'Thanks — your message was received.']);
        exit;
    } catch (InvalidArgumentException $e) {
        http_response_code(422);
        echo json_encode(['error' => $e->getMessage()]);
        exit;
    } catch (Throwable $e) {
        error_log((string)$e);
        http_response_code(500);
        echo json_encode(['error' => 'Could not save your message. Please try again.']);
        exit;
    }
}

if (!in_array($path, ['/', '/admin', '/admin/login', '/admin/logout', '/admin/content', '/admin/edit', '/admin/delete', '/admin/contacts', '/admin/settings'], true)) { http_response_code(404); exit('Not found'); }
if (!in_array($_SERVER['REQUEST_METHOD'], ['GET','POST'], true)) { http_response_code(405); exit; }
if (env('ADMIN_USERNAME') === '' || strlen(env('ADMIN_PASSWORD')) < 12) { http_response_code(503); exit('Run php backend/setup.php to configure the admin account.'); }
ini_set('session.use_strict_mode', '1'); ini_set('session.use_only_cookies', '1');
ini_set('session.cookie_lifetime','604800'); ini_set('session.gc_maxlifetime','604800'); session_name('cms_admin'); session_set_cookie_params(['lifetime'=>604800,'path'=>'/','httponly'=>true,'secure'=>env('SESSION_SECURE','false') === 'true','samesite'=>'Lax']); session_start();
header("Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'");
$error = ''; $notice = $_SESSION['notice'] ?? ''; unset($_SESSION['notice']);
$type = (string)($_GET['type'] ?? 'blogs');
if (!in_array($type, ['blogs','reviews'], true)) { http_response_code(404); exit('Unknown content type'); }
if ($path !== '/admin/login' && !authenticated()) redirect('/admin/login');
$item = isset($_GET['id']) ? record($type, (int)$_GET['id']) : null;
if (isset($_GET['id']) && !$item && in_array($path, ['/admin/edit','/admin/delete'], true)) { http_response_code(404); exit('Content not found'); }
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verifyCsrf();
    try {
        if ($path === '/admin/login') {
            $ip = $_SERVER['REMOTE_ADDR'] ?? 'local';
            $stmt = db()->prepare('SELECT count,expires FROM attempts WHERE ip=?'); $stmt->execute([$ip]); $attempt = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($attempt && $attempt['expires'] > time() && $attempt['count'] >= 5) { http_response_code(429); throw new InvalidArgumentException('Too many attempts. Try again in 15 minutes.'); }
            if (!hash_equals(env('ADMIN_USERNAME'), (string)($_POST['username'] ?? '')) || !hash_equals(env('ADMIN_PASSWORD'), (string)($_POST['password'] ?? ''))) {
                $count = $attempt && $attempt['expires'] > time() ? $attempt['count'] + 1 : 1;
                db()->prepare('INSERT INTO attempts(ip,count,expires) VALUES(?,?,?) ON DUPLICATE KEY UPDATE count=VALUES(count),expires=VALUES(expires)')->execute([$ip,$count,time()+900]);
                http_response_code(401); throw new InvalidArgumentException('Incorrect username or password.');
            }
            db()->prepare('DELETE FROM attempts WHERE ip=?')->execute([$ip]); session_regenerate_id(true); $_SESSION['csrf'] = bin2hex(random_bytes(32));
            $_SESSION['admin'] = hash('sha256', env('ADMIN_USERNAME') . ':' . env('ADMIN_PASSWORD')); $_SESSION['lastSeen'] = time(); redirect('/admin');
        }
        if (!authenticated()) redirect('/admin/login');
        if ($path === '/admin/logout') { $_SESSION=[]; session_destroy(); redirect('/admin/login'); }
        if ($path === '/admin/contacts') {
            $contactId = filter_var($_POST['contactId'] ?? null, FILTER_VALIDATE_INT);
            if (!$contactId || $contactId < 1) throw new InvalidArgumentException('Contact not found.');
            if (isset($_POST['deleteContact'])) {
                $stmt = db()->prepare('DELETE FROM contacts WHERE id=?');
                $stmt->execute([$contactId]);
                if (!$stmt->rowCount()) throw new InvalidArgumentException('Contact not found.');
                $_SESSION['notice'] = 'Enquiry deleted.';
            } else {
                $status = (string)($_POST['status'] ?? '');
                if (!in_array($status, ['new', 'read', 'archived'], true)) throw new InvalidArgumentException('Choose a valid enquiry status.');
                $stmt = db()->prepare('UPDATE contacts SET status=? WHERE id=?');
                $stmt->execute([$status, $contactId]);
                if (!$stmt->rowCount()) {
                    $exists = db()->prepare('SELECT 1 FROM contacts WHERE id=?');
                    $exists->execute([$contactId]);
                    if (!$exists->fetchColumn()) throw new InvalidArgumentException('Contact not found.');
                }
                $_SESSION['notice'] = 'Enquiry status updated.';
            }
            redirect('/admin/contacts');
        }
        if ($path === '/admin/edit') { saveRecord($type,$item); $_SESSION['notice']='Content saved. Published changes are available on the website.'; redirect('/admin/content?type='.$type); }
        if ($path === '/admin/delete' && $item) { db()->prepare('DELETE FROM records WHERE id=? AND type=?')->execute([$item['id'],$type]); $_SESSION['notice']='Content deleted.'; redirect('/admin/content?type='.$type); }
        if ($path === '/admin/settings') {
            $config = settings(); $config['siteName'] = requiredText('siteName',100);
            if (isset($_POST['removeLogo'])) $config['logo'] = '';
            $logo = upload('logo'); if ($logo) $config['logo'] = $logo;
            db()->prepare('UPDATE settings SET payload=? WHERE id=1')->execute([json_encode($config, JSON_THROW_ON_ERROR)]);
            $_SESSION['notice']='Website name and logo updated.'; redirect('/admin/settings');
        }
    } catch (InvalidArgumentException $e) { $error=$e->getMessage(); }
    catch (Throwable $e) { error_log((string)$e); $error='Could not save changes. Please try again or check server permissions.'; http_response_code(500); }
}
if (authenticated()) $_SESSION['lastSeen'] = time();
if ($path === '/') redirect('/admin');
function field(string $name, string $label, mixed $value='', string $kind='text', bool $required=false): void {
    $value = $_POST[$name] ?? $value; echo '<label>'.e($label);
    if ($kind === 'textarea') echo '<textarea name="'.e($name).'" rows="5"'.($required?' required':'').'>'.e($value).'</textarea>';
    else echo '<input name="'.e($name).'" type="'.e($kind).'" value="'.e($value).'"'.($required?' required':'').'>';
    echo '</label>';
}
function token(): void { echo '<input type="hidden" name="_token" value="'.e(csrf()).'">'; }
$config=settings();
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title><?=e($config['siteName'])?> · Admin</title><link rel="stylesheet" href="/admin.css"><script src="/admin.js" defer></script></head><body>
<?php if ($path === '/admin/login'): ?>
<main class="login"><div class="eyebrow">WEBSITE ADMIN</div><h1>Welcome back.</h1><p>Sign in to manage your content and website identity.</p><?php if($error): ?><div role="alert" class="error"><?=e($error)?></div><?php endif ?>
<form method="post"><?php token(); ?><label>Username<input name="username" autocomplete="username" required autofocus></label><label>Password<input name="password" type="password" autocomplete="current-password" required></label><button>Sign in</button></form></main>
<?php else: ?>
<aside class="sidebar"><a class="wordmark" href="/admin"><?=e($config['siteName'])?><small>CONTENT STUDIO</small></a><nav><a href="/admin">Overview</a><?php foreach(['blogs','reviews'] as $nav): ?><a href="/admin/content?type=<?=$nav?>" <?= $type===$nav && str_contains($path,'content')?'aria-current="page"':''?>><?=ucfirst($nav)?></a><?php endforeach ?><a href="/admin/contacts" <?=$path==='/admin/contacts'?'aria-current="page"':''?>>Enquiries</a></nav><a href="<?=e(env('FRONTEND_URL','http://localhost:3000'))?>" target="_blank" rel="noopener">View website ↗</a><form method="post" action="/admin/logout"><?php token(); ?><button class="secondary">Sign out</button></form></aside>
<main class="workspace"><header class="topbar"><span class="eyebrow">YOUR WEBSITE, YOUR CONTENT</span><span>Admin</span></header>
<?php if($notice): ?><div class="notice" role="status"><?=e($notice)?></div><?php endif ?><?php if($error): ?><div class="error" role="alert"><?=e($error)?></div><?php endif ?>
<?php if($path === '/admin'): ?>
<h1>Road Smart Tyre<br>Content Studio</h1><p class="lead">Manage published articles, customer reviews and website enquiries.</p><div class="stats"><?php foreach(['blogs','reviews'] as $kind): ?><a class="panel" href="/admin/content?type=<?=$kind?>"><span><?=ucfirst($kind)?></span><strong><?=count(records($kind))?></strong><small>Manage content →</small></a><?php endforeach ?><a class="panel" href="/admin/contacts"><span>New enquiries</span><strong><?= (int)db()->query("SELECT COUNT(*) FROM contacts WHERE status='new'")->fetchColumn() ?></strong><small>View inbox →</small></a></div><section class="panel"><h2>Publish with confidence</h2><p>Save articles and reviews as drafts or publish them to the website. Published updates appear on new page loads without rebuilding the website.</p></section>
<?php elseif($path === '/admin/contacts'): ?>
<div class="pageHeading"><div><h1>Enquiries</h1><p>Messages submitted through the Road Smart Tyre contact form.</p></div></div>
<section class="panel"><div class="tableWrap"><table><thead><tr><th>Customer</th><th>Message</th><th>Status</th><th>Received</th><th>Actions</th></tr></thead><tbody>
<?php $contacts = db()->query('SELECT id,name,email,service,message,status,created_at FROM contacts ORDER BY created_at DESC LIMIT 500')->fetchAll(PDO::FETCH_ASSOC); foreach($contacts as $contact): ?><tr><td><strong><?=e($contact['name'])?></strong><small><a href="mailto:<?=e($contact['email'])?>"><?=e($contact['email'])?></a></small><?php if($contact['service']!==''): ?><small><?=e($contact['service'])?></small><?php endif ?></td><td><?=nl2br(e($contact['message']))?></td><td><span class="badge"><?=e($contact['status'])?></span></td><td><?=e(date('j M Y, H:i', (int)$contact['created_at']))?></td><td><div class="actions"><form method="post"><?php token(); ?><input type="hidden" name="contactId" value="<?= (int)$contact['id'] ?>"><select name="status" aria-label="Enquiry status"><option value="new" <?=$contact['status']==='new'?'selected':''?>>New</option><option value="read" <?=$contact['status']==='read'?'selected':''?>>Read</option><option value="archived" <?=$contact['status']==='archived'?'selected':''?>>Archived</option></select><button class="secondary">Save</button></form><form method="post" data-confirm="Delete this enquiry permanently?"><?php token(); ?><input type="hidden" name="contactId" value="<?= (int)$contact['id'] ?>"><button class="danger" name="deleteContact" value="1">Delete</button></form></div></td></tr><?php endforeach ?>
</tbody></table></div><?php if(!$contacts): ?><p>No enquiries yet.</p><?php endif ?></section>
<?php elseif($path === '/admin/content'): ?>
<div class="pageHeading"><div><h1><?=ucfirst($type)?></h1><p>Add, edit, publish or remove your content.</p></div><a class="button" href="/admin/edit?type=<?=$type?>">+ Add <?=rtrim($type,'s')?></a></div>
<section class="panel"><label>Search content<input id="content-search" type="search" placeholder="Search by title or slug"></label><div class="tableWrap"><table><thead><tr><th>Title / URL</th><th>Status</th><th>Order</th><th>Actions</th></tr></thead><tbody>
<?php foreach(records($type) as $row): ?><tr data-content-row><td><strong><?=e($row['title'])?></strong><small>/<?= $type==='blogs'?'blog':$type ?>/<?=e($row['slug'])?></small></td><td><span class="badge"><?=e($row['status'])?></span></td><td><?=e($row['sortOrder'])?></td><td><div class="actions"><a href="/admin/edit?type=<?=$type?>&amp;id=<?=$row['id']?>">Edit</a><form method="post" action="/admin/delete?type=<?=$type?>&amp;id=<?=$row['id']?>" data-confirm="Delete this content permanently?"><?php token(); ?><button class="danger">Delete</button></form></div></td></tr><?php endforeach ?>
</tbody></table></div><?php if(!records($type)): ?><p>No content yet. Add your first entry.</p><?php endif ?></section>
<?php elseif($path === '/admin/edit'): $item=$item ?? []; ?>
<div class="pageHeading"><div><a href="/admin/content?type=<?=$type?>">← Back to <?=e($type)?></a><h1><?=isset($item['id'])?'Edit':'Add'?> <?=rtrim($type,'s')?></h1></div></div>
<form method="post" enctype="multipart/form-data" class="editor"><?php token(); ?><section class="panel"><h2>The essentials</h2><div class="grid"><?php field('title','Title',$item['title']??'','text',true); field('slug','URL slug',$item['slug']??'','text',true); field('category','Category / label',$item['category']??$item['tag']??''); field('sortOrder','Display order (lowest first)',$item['sortOrder']??0,'number'); ?></div><p class="hint">Use a unique URL slug such as digital-marketing. Changing a slug changes its public URL.</p><?php field('description',$type==='blogs'?'Article excerpt':'Short description',$item['description']??$item['excerpt']??'','textarea',true); ?>
<?php if($type==='blogs') field('readTime','Reading time',$item['readTime']??'5 min read'); ?>
<?php if($type==='courses') field('courseStatus','Course availability',$item['courseStatus']??'In development'); ?>
<?php if($type==='services') field('hero','Detail page headline',$item['hero']??$item['title']??''); ?>
<?php if($type!=='blogs') field('features',$type==='courses'?'Learning outcomes (one per line)':'Service features (one per line)',implode("\n",$item['outcomes']??$item['features']??[]),'textarea'); ?></section>
<section class="panel"><h2>Image</h2><p class="hint">JPG, PNG, WebP or GIF, maximum 5 MB. Images are saved in backend/public/uploads.</p><?php if(!empty($item['image']) && str_starts_with($item['image'],'/backend/uploads/')): ?><img class="imagePreview" src="<?=e(substr($item['image'],8))?>" alt="Current content image"><?php elseif(!empty($item['image'])): ?><p>Current image: <?=e($item['image'])?></p><?php endif ?><label>Choose image<input type="file" name="image" accept="image/jpeg,image/png,image/webp,image/gif"></label><?php field('imageAlt','Image description (accessibility)',$item['imageAlt']??''); ?><label class="check"><input type="checkbox" name="removeImage">Remove current image</label></section>
<section class="panel"><h2>Content sections</h2><p class="hint">Add headings and paragraphs. Separate paragraphs with a blank line. Text is displayed safely as text, not HTML.</p><div id="sections">
<?php $sections=$item['sections']??[]; if($type==='services' && !$sections) $sections=array_map(fn($x)=>['heading'=>$x['title'],'paragraphs'=>[$x['text']]],$item['detail']['capabilities']??[]); if(isset($_POST['sectionTitle'])) $sections=array_map(fn($i)=>['heading'=>$_POST['sectionTitle'][$i],'paragraphs'=>[$_POST['sectionBody'][$i]??'']],array_keys($_POST['sectionTitle'])); if(!$sections)$sections=[['heading'=>'','paragraphs'=>[]]]; foreach($sections as $section): ?><div class="contentSection"><label>Heading<input name="sectionTitle[]" value="<?=e($section['heading'])?>"></label><label>Paragraphs<textarea name="sectionBody[]" rows="6"><?=e(implode("\n\n",$section['paragraphs']))?></textarea></label><button type="button" class="secondary removeSection">Remove section</button></div><?php endforeach ?></div><button type="button" id="add-section" class="secondary">+ Add section</button></section>
<section class="panel publish"><label>Status<select name="status"><option value="draft" <?=($_POST['status']??$item['status']??'draft')==='draft'?'selected':''?>>Draft — hidden from website</option><option value="published" <?=($_POST['status']??$item['status']??'draft')==='published'?'selected':''?>>Published — visible on website</option></select></label><button>Save changes</button></section></form>
<?php elseif($path === '/admin/settings'): ?>
<h1>Website identity</h1><p class="lead">One name and logo for your header, footer, page titles and website branding.</p><form method="post" enctype="multipart/form-data" class="panel editor"><?php token(); field('siteName','Website name',$config['siteName'],'text',true); ?><label>Website logo<input type="file" name="logo" accept="image/jpeg,image/png,image/webp,image/gif"></label><p class="hint">Use a transparent PNG. Maximum 5 MB. This logo is also used as the favicon.</p><?php if(str_starts_with($config['logo'],'/backend/uploads/')): ?><img class="imagePreview" src="<?=e(substr($config['logo'],8))?>" alt="Current website logo"><?php endif ?><label class="check"><input type="checkbox" name="removeLogo">Remove logo and show website name</label><button>Save website settings</button></form>
<?php endif ?></main><?php endif ?></body></html>
