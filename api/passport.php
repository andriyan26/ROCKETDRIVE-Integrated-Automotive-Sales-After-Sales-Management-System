<?php
// ====================================================================
// ROCKETDRIVE — Endpoint Paspor Digital Kendaraan & Riwayat Servis
// GET ?vin=...: Mengambil data paspor dan histori servis berbasis VIN
// POST: Menambahkan riwayat servis baru ke paspor digital
// ====================================================================

require_once __DIR__ . '/db.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $vin = strtoupper(trim($_GET['vin'] ?? ''));

    if (!$vin) {
        // Ambil VIN pertama yang tersedia jika tidak ada parameter
        $stmtFirst = $pdo->query("SELECT vin FROM `vehicle_vins` ORDER BY id ASC LIMIT 1");
        $firstRow = $stmtFirst->fetch();
        $vin = $firstRow ? $firstRow['vin'] : 'MHF11BA30001';
    }

    try {
        // 1. Ambil data paspor dari tabel `digital_passports`
        $stmt = $pdo->prepare("SELECT * FROM `digital_passports` WHERE `vin` = ? LIMIT 1");
        $stmt->execute([$vin]);
        $passport = $stmt->fetch();

        // 2. Ambil riwayat servis dari tabel `service_records`
        $stmtRec = $pdo->prepare("SELECT * FROM `service_records` WHERE `vin` = ? ORDER BY `service_date` DESC");
        $stmtRec->execute([$vin]);
        $records = $stmtRec->fetchAll();

        // 3. Jika belum ada di `digital_passports`, buatkan data dinamis dari `vehicle_vins` & `vehicles`
        if (!$passport) {
            $stmtVin = $pdo->prepare("
                SELECT v.*, c.model as vehicle_model, c.brand, c.warranty, c.price 
                FROM `vehicle_vins` v 
                JOIN `vehicles` c ON v.vehicle_id = c.id 
                WHERE v.vin = ? LIMIT 1
            ");
            $stmtVin->execute([$vin]);
            $vinData = $stmtVin->fetch();

            $modelName = $vinData['vehicle_model'] ?? 'Toyota Avanza 1.5 G CVT';
            $engineNo = $vinData['engine_number'] ?? ('ENG-' . substr($vin, -6));
            $color = $vinData['color'] ?? 'Platinum White Pearl';

            $passport = [
                'id' => 0,
                'vin' => $vin,
                'plate_number' => 'B ' . mt_rand(1000, 9999) . ' RDV',
                'owner_name' => 'Konsumen Resmi Dealer',
                'owner_phone' => '0812-8899-1122',
                'vehicle_model' => $modelName,
                'engine_number' => $engineNo,
                'color' => $color,
                'purchase_date' => '2026-06-15',
                'delivery_date' => '2026-06-20',
                'current_odometer' => 14820,
                'warranty_status' => 'AKTIF (3 Thn / 100.000 KM)',
                'warranty_expiry_date' => '2029-06-20'
            ];

            // Tambahkan record servis dummy jika belum ada record
            if (empty($records)) {
                $records = [
                    [
                        'id' => 1,
                        'vin' => $vin,
                        'title' => 'SERVIS PERTAMA (1.000 KM)',
                        'service_date' => '2026-07-10',
                        'odometer' => 1050,
                        'technician' => 'Tim Mekanik Master ROCKETDRIVE',
                        'description' => 'Inspeksi 50 titik kritis kendaraan baru, cek torsi baut roda dan level fluida.',
                        'cost' => 0,
                        'status' => 'COMPLETED'
                    ],
                    [
                        'id' => 2,
                        'vin' => $vin,
                        'title' => 'SERVIS BERKALA 10.000 KM',
                        'service_date' => '2026-09-28',
                        'odometer' => 10120,
                        'technician' => 'Tim Mekanik Master ROCKETDRIVE',
                        'description' => 'Penggantian oli mesin Synthetic 0W-20, filter oli OEM, rotasi 4 roda, dan cek sistem kelistrikan.',
                        'cost' => 650000,
                        'status' => 'COMPLETED'
                    ]
                ];
            }
        }

        echo json_encode([
            'success' => true,
            'passport' => $passport,
            'service_records' => $records
        ], JSON_UNESCAPED_UNICODE);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Gagal mengambil paspor digital: ' . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
    exit();
}

if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true) ?: $_POST;

    $vin = strtoupper(trim($input['vin'] ?? ''));
    $title = trim($input['title'] ?? 'SERVIS BERKALA');
    $service_date = trim($input['service_date'] ?? date('Y-m-d'));
    $odometer = (int)($input['odometer'] ?? 15000);
    $technician = trim($input['technician'] ?? 'Tim Mekanik Master ROCKETDRIVE');
    $description = trim($input['description'] ?? 'Servis berkala resmi dealer.');
    $cost = (float)($input['cost'] ?? 0);

    if (!$vin) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Nomor Rangka VIN wajib diisi.']);
        exit();
    }

    try {
        $stmt = $pdo->prepare("
            INSERT INTO `service_records` (`vin`, `title`, `service_date`, `odometer`, `technician`, `description`, `cost`, `status`)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'COMPLETED')
        ");
        $stmt->execute([$vin, $title, $service_date, $odometer, $technician, $description, $cost]);

        echo json_encode([
            'success' => true,
            'message' => "Riwayat servis untuk VIN {$vin} berhasil dicatat permanen ke Paspor Digital!",
            'record_id' => (int)$pdo->lastInsertId()
        ], JSON_UNESCAPED_UNICODE);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Gagal mencatat riwayat servis: ' . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
    exit();
}
