SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE IF NOT EXISTS records (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    type ENUM('blogs', 'reviews') NOT NULL,
    slug VARCHAR(100) NOT NULL,
    payload JSON NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_records_type_slug (type, slug),
    KEY idx_records_type_order (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS settings (
    id TINYINT UNSIGNED NOT NULL,
    payload JSON NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS attempts (
    ip VARCHAR(45) NOT NULL,
    count INT UNSIGNED NOT NULL,
    expires INT UNSIGNED NOT NULL,
    PRIMARY KEY (ip),
    KEY idx_attempts_expires (expires)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contacts (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(200) NOT NULL,
    company VARCHAR(160) NOT NULL DEFAULT '',
    service VARCHAR(160) NOT NULL DEFAULT '',
    course VARCHAR(200) NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'new',
    created_at INT UNSIGNED NOT NULL,
    ip VARCHAR(45) NOT NULL DEFAULT '',
    PRIMARY KEY (id),
    KEY idx_contacts_created (created_at),
    KEY idx_contacts_status (status),
    KEY idx_contacts_ip_created (ip, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
