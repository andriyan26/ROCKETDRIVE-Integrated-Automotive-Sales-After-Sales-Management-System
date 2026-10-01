<?php
// ====================================================================
// ROCKETDRIVE — Endpoint CRM Prospek Pelanggan (Kanban Pipeline)
// GET: Mengambil seluruh daftar prospek
// POST: Menambah prospek baru / permintaan test drive
// PATCH / PUT: Memperbarui kolom status Kanban prospek
// ====================================================================

require_once __DIR__ . '/db.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM `leads` ORDER BY `created_at` DESC");
        $leads = $stmt->fetchAll();

        foreach ($leads as &$lead) {
            $lead['score'] = (int)$lead['score'];
        }

        echo json_encode([
            'success' => true,
            'count' => count($leads),
            'data' => $leads
        ], JSON_UNESCAPED_UNICODE);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Gagal mengambil data CRM: ' . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
    exit();
}

if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true) ?: $_POST;

    $id = 'LD-' . str_pad(mt_rand(10, 999), 3, '0', STR_PAD_LEFT);
    $customer_name = trim($input['customer_name'] ?? '');
    $phone = trim($input['phone'] ?? '');
    $email = trim($input['email'] ?? '');
    $vehicle_model = trim($input['vehicle_model'] ?? 'Toyota Avanza');
    $source = trim($input['source'] ?? 'Website Showroom');
    
    $rawTemp = strtoupper(trim($input['temperature'] ?? 'HOT'));
    $temperature = in_array($rawTemp, ['HOT', 'WARM', 'COLD']) ? $rawTemp : 'HOT';
    
    $rawStatus = strtoupper(trim($input['status'] ?? 'NEW'));
    $status = in_array($rawStatus, ['NEW', 'CONTACTED', 'TEST_DRIVE', 'NEGOTIATION', 'SPK']) ? $rawStatus : 'NEW';
    
    $score = (int)($input['score'] ?? 85);
    $assigned_sales = trim($input['assigned_sales'] ?? 'Doni Wijaya');

    if (!$customer_name || !$phone) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Nama prospek dan nomor telepon / WhatsApp wajib diisi.'
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    try {
        $stmt = $pdo->prepare("
            INSERT INTO `leads` (`id`, `customer_name`, `phone`, `email`, `vehicle_model`, `source`, `temperature`, `status`, `score`, `assigned_sales`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$id, $customer_name, $phone, $email, $vehicle_model, $source, $temperature, $status, $score, $assigned_sales]);

        $newLead = [
            'id' => $id,
            'customer_name' => $customer_name,
            'phone' => $phone,
            'email' => $email,
            'vehicle_model' => $vehicle_model,
            'source' => $source,
            'temperature' => $temperature,
            'status' => $status,
            'score' => $score,
            'assigned_sales' => $assigned_sales,
            'created_at' => date('Y-m-d H:i:s')
        ];

        echo json_encode([
            'success' => true,
            'message' => "Prospek baru \"{$customer_name}\" berhasil didaftarkan ke sistem CRM!",
            'lead_id' => $id,
            'data' => $newLead
        ], JSON_UNESCAPED_UNICODE);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Gagal menyimpan prospek: ' . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
    exit();
}

if ($method === 'PATCH' || $method === 'PUT') {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true) ?: $_POST;
    $id = trim($input['id'] ?? '');
    $status = strtoupper(trim($input['status'] ?? ''));

    $validStatus = ['NEW', 'CONTACTED', 'TEST_DRIVE', 'NEGOTIATION', 'SPK'];
    if (!$id || !in_array($status, $validStatus)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'ID Prospek dan status valid (NEW, CONTACTED, TEST_DRIVE, NEGOTIATION, SPK) wajib dikirim.'
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    try {
        $stmt = $pdo->prepare("UPDATE `leads` SET `status` = ? WHERE `id` = ?");
        $stmt->execute([$status, $id]);

        echo json_encode([
            'success' => true,
            'message' => "Status tahapan prospek {$id} berhasil diperbarui menjadi {$status}."
        ], JSON_UNESCAPED_UNICODE);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Gagal memperbarui status prospek: ' . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
    exit();
}
