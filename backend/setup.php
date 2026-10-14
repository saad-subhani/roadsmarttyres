<?php
declare(strict_types=1);
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }

// Create .env on first run (XAMPP-friendly defaults: root, empty password).
if (!file_exists(__DIR__ . '/.env')) {
    $password = bin2hex(random_bytes(12));
    file_put_contents(
        __DIR__ . '/.env',
        "ADMIN_USERNAME=admin\n"
        . "ADMIN_PASSWORD=$password\n"
        . "FRONTEND_URL=http://localhost:3000\n"
        . "SESSION_SECURE=false\n"
        . "MYSQL_HOST=127.0.0.1\n"
        . "MYSQL_PORT=3306\n"
        . "MYSQL_DATABASE=roadsmarttyres\n"
        . "MYSQL_USERNAME=root\n"
        . "MYSQL_PASSWORD=\n"
    );
    @chmod(__DIR__ . '/.env', 0600);
    echo "Created backend/.env with a random admin password. Open that file to view or change credentials.\n";
}

$envPath = __DIR__ . '/.env';
$envContents = file_get_contents($envPath);
$configuredKeys = [];
foreach (file($envPath, FILE_IGNORE_NEW_LINES) as $line) {
    if (preg_match('/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=/', $line, $match)) {
        $configuredKeys[$match[1]] = true;
    }
}
$defaults = [
    'MYSQL_HOST' => '127.0.0.1',
    'MYSQL_PORT' => '3306',
    'MYSQL_DATABASE' => 'roadsmarttyres',
    'MYSQL_USERNAME' => 'root',
    'MYSQL_PASSWORD' => '',
    'SMTP_HOST' => 'smtp.hostinger.com',
    'SMTP_PORT' => '465',
    'SMTP_ENCRYPTION' => 'ssl',
    'SMTP_USERNAME' => '',
    'SMTP_PASSWORD' => '',
    'SMTP_TIMEOUT' => '15',
    'MAIL_FROM' => '',
];
$addedKeys = [];
foreach ($defaults as $key => $value) {
    if (!isset($configuredKeys[$key])) {
        $envContents .= (str_ends_with($envContents, "\n") ? '' : "\n") . "$key=$value\n";
        $addedKeys[] = $key;
    }
}
if ($addedKeys) {
    if (file_put_contents($envPath, $envContents) === false) {
        throw new RuntimeException('Could not add MySQL settings to backend/.env. Check file permissions.');
    }
    @chmod($envPath, 0600);
    echo "Added missing database and mail settings to backend/.env without changing existing values.\n";
    echo "For XAMPP: usually MYSQL_USERNAME=root and MYSQL_PASSWORD= (empty). Create database 'roadsmarttyres' in phpMyAdmin first.\n";
}

require __DIR__ . '/app/bootstrap.php';

// MySQL-only setup (SQLite is not used).
try {
    $database = db();
    if (!$database->query('SELECT 1 FROM settings WHERE id=1')->fetchColumn()) {
        $seed = json_decode(file_get_contents(__DIR__ . '/seed.json'), true, 512, JSON_THROW_ON_ERROR);
        $database->beginTransaction();
        $database->prepare('INSERT INTO settings(id,payload) VALUES(1,?)')->execute([
            json_encode([
                'siteName' => 'Road Smart Tyre',
                'logo' => '/images/road-smart-tyre-logo-1.png',
                'contactEmail' => 'Roadsmarttyreltd@gmail.com',
            ], JSON_THROW_ON_ERROR),
        ]);
        $insert = $database->prepare('INSERT INTO records(type,slug,payload) VALUES(?,?,?)');
        foreach (['blogs', 'reviews'] as $type) {
            foreach ($seed[$type] ?? [] as $item) {
                if (!is_array($item) || !isset($item['slug']) || !is_string($item['slug'])) {
                    throw new RuntimeException('The Road Smart Tyre starter content is invalid.');
                }
                $insert->execute([$type, $item['slug'], json_encode($item, JSON_THROW_ON_ERROR)]);
            }
        }
        $database->commit();
        echo "Imported Road Smart Tyre starter blogs and reviews.\n";
    }
    echo "MySQL database ready: " . env('MYSQL_DATABASE') . "\n";
    echo "Start: php -S 127.0.0.1:8000 -t backend/public backend/router.php\n";
    echo "Admin UI: http://localhost:3000/admin (or /soltekkers)\n";
} catch (Throwable $e) {
    fwrite(STDERR, "MySQL connection failed: " . $e->getMessage() . "\n\n");
    fwrite(STDERR, "Check:\n");
    fwrite(STDERR, "1) XAMPP Control Panel → MySQL is Running (green)\n");
    fwrite(STDERR, "2) phpMyAdmin → create database named: roadsmarttyres\n");
    fwrite(STDERR, "3) backend/.env → MYSQL_HOST=127.0.0.1, MYSQL_PORT=3306, MYSQL_DATABASE=roadsmarttyres\n");
    fwrite(STDERR, "   MYSQL_USERNAME=root, MYSQL_PASSWORD= (empty for default XAMPP)\n");
    fwrite(STDERR, "4) If MySQL keeps stopping: XAMPP → Config (MySQL) → my.ini → free port 3306 / increase memory\n");
    exit(1);
}
