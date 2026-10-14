<?php
declare(strict_types=1);
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
if (in_array($path, ['/admin.css','/admin.js'], true) || preg_match('#^/uploads/[a-f0-9]{40}\.(jpg|png|webp|gif)$#D', $path)) {
    if (is_file(__DIR__ . '/public' . $path)) return false;
    http_response_code(404); exit('Not found');
}
require __DIR__ . '/public/index.php';
