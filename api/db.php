<?php
// ====================================================================
// ROCKETDRIVE — Konfigurasi Koneksi Database MySQL (Hostinger & Local)
// Database: u975115372_Rocketdrive123
// Domain: rocketdrive.tplp004.com
// ====================================================================

// Header CORS & Format JSON Standar
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(200);
    exit();
}

function getDbConnection() {
    static $cachedPdo = null;
    if ($cachedPdo !== null) {
        return $cachedPdo;
    }

    // 1. Kredensial Resmi Hostinger
    $hostinger_config = [
        'host' => 'localhost',
        'dbname' => 'u975115372_Rocketdrive123',
        'username' => 'u975115372_Rocketdrive123',
        'password' => 'Rocketdrive123'
    ];

    // 2. Kredensial Fallback Local Laragon / XAMPP
    $local_config = [
        'host' => '127.0.0.1',
        'dbname' => 'u975115372_Rocketdrive123',
        'username' => 'root',
        'password' => ''
    ];

    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
    ];

    // Coba koneksi Hostinger terlebih dahulu
    try {
        $dsn = "mysql:host={$hostinger_config['host']};dbname={$hostinger_config['dbname']};charset=utf8mb4";
        $cachedPdo = new PDO($dsn, $hostinger_config['username'], $hostinger_config['password'], $options);
        return $cachedPdo;
    } catch (PDOException $e1) {
        // Coba koneksi lokal Laragon dengan database u975115372_Rocketdrive123
        try {
            $dsn_local = "mysql:host={$local_config['host']};dbname={$local_config['dbname']};charset=utf8mb4";
            $cachedPdo = new PDO($dsn_local, $local_config['username'], $local_config['password'], $options);
            return $cachedPdo;
        } catch (PDOException $e2) {
            // Coba nama database alternatif 'rocketdrive'
            try {
                $dsn_local_alt = "mysql:host={$local_config['host']};dbname=rocketdrive;charset=utf8mb4";
                $cachedPdo = new PDO($dsn_local_alt, $local_config['username'], $local_config['password'], $options);
                return $cachedPdo;
            } catch (PDOException $e3) {
                // Coba localhost socket
                try {
                    $dsn_sock = "mysql:host=localhost;dbname=rocketdrive;charset=utf8mb4";
                    $cachedPdo = new PDO($dsn_sock, 'root', '', $options);
                    return $cachedPdo;
                } catch (PDOException $e4) {
                    http_response_code(500);
                    echo json_encode([
                        'success' => false,
                        'message' => 'Gagal terhubung ke database MySQL. Pastikan database u975115372_Rocketdrive123 sudah diimpor ke MySQL phpMyAdmin.',
                        'error' => $e1->getMessage()
                    ], JSON_UNESCAPED_UNICODE);
                    exit();
                }
            }
        }
    }
}

