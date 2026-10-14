<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');

function adminApiResponse(array $data, int $status = 200): never {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

function adminApiCsrf(): void {
    $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    if (!is_string($token) || $token === '' || !hash_equals(csrf(), $token)) {
        // Keep session; return a fresh CSRF so the client can retry without full logout
        adminApiResponse([
            'error' => 'Security token refreshed. Please try that action again.',
            'csrf' => csrf(),
            'authenticated' => authenticated(),
        ], 419);
    }
}

ini_set('session.use_strict_mode', '1');
ini_set('session.use_only_cookies', '1');
// 7-day session lifetime (was ~10 years). Idle check is also 7 days in authenticated().
ini_set('session.cookie_lifetime', '604800');
ini_set('session.gc_maxlifetime', '604800');
session_name('cms_admin');
session_set_cookie_params([
    'lifetime' => 604800,
    'path' => '/',
    'secure' => env('SESSION_SECURE', 'false') === 'true',
    'httponly' => true,
    'samesite' => 'Lax',
]);
session_start();

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if ($path === '/api/admin/session' && $method === 'GET') {
    adminApiResponse(['authenticated' => authenticated(), 'csrf' => csrf()]);
}

if ($path === '/api/admin/login' && $method === 'POST') {
    adminApiCsrf();
    $username = (string)($_POST['username'] ?? '');
    $password = (string)($_POST['password'] ?? '');
    if (env('ADMIN_USERNAME') === '' || strlen(env('ADMIN_PASSWORD')) < 12) {
        adminApiResponse(['error' => 'Run backend setup to configure the admin account.'], 503);
    }
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'local';
    $statement = db()->prepare('SELECT count,expires FROM attempts WHERE ip=?');
    $statement->execute([$ip]);
    $attempt = $statement->fetch(PDO::FETCH_ASSOC);
    if ($attempt && $attempt['expires'] > time() && $attempt['count'] >= 5) {
        adminApiResponse(['error' => 'Too many attempts. Try again in 15 minutes.'], 429);
    }
    if (!hash_equals(env('ADMIN_USERNAME'), $username) || !hash_equals(env('ADMIN_PASSWORD'), $password)) {
        $count = $attempt && $attempt['expires'] > time() ? $attempt['count'] + 1 : 1;
        db()->prepare('INSERT INTO attempts(ip,count,expires) VALUES(?,?,?) ON DUPLICATE KEY UPDATE count=VALUES(count),expires=VALUES(expires)')->execute([$ip, $count, time() + 900]);
        adminApiResponse(['error' => 'Incorrect username or password.'], 401);
    }
    db()->prepare('DELETE FROM attempts WHERE ip=?')->execute([$ip]);
    session_regenerate_id(true);
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
    $_SESSION['admin'] = hash('sha256', env('ADMIN_USERNAME') . ':' . env('ADMIN_PASSWORD'));
    $_SESSION['lastSeen'] = time();
    adminApiResponse(['authenticated' => true, 'csrf' => $_SESSION['csrf']]);
}

if (!authenticated()) adminApiResponse(['error' => 'Sign in to continue.'], 401);
$_SESSION['lastSeen'] = time();

if ($path === '/api/admin/content' && $method === 'GET') {
    $contacts = db()->query('SELECT id,name,email,company,service,course,message,status,created_at FROM contacts ORDER BY created_at DESC LIMIT 500')->fetchAll(PDO::FETCH_ASSOC);
    foreach ($contacts as &$row) {
        $row['id'] = (int)$row['id'];
        $row['created_at'] = (int)$row['created_at'];
    }
    unset($row);
    adminApiResponse([
        'blogs' => records('blogs'),
        'reviews' => records('reviews'),
        'contacts' => $contacts,
        'contactsNew' => (int)db()->query("SELECT COUNT(*) FROM contacts WHERE status='new'")->fetchColumn(),
    ]);
}

if ($path === '/api/admin/logout' && $method === 'POST') {
    adminApiCsrf();
    $_SESSION = [];
    session_destroy();
    adminApiResponse(['authenticated' => false]);
}

if ($path === '/api/admin/settings' && $method === 'POST') {
    adminApiCsrf();
    try {
        $config = settings();
        $config['siteName'] = requiredText('siteName', 100);
        $contactEmail = textField('contactEmail', 200);
        if ($contactEmail !== '' && !filter_var($contactEmail, FILTER_VALIDATE_EMAIL)) throw new InvalidArgumentException('Please enter a valid website contact email.');
        $config['contactEmail'] = $contactEmail !== '' ? $contactEmail : ($config['contactEmail'] ?? 'info@soltekkersllc.com');
        if (isset($_POST['removeLogo'])) $config['logo'] = '';
        $logo = upload('logo');
        if ($logo) $config['logo'] = $logo;

        // Email templates controlled from admin dashboard
        $config['email'] = [
            'notifyTo' => textField('notifyTo', 200),
            'fromName' => textField('fromName', 120) ?: $config['siteName'],
            'autoReplyEnabled' => isset($_POST['autoReplyEnabled']),
            'autoReplySubject' => textField('autoReplySubject', 200) ?: 'We received your message — {{siteName}}',
            'autoReplyBody' => textField('autoReplyBody', 8000) ?: "Hi {{name}},\n\nThanks for contacting {{siteName}}. We have received your enquiry and will get back to you shortly.\n\n— {{siteName}} team",
            'notifySubject' => textField('notifySubject', 200) ?: 'New contact enquiry — {{name}}',
            'notifyBody' => textField('notifyBody', 8000) ?: "New enquiry from the website:\n\nName: {{name}}\nEmail: {{email}}\nCompany: {{company}}\nService: {{service}}\nCourse: {{course}}\n\nMessage:\n{{message}}\n",
        ];

        db()->prepare('UPDATE settings SET payload=? WHERE id=1')->execute([json_encode($config, JSON_THROW_ON_ERROR)]);
        adminApiResponse(['settings' => $config]);
    } catch (InvalidArgumentException $error) {
        adminApiResponse(['error' => $error->getMessage()], 422);
    } catch (Throwable $error) {
        error_log((string)$error);
        adminApiResponse(['error' => 'Could not save website settings.'], 500);
    }
}

if (preg_match('#^/api/admin/records/(blogs|reviews)(?:/([1-9][0-9]*))?$#D', $path, $matches)) {
    $type = $matches[1];
    $id = isset($matches[2]) ? (int)$matches[2] : null;
    if ($method === 'DELETE' && $id !== null) {
        adminApiCsrf();
        $statement = db()->prepare('DELETE FROM records WHERE id=? AND type=?');
        $statement->execute([$id, $type]);
        if (!$statement->rowCount()) adminApiResponse(['error' => 'Content not found.'], 404);
        adminApiResponse(['ok' => true]);
    }
    if ($method === 'POST') {
        adminApiCsrf();
        $old = $id === null ? null : record($type, $id);
        if ($id !== null && !$old) adminApiResponse(['error' => 'Content not found.'], 404);
        try {
            saveRecord($type, $old);
            adminApiResponse(['ok' => true]);
        } catch (InvalidArgumentException $error) {
            adminApiResponse(['error' => $error->getMessage()], 422);
        } catch (Throwable $error) {
            error_log((string)$error);
            adminApiResponse(['error' => 'Could not save content.'], 500);
        }
    }
}


if ($path === '/api/admin/contacts' && $method === 'GET') {
    $rows = db()->query('SELECT id,name,email,company,service,course,message,status,created_at FROM contacts ORDER BY created_at DESC LIMIT 500')->fetchAll(PDO::FETCH_ASSOC);
    foreach ($rows as &$row) { $row['id'] = (int)$row['id']; $row['created_at'] = (int)$row['created_at']; }
    unset($row);
    adminApiResponse(['contacts' => $rows]);
}

if (preg_match('#^/api/admin/contacts/([1-9][0-9]*)$#D', $path, $m)) {
    $id = (int)$m[1];
    if ($method === 'POST') {
        adminApiCsrf();
        $status = (string)($_POST['status'] ?? 'read');
        if (!in_array($status, ['new', 'read', 'archived'], true)) $status = 'read';
        $stmt = db()->prepare('UPDATE contacts SET status=? WHERE id=?');
        $stmt->execute([$status, $id]);
        if (!$stmt->rowCount()) adminApiResponse(['error' => 'Contact not found.'], 404);
        adminApiResponse(['ok' => true]);
    }
    if ($method === 'DELETE') {
        adminApiCsrf();
        $stmt = db()->prepare('DELETE FROM contacts WHERE id=?');
        $stmt->execute([$id]);
        if (!$stmt->rowCount()) adminApiResponse(['error' => 'Contact not found.'], 404);
        adminApiResponse(['ok' => true]);
    }
}



if (preg_match('#^/api/admin/contacts/([1-9][0-9]*)/mail$#D', $path, $m) && $method === 'POST') {
    adminApiCsrf();
    $id = (int)$m[1];
    $stmt = db()->prepare('SELECT id,name,email,company,service,course,message FROM contacts WHERE id=?');
    $stmt->execute([$id]);
    $contact = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$contact) adminApiResponse(['error' => 'Contact not found.'], 404);

    $subject = trim((string)($_POST['subject'] ?? ''));
    $body = trim((string)($_POST['body'] ?? ''));
    if ($subject === '' || mb_strlen($subject) > 200) {
        adminApiResponse(['error' => 'Enter a subject (max 200 characters).'], 422);
    }
    if ($body === '' || mb_strlen($body) > 8000) {
        adminApiResponse(['error' => 'Enter a message body (max 8000 characters).'], 422);
    }

    $settings = settings();
    $mailCfg = defaultEmailSettings($settings);
    $fromName = $mailCfg['fromName'] ?: ($settings['siteName'] ?? 'Sol Tekkers');
    $to = (string)$contact['email'];
    if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
        adminApiResponse(['error' => 'This enquiry does not have a valid email address.'], 422);
    }

    $ok = sendFormattedMail($to, $subject, $body, $fromName);
    if (!$ok) {
        adminApiResponse(['error' => 'Could not send the email. Check server mail configuration.'], 500);
    }
    // Mark as read after successful reply
    db()->prepare("UPDATE contacts SET status='read' WHERE id=?")->execute([$id]);
    adminApiResponse(['ok' => true, 'message' => 'Email sent to ' . $to]);
}

adminApiResponse(['error' => 'Admin API route not found.'], 404);