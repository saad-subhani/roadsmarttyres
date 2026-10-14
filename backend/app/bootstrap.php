<?php
declare(strict_types=1);
const ROOT = __DIR__ . '/..';
function env(string $key, string $default = ''): string {
    static $values;
    if ($values === null) {
        $values = [];
        if (is_file(ROOT . '/.env')) foreach (file(ROOT . '/.env', FILE_IGNORE_NEW_LINES) as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) continue;
            [$name, $value] = explode('=', $line, 2);
            $values[trim($name)] = trim(trim($value), "\"'");
        }
    }
    return getenv($key) !== false ? (string)getenv($key) : ($values[$key] ?? $default);
}
function configureRuntime(): void {
    $envName = strtolower(env('APP_ENV', env('ENVIRONMENT', 'production')));
    // Default to production-safe settings unless explicitly development
    if ($envName !== 'development' && $envName !== 'dev' && $envName !== 'local') {
        ini_set('display_errors', '0');
        ini_set('display_startup_errors', '0');
        ini_set('html_errors', '0');
        error_reporting(E_ALL);
        ini_set('log_errors', '1');
        $logFile = ROOT . '/storage/php-error.log';
        if (is_dir(ROOT . '/storage')) {
            ini_set('error_log', $logFile);
        }
    } else {
        ini_set('display_errors', '1');
        error_reporting(E_ALL);
    }
    if (function_exists('header_remove')) {
        @header_remove('X-Powered-By');
    }
}

configureRuntime();

function sqlStatements(string $sql): array {
    $statements = [];
    $statement = '';
    $quote = null;
    $escaped = false;
    $length = strlen($sql);
    for ($i = 0; $i < $length; $i++) {
        $character = $sql[$i];
        $statement .= $character;
        if ($quote !== null) {
            if ($escaped) {
                $escaped = false;
            } elseif ($character === '\\') {
                $escaped = true;
            } elseif ($character === $quote) {
                if ($i + 1 < $length && $sql[$i + 1] === $quote) {
                    $statement .= $sql[++$i];
                } else {
                    $quote = null;
                }
            }
        } elseif ($character === "'" || $character === '"' || $character === '`') {
            $quote = $character;
        } elseif ($character === ';') {
            $statements[] = trim(substr($statement, 0, -1));
            $statement = '';
        }
    }
    if (trim($statement) !== '') $statements[] = trim($statement);
    return $statements;
}

function db(bool $initialize = true): PDO {
    static $db;
    if ($db) return $db;
    $host = env('MYSQL_HOST', '127.0.0.1');
    $port = env('MYSQL_PORT', '3306');
    $database = env('MYSQL_DATABASE');
    $username = env('MYSQL_USERNAME');
    $password = env('MYSQL_PASSWORD');
    if ($database === '' || $username === '') {
        throw new RuntimeException('Configure MYSQL_DATABASE and MYSQL_USERNAME in backend/.env before starting the backend.');
    }
    if (!preg_match('/^[A-Za-z0-9_$-]+$/D', $database)) {
        throw new RuntimeException('MYSQL_DATABASE must contain only letters, numbers, underscores, dollar signs or hyphens.');
    }
    if (!ctype_digit($port) || (int)$port < 1 || (int)$port > 65535) {
        throw new RuntimeException('MYSQL_PORT must be a valid TCP port number.');
    }
    $dsn = "mysql:host=$host;port=$port;dbname=$database;charset=utf8mb4";
    $db = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_PERSISTENT => false,
    ]);
    if ($initialize) {
        // MySQL-only: seed schema + starter content from database/mysql.sql when needed.
        $sql = file_get_contents(ROOT . '/database/mysql.sql');
        $reference = strpos($sql, '/* QUERY REFERENCE');
        if ($reference !== false) $sql = substr($sql, 0, $reference);
        $sql = preg_replace('/^\s*--.*$/m', '', $sql);
        foreach (sqlStatements($sql) as $statement) {
            if (trim($statement) !== '') $db->exec($statement);
        }
    }
    return $db;
}
function settings(): array { return json_decode(db()->query('SELECT payload FROM settings WHERE id=1')->fetchColumn(), true); }
function records(string $type, bool $published = false): array {
    $stmt = db()->prepare('SELECT id,payload FROM records WHERE type=?'); $stmt->execute([$type]);
    $items = [];
    foreach ($stmt as $row) {
        $item = json_decode($row['payload'], true); $item['id'] = (int)$row['id'];
        if (!$published || $item['status'] === 'published') $items[] = $item;
    }
    usort($items, fn($a,$b) => ($a['sortOrder'] <=> $b['sortOrder']) ?: ($b['id'] <=> $a['id']));
    return $items;
}
function record(string $type, int $id): ?array {
    foreach (records($type) as $item) if ($item['id'] === $id) return $item;
    return null;
}
function e(mixed $value): string { return htmlspecialchars((string)$value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function redirect(string $url): never { header('Location: ' . $url, true, 303); exit; }

function defaultEmailSettings(array $settings): array {
    $site = $settings['siteName'] ?? 'Sol Tekkers';
    $email = is_array($settings['email'] ?? null) ? $settings['email'] : [];
    return array_merge([
        'notifyTo' => $settings['contactEmail'] ?? '',
        'fromName' => $site,
        'autoReplyEnabled' => true,
        'autoReplySubject' => 'We received your message — {{siteName}}',
        'autoReplyBody' => "Hi {{name}},\n\nThanks for contacting {{siteName}}. We have received your enquiry about \"{{service}}\" and will get back to you shortly.\n\n— {{siteName}} team",
        'notifySubject' => 'New contact enquiry — {{name}}',
        'notifyBody' => "New enquiry from the website:\n\nName: {{name}}\nEmail: {{email}}\nCompany: {{company}}\nService: {{service}}\nCourse: {{course}}\n\nMessage:\n{{message}}\n",
    ], $email);
}

function renderEmailTemplate(string $template, array $vars): string {
    return strtr($template, [
        '{{name}}' => $vars['name'] ?? '',
        '{{email}}' => $vars['email'] ?? '',
        '{{company}}' => $vars['company'] ?? '',
        '{{service}}' => $vars['service'] ?? '',
        '{{course}}' => $vars['course'] ?? '',
        '{{message}}' => $vars['message'] ?? '',
        '{{siteName}}' => $vars['siteName'] ?? 'Sol Tekkers',
    ]);
}

function smtpRead($socket): string {
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (strlen($line) < 4 || $line[3] === ' ') break;
    }
    return $response;
}

function smtpExpect($socket, array $codes): void {
    $response = smtpRead($socket);
    $code = (int)substr($response, 0, 3);
    if (!in_array($code, $codes, true)) {
        throw new RuntimeException('SMTP server rejected a command.');
    }
}

function smtpCommand($socket, string $command, array $codes): void {
    fwrite($socket, $command . "\r\n");
    smtpExpect($socket, $codes);
}

function sendSmtpMail(string $to, string $subject, string $body, string $fromName, string $replyTo): bool {
    $host = trim(env('SMTP_HOST'));
    if ($host === '') return false;

    $encryption = strtolower(trim(env('SMTP_ENCRYPTION', 'tls')));
    $port = (int)env('SMTP_PORT', $encryption === 'ssl' ? '465' : '587');
    $timeout = max(1, (int)env('SMTP_TIMEOUT', '15'));
    $fromEmail = env('MAIL_FROM') ?: env('SMTP_USERNAME', 'noreply@soltekkersllc.com');
    $remoteHost = $encryption === 'ssl' ? 'ssl://' . $host : $host;
    $errno = 0;
    $error = '';
    $socket = @stream_socket_client(
        $remoteHost . ':' . $port,
        $errno,
        $error,
        $timeout,
        STREAM_CLIENT_CONNECT
    );
    if (!is_resource($socket)) {
        throw new RuntimeException('Could not connect to the SMTP server.');
    }

    try {
        stream_set_timeout($socket, $timeout);
        smtpExpect($socket, [220]);
        $hostname = parse_url(env('FRONTEND_URL', 'localhost'), PHP_URL_HOST) ?: 'localhost';
        smtpCommand($socket, 'EHLO ' . $hostname, [250]);

        if ($encryption === 'tls') {
            smtpCommand($socket, 'STARTTLS', [220]);
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('Could not establish SMTP TLS encryption.');
            }
            smtpCommand($socket, 'EHLO ' . $hostname, [250]);
        } elseif (!in_array($encryption, ['ssl', 'none'], true)) {
            throw new RuntimeException('Unsupported SMTP encryption setting.');
        }

        $username = env('SMTP_USERNAME');
        $password = env('SMTP_PASSWORD');
        if ($username !== '' || $password !== '') {
            smtpCommand($socket, 'AUTH LOGIN', [334]);
            smtpCommand($socket, base64_encode($username), [334]);
            smtpCommand($socket, base64_encode($password), [235]);
        }

        smtpCommand($socket, 'MAIL FROM:<' . $fromEmail . '>', [250]);
        smtpCommand($socket, 'RCPT TO:<' . $to . '>', [250, 251]);
        smtpCommand($socket, 'DATA', [354]);
        $headers = [
            'Date: ' . date(DATE_RFC2822),
            'To: ' . $to,
            'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=',
            'From: ' . sprintf('"%s" <%s>', addslashes($fromName), $fromEmail),
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
        ];
        if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
            $headers[] = 'Reply-To: ' . $replyTo;
        }
        $message = implode("\r\n", $headers) . "\r\n\r\n" . str_replace("\n.", "\n..", str_replace("\r\n", "\n", $body));
        fwrite($socket, str_replace("\n", "\r\n", $message) . "\r\n.\r\n");
        smtpExpect($socket, [250]);
        smtpCommand($socket, 'QUIT', [221, 250]);
        return true;
    } finally {
        fclose($socket);
    }
}

function sendFormattedMail(string $to, string $subject, string $body, string $fromName = 'Sol Tekkers', string $replyTo = ''): bool {
    $to = trim($to);
    if ($to === '' || !filter_var($to, FILTER_VALIDATE_EMAIL)) return false;
    if (env('SMTP_HOST') !== '') {
        try {
            return sendSmtpMail($to, $subject, $body, $fromName, $replyTo);
        } catch (Throwable $e) {
            error_log('SMTP delivery failed: ' . $e->getMessage());
            return false;
        }
    }
    $fromEmail = env('MAIL_FROM', 'noreply@soltekkersllc.com');
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . sprintf('"%s" <%s>', addslashes($fromName), $fromEmail),
    ];
    if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $replyTo;
    }
    return @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));
}

function csrf(): string { return $_SESSION['csrf'] ??= bin2hex(random_bytes(32)); }
function verifyCsrf(): void {
    if (!hash_equals(csrf(), (string)($_POST['_token'] ?? ''))) { http_response_code(419); exit('Session expired. Reload the form and try again.'); }
}
function authenticated(): bool {
    // Idle timeout: 7 days (sliding — lastSeen is refreshed on each authenticated request)
    $signature = hash('sha256', env('ADMIN_USERNAME') . ':' . env('ADMIN_PASSWORD'));
    return isset($_SESSION['admin'], $_SESSION['lastSeen']) && hash_equals($signature, $_SESSION['admin']) && time() - $_SESSION['lastSeen'] < 604800;
}
function requiredText(string $key, int $max = 200): string {
    $value = trim((string)($_POST[$key] ?? ''));
    if ($value === '' || mb_strlen($value) > $max) throw new InvalidArgumentException("Please enter $key (maximum $max characters).");
    return $value;
}
function textField(string $key, int $max = 20000): string {
    $value = trim((string)($_POST[$key] ?? ''));
    if (mb_strlen($value) > $max) throw new InvalidArgumentException("$key is too long.");
    return $value;
}
function lines(string $key): array { return array_values(array_filter(array_map('trim', explode("\n", textField($key))))); }
function upload(string $key, ?int $index = null): ?string {
    $file = $_FILES[$key] ?? null;
    if ($index !== null) {
        if (!is_array($file['error'] ?? null) || !array_key_exists($index, $file['error'])) return null;
        foreach ($file as $field => $value) {
            $file[$field] = is_array($value) ? ($value[$index] ?? null) : $value;
        }
    }
    if (!$file || $file['error'] === UPLOAD_ERR_NO_FILE) return null;
    if ($file['error'] !== UPLOAD_ERR_OK || $file['size'] > 5 * 1024 * 1024) throw new InvalidArgumentException('Upload failed. Choose an image smaller than 5 MB.');
    if (!is_uploaded_file($file['tmp_name'])) throw new InvalidArgumentException('Invalid upload.');
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
    $extensions = ['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp','image/gif'=>'gif'];
    $size = @getimagesize($file['tmp_name']);
    if (!isset($extensions[$mime]) || !$size || ($size['mime'] ?? '') !== $mime || $size[0]*$size[1] > 25000000) throw new InvalidArgumentException('Use a valid JPG, PNG, WebP or GIF image up to 25 megapixels. SVG and executable files are not accepted.');
    $name = bin2hex(random_bytes(20)) . '.' . $extensions[$mime];
    if (!move_uploaded_file($file['tmp_name'], ROOT . '/public/uploads/' . $name)) throw new RuntimeException('Could not save image. Check backend/public/uploads permissions.');
    return '/backend/uploads/' . $name;
}
function saveRecord(string $type, ?array $old): void {
    $item = $old ?? [];
    $item['title'] = requiredText('title');
    if ($type === 'reviews') {
        $slugIn = textField('slug', 100);
        if ($slugIn === '' || !preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/D', $slugIn)) {
            $base = strtolower(preg_replace('/[^a-z0-9]+/i', '-', $item['title']));
            $base = trim($base, '-') ?: 'review';
            $slugIn = $base . ($old ? '' : '-' . substr(bin2hex(random_bytes(3)), 0, 6));
        }
        $item['slug'] = $slugIn;
    } else {
        $item['slug'] = requiredText('slug', 100);
    }
    if (!preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/D', $item['slug'])) throw new InvalidArgumentException('Slug must contain lowercase letters, numbers and single hyphens.');
    $item['category'] = textField('category', 100);
    $item['status'] = ($_POST['status'] ?? '') === 'published' ? 'published' : 'draft';
    $item['sortOrder'] = filter_var($_POST['sortOrder'] ?? 0, FILTER_VALIDATE_INT);
    if ($item['sortOrder'] === false || abs($item['sortOrder']) > 100000) throw new InvalidArgumentException('Enter a valid display order.');
    $item['description'] = requiredText('description', 5000);
    $item['image'] = $item['image'] ?? '';
    if (isset($_POST['removeImage'])) $item['image'] = '';
    $item['imageAlt'] = textField('imageAlt', 300);
    $sections = [];
    foreach (array_slice((array)($_POST['sectionTitle'] ?? []), 0, 30) as $index => $heading) {
        $body = trim((string)($_POST['sectionBody'][$index] ?? ''));
        $heading = trim((string)$heading);
        if (mb_strlen($heading) > 200 || mb_strlen($body) > 20000) throw new InvalidArgumentException('A content section is too long.');
        $section = ['heading'=>$heading, 'paragraphs'=>preg_split('/\R\s*\R/', $body, -1, PREG_SPLIT_NO_EMPTY)];
        if ($type === 'blogs') {
            $postedOriginalIndex = (array)($_POST['sectionOriginalIndex'] ?? []);
            $originalIndex = array_key_exists($index, $postedOriginalIndex)
                ? filter_var($postedOriginalIndex[$index], FILTER_VALIDATE_INT)
                : ($old ? $index : false);
            $oldSection = $originalIndex !== false ? ($old['sections'][$originalIndex] ?? []) : [];
            $removeImage = ($_POST['sectionImageRemove'][$index] ?? '') === '1';
            $section['image'] = $removeImage ? '' : ($oldSection['image'] ?? '');
            $postedImageAlt = (array)($_POST['sectionImageAlt'] ?? []);
            $section['imageAlt'] = array_key_exists($index, $postedImageAlt)
                ? trim((string)$postedImageAlt[$index])
                : ($oldSection['imageAlt'] ?? '');
            if (mb_strlen($section['imageAlt']) > 300) throw new InvalidArgumentException('Section image description is too long.');
            $section['_uploadIndex'] = $index;
            $sectionFile = $_FILES['sectionImage'] ?? null;
            $hasSectionImage = isset($sectionFile['error'][$index]) && $sectionFile['error'][$index] !== UPLOAD_ERR_NO_FILE;
            if ($heading !== '' || $body !== '' || $section['image'] !== '' || $hasSectionImage) $sections[] = $section;
        } elseif ($heading !== '' || $body !== '') {
            $sections[] = $section;
        }
    }
    if ($type === 'blogs') {
        if (!$sections) throw new InvalidArgumentException('Add at least one article content section.');
        $item['excerpt'] = $item['description']; $item['readTime'] = textField('readTime', 50) ?: '5 min read';
    } elseif ($type === 'courses') {
        $item['outcomes'] = lines('features'); $item['number'] = str_pad((string)($item['sortOrder']+1), 2, '0', STR_PAD_LEFT);
        $item['courseStatus'] = textField('courseStatus', 80) ?: 'In development'; $item['sections'] = $sections;
    } elseif ($type === 'reviews') {
        // Reviews: title=name, category=role, description=review text
        $item['name'] = $item['title'];
        $item['role'] = $item['category'] ?: 'Client';
        $item['text'] = $item['description'];
        $item['sections'] = [];
    } else {
        $item['features'] = lines('features'); $item['tag'] = $item['category'];
        $item['sections'] = $sections; $item['hero'] = textField('hero', 250) ?: $item['title'];
    }
    $newImage = null;
    $newSectionImages = [];
    try {
        if ($type === 'blogs') {
            foreach ($sections as &$section) {
                $sectionImage = upload('sectionImage', $section['_uploadIndex']);
                if ($sectionImage) {
                    $section['image'] = $sectionImage;
                    $newSectionImages[] = $sectionImage;
                }
                unset($section['_uploadIndex']);
            }
            unset($section);
            $item['sections'] = $sections;
        }
        $newImage = upload('image');
        if ($newImage) $item['image'] = $newImage;
        unset($item['id']);
        if ($old) db()->prepare('UPDATE records SET slug=?,payload=? WHERE id=? AND type=?')->execute([$item['slug'],json_encode($item, JSON_THROW_ON_ERROR),$old['id'],$type]);
        else db()->prepare('INSERT INTO records(type,slug,payload) VALUES(?,?,?)')->execute([$type,$item['slug'],json_encode($item, JSON_THROW_ON_ERROR)]);
    } catch (Throwable $e) {
        if ($newImage) @unlink(ROOT . '/public/uploads/' . basename($newImage));
        foreach ($newSectionImages as $sectionImage) @unlink(ROOT . '/public/uploads/' . basename($sectionImage));
        if ($e instanceof PDOException && (($e->getCode() === '23000' && (int)($e->errorInfo[1] ?? 0) === 1062) || str_contains($e->getMessage(), 'UNIQUE'))) throw new InvalidArgumentException('That URL slug already exists. Choose a unique slug.');
        throw $e;
    }
}
