<?php
// ====================================================================
// ROCKETDRIVE — Endpoint Diagnostik Tes Koneksi Database
// Akses URL: https://rocketdrive.tplp004.com/api/test_db.php
// ====================================================================

require_once __DIR__ . '/db.php';

try {
    $pdo = getDbConnection();

    // Ambil statistik tabel untuk memastikan seluruh tabel & data terdaftar
    $tables = ['users', 'vehicles', 'vehicle_vins', 'leasing_partners', 'leads', 'spks', 'service_bookings', 'service_records', 'digital_passports'];
    $stats = [];
    $missingTables = [];

    foreach ($tables as $table) {
        try {
            $stmt = $pdo->query("SELECT COUNT(*) as total FROM `{$table}`");
            $row = $stmt->fetch();
            $stats[$table] = (int)$row['total'];
        } catch (Exception $te) {
            $stats[$table] = "Tabel belum dibuat / belum diimpor";
            $missingTables[] = $table;
        }
    }

    echo json_encode([
        'status' => count($missingTables) === 0 ? 'ONLINE' : 'PARTIAL_ONLINE',
        'success' => true,
        'message' => count($missingTables) === 0 
            ? 'Selamat! Seluruh Koneksi Database MySQL & 9 Tabel ROCKETDRIVE Berhasil Terhubung Sempurna.' 
            : 'Koneksi MySQL aktif, namun ada tabel yang belum diimpor: ' . implode(', ', $missingTables),
        'database' => 'u975115372_Rocketdrive123',
        'server_time' => date('Y-m-d H:i:s T'),
        'php_version' => phpversion(),
        'table_statistics' => $stats
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'ERROR',
        'success' => false,
        'message' => 'Koneksi database belum berhasil: ' . $e->getMessage(),
        'petunjuk_perbaikan' => [
            '1' => 'Pastikan database u975115372_Rocketdrive123 sudah dibuat di cPanel / hPanel Hostinger MySQL Databases.',
            '2' => 'Pastikan file u975115372_Rocketdrive123.sql sudah diimpor ke phpMyAdmin.',
            '3' => 'Pastikan user database MySQL memiliki hak akses penuh (ALL PRIVILEGES).'
        ]
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}
