<?php
// ====================================================================
// ROCKETDRIVE — Endpoint Surat Pesanan Kendaraan (SPK) & Penguncian VIN
// GET: Mengambil daftar pesanan SPK dari database
// POST: Menerbitkan SPK baru & mengunci status nomor rangka VIN secara atomik
// ====================================================================

require_once __DIR__ . '/db.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM `spks` ORDER BY `created_at` DESC");
        $spks = $stmt->fetchAll();

        foreach ($spks as &$spk) {
            $spk['price'] = (float)$spk['price'];
            $spk['dp_amount'] = (float)$spk['dp_amount'];
            $spk['monthly_installment'] = (float)$spk['monthly_installment'];
            $spk['booking_fee'] = (float)$spk['booking_fee'];
            $spk['tenor_months'] = (int)($spk['tenor_months'] ?? 36);
        }

        echo json_encode([
            'success' => true,
            'count' => count($spks),
            'data' => $spks
        ], JSON_UNESCAPED_UNICODE);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Gagal mengambil data SPK: ' . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
    exit();
}

if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true) ?: $_POST;

    $id = 'SPK-' . date('Y') . '-' . str_pad(mt_rand(100, 999999), 6, '0', STR_PAD_LEFT);
    $customer_name = trim($input['customer_name'] ?? '');
    $customer_phone = trim($input['customer_phone'] ?? '');
    $customer_id_card = trim($input['customer_id_card'] ?? '');
    $vehicle_model = trim($input['vehicle_model'] ?? '');
    $vin = strtoupper(trim($input['vin'] ?? ''));
    $color = trim($input['color'] ?? 'Putih Mutiara');
    $price = (float)($input['price'] ?? 0);
    $payment_type = strtoupper(trim($input['payment_type'] ?? 'CREDIT'));
    $validPayment = ['CASH', 'CREDIT'];
    if (!in_array($payment_type, $validPayment)) $payment_type = 'CREDIT';

    $leasing_partner = trim($input['leasing_partner'] ?? 'BCA Finance');
    $tenor_months = (int)($input['tenor_months'] ?? 36);
    $dp_amount = (float)($input['dp_amount'] ?? 0);
    $monthly_installment = (float)($input['monthly_installment'] ?? 0);
    $booking_fee = (float)($input['booking_fee'] ?? 10000000);
    $sales_executive = trim($input['sales_executive'] ?? 'Doni Wijaya');

    if (!$customer_name || !$customer_phone || !$vin) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Harap lengkapi Nama Pemesan, Nomor WhatsApp, dan Nomor Rangka VIN unit yang dipilih.'
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    // Ambil model mobil dari VIN jika vehicle_model belum terisi
    if (!$vehicle_model) {
        $stmtCarInfo = $pdo->prepare("
            SELECT c.model, c.price, v.color FROM `vehicle_vins` v 
            JOIN `vehicles` c ON v.vehicle_id = c.id 
            WHERE v.vin = ? LIMIT 1
        ");
        $stmtCarInfo->execute([$vin]);
        $carInfo = $stmtCarInfo->fetch();
        if ($carInfo) {
            $vehicle_model = $carInfo['model'];
            if (!$price) $price = (float)$carInfo['price'];
            if ($color === 'Putih Mutiara') $color = $carInfo['color'];
        }
    }

    try {
        // Cek apakah VIN sudah terkunci / dibooking
        $stmtCheckVin = $pdo->prepare("SELECT `status` FROM `vehicle_vins` WHERE `vin` = ? LIMIT 1");
        $stmtCheckVin->execute([$vin]);
        $vinRow = $stmtCheckVin->fetch();
        if ($vinRow && $vinRow['status'] === 'BOOKED') {
            http_response_code(409);
            echo json_encode([
                'success' => false,
                'message' => "Nomor Rangka VIN {$vin} sudah terkunci oleh pesanan SPK lain! Silakan pilih nomor rangka VIN lain yang berstatus READY."
            ], JSON_UNESCAPED_UNICODE);
            exit();
        }

        $pdo->beginTransaction();

        // 1. Simpan pesanan SPK ke database
        $stmtSpk = $pdo->prepare("
            INSERT INTO `spks` (`id`, `customer_name`, `customer_phone`, `customer_id_card`, `vehicle_model`, `vin`, `color`, `price`, `payment_type`, `leasing_partner`, `tenor_months`, `dp_amount`, `monthly_installment`, `booking_fee`, `status`, `sales_executive`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'APPROVED', ?)
        ");
        $stmtSpk->execute([
            $id, $customer_name, $customer_phone, $customer_id_card, $vehicle_model, $vin, $color,
            $price, $payment_type, $leasing_partner, $tenor_months, $dp_amount, $monthly_installment, $booking_fee, $sales_executive
        ]);

        // 2. Kunci nomor rangka VIN secara atomik di tabel `vehicle_vins`
        $stmtVin = $pdo->prepare("UPDATE `vehicle_vins` SET `status` = 'BOOKED' WHERE `vin` = ?");
        $stmtVin->execute([$vin]);

        $pdo->commit();

        $spkData = [
            'id' => $id,
            'customer_name' => $customer_name,
            'customer_phone' => $customer_phone,
            'customer_id_card' => $customer_id_card,
            'vehicle_model' => $vehicle_model,
            'vin' => $vin,
            'color' => $color,
            'price' => $price,
            'payment_type' => $payment_type,
            'leasing_partner' => $leasing_partner,
            'tenor_months' => $tenor_months,
            'dp_amount' => $dp_amount,
            'monthly_installment' => $monthly_installment,
            'booking_fee' => $booking_fee,
            'status' => 'APPROVED',
            'sales_executive' => $sales_executive,
            'created_at' => date('Y-m-d H:i:s')
        ];

        echo json_encode([
            'success' => true,
            'message' => "Surat Pesanan Kendaraan (SPK) {$id} berhasil diterbitkan dan nomor rangka VIN {$vin} terkunci aman di database!",
            'spk_id' => $id,
            'vin' => $vin,
            'data' => $spkData
        ], JSON_UNESCAPED_UNICODE);

    } catch (Exception $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Gagal menerbitkan SPK: ' . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
    exit();
}
