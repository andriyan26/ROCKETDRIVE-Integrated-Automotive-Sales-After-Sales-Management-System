<?php
// ====================================================================
// ROCKETDRIVE — Endpoint Bengkel Resmi & Layanan Purna Jual
// GET: Mengambil daftar booking servis & utilisasi stall bengkel
// POST: Booking servis baru oleh customer atau service advisor
// ====================================================================

require_once __DIR__ . '/db.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM `service_bookings` ORDER BY `booking_date` DESC, `stall_number` ASC");
        $bookings = $stmt->fetchAll();

        // Hitung utilisasi slot jam bengkel
        $slots = [
            '09:00 WIB' => 0,
            '10:00 WIB' => 0,
            '11:00 WIB' => 0,
            '13:30 WIB' => 0,
            '14:30 WIB' => 0,
            '15:30 WIB' => 0,
        ];
        foreach ($bookings as $b) {
            $t = $b['booking_time'];
            if (isset($slots[$t])) {
                $slots[$t]++;
            }
        }

        echo json_encode([
            'success' => true,
            'count' => count($bookings),
            'slots' => $slots,
            'data' => $bookings
        ], JSON_UNESCAPED_UNICODE);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Gagal mengambil data servis: ' . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
    exit();
}

if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true) ?: $_POST;

    $id = 'SRV-' . date('Y-m') . str_pad(mt_rand(10, 999), 3, '0', STR_PAD_LEFT);
    $vin = strtoupper(trim($input['vin'] ?? 'MHF11BA30001'));
    $customer_name = trim($input['customer_name'] ?? '');
    $customer_phone = trim($input['customer_phone'] ?? '');
    $vehicle_model = trim($input['vehicle_model'] ?? 'Toyota Avanza');
    $stall_number = (int)($input['stall_number'] ?? mt_rand(1, 4));
    $service_type = trim($input['service_type'] ?? 'Servis Berkala');
    $odometer = (int)($input['odometer'] ?? 10000);
    $booking_date = trim($input['booking_date'] ?? date('Y-m-d'));
    $booking_time = trim($input['booking_time'] ?? '09:00 WIB');
    $notes = trim($input['notes'] ?? 'Pengecekan standar bengkel resmi ROCKETDRIVE.');

    if (!$customer_name || !$customer_phone) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Nama pemilik dan nomor telepon pemesan servis wajib diisi.'
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    try {
        $stmt = $pdo->prepare("
            INSERT INTO `service_bookings` (`id`, `vin`, `customer_name`, `customer_phone`, `vehicle_model`, `stall_number`, `service_type`, `odometer`, `booking_date`, `booking_time`, `status`, `service_advisor`, `notes`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'SCHEDULED', 'Agus Pratama', ?)
        ");
        $stmt->execute([$id, $vin, $customer_name, $customer_phone, $vehicle_model, $stall_number, $service_type, $odometer, $booking_date, $booking_time, $notes]);

        $newBooking = [
            'id' => $id,
            'vin' => $vin,
            'customer_name' => $customer_name,
            'customer_phone' => $customer_phone,
            'vehicle_model' => $vehicle_model,
            'stall_number' => $stall_number,
            'service_type' => $service_type,
            'odometer' => $odometer,
            'booking_date' => $booking_date,
            'booking_time' => $booking_time,
            'status' => 'SCHEDULED',
            'service_advisor' => 'Agus Pratama',
            'notes' => $notes,
            'created_at' => date('Y-m-d H:i:s')
        ];

        echo json_encode([
            'success' => true,
            'message' => "Jadwal servis berkala {$id} untuk {$vehicle_model} berhasil dikonfirmasi di Stall {$stall_number} pada {$booking_date} pukul {$booking_time}!",
            'booking_id' => $id,
            'data' => $newBooking
        ], JSON_UNESCAPED_UNICODE);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Gagal memesan servis: ' . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
    exit();
}
