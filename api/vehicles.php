<?php
// ====================================================================
// ROCKETDRIVE — Endpoint Kendaraan & Inventaris VIN
// GET: Mengambil seluruh katalog kendaraan + seluruh unit VIN fisik
// POST: Menambahkan mobil baru + nomor VIN fisik pertama ke database
// ====================================================================

require_once __DIR__ . '/db.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    try {
        // 1. Ambil seluruh data model mobil
        $stmt = $pdo->query("SELECT * FROM `vehicles` ORDER BY `id` DESC");
        $vehicles = $stmt->fetchAll();

        // 2. Ambil seluruh unit VIN fisik dengan join katalog mobil untuk tabel inventaris
        $stmtAllVins = $pdo->query("
            SELECT v.id as vin_id, v.vehicle_id, v.vin, v.engine_number, v.color, v.status, v.location, v.created_at,
                   c.brand, c.model as vehicle_model, c.category, c.price, c.fuel, c.seats, c.trans, c.img
            FROM `vehicle_vins` v
            LEFT JOIN `vehicles` c ON v.vehicle_id = c.id
            ORDER BY v.id DESC
        ");
        $allVins = $stmtAllVins->fetchAll();

        // Kelompokkan VIN berdasarkan vehicle_id untuk objek kendaraan
        $vinsByVehicle = [];
        foreach ($allVins as $v) {
            $vinsByVehicle[$v['vehicle_id']][] = $v;
        }

        foreach ($vehicles as &$car) {
            $car['id'] = (int)$car['id'];
            $car['price'] = (float)$car['price'];
            $car['seats'] = (int)$car['seats'];
            $car['vins'] = $vinsByVehicle[$car['id']] ?? [];
        }

        echo json_encode([
            'success' => true,
            'count' => count($vehicles),
            'total_vins' => count($allVins),
            'data' => $vehicles,
            'vins' => $allVins
        ], JSON_UNESCAPED_UNICODE);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Gagal mengambil data kendaraan: ' . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
    exit();
}

if ($method === 'POST') {
    // Ambil payload JSON atau POST form data
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true) ?: $_POST;

    $brand = trim($input['brand'] ?? '');
    $model = trim($input['model'] ?? '');
    $rawCategory = strtoupper(trim($input['category'] ?? 'SUV'));
    $validCategories = ['CITY CAR', 'MPV', 'SUV', 'CROSSOVER', 'EV'];
    $category = in_array($rawCategory, $validCategories) ? $rawCategory : 'SUV';

    $price = (float)($input['price'] ?? 0);
    $fuel = trim($input['fuel'] ?? 'Bensin (Petrol)');
    $seats = (int)($input['seats'] ?? 5);
    $trans = trim($input['trans'] ?? 'CVT');
    $engine = trim($input['engine'] ?? 'Standar OEM Pabrikan');
    $warranty = trim($input['warranty'] ?? '3 Tahun / 100.000 KM');
    $img = trim($input['img'] ?? '');
    $vin = strtoupper(trim($input['vin'] ?? ''));
    $engine_number = strtoupper(trim($input['engine_number'] ?? ''));
    $color = trim($input['color'] ?? 'Platinum White Pearl');
    $location = trim($input['location'] ?? 'Showroom Pusat Lt. 1');

    if (!$brand || !$model || !$price || !$vin) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Harap lengkapi formulir: Merek, Model, Harga OTR, dan Nomor VIN fisik wajib diisi.'
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    // Penanganan unggah file gambar langsung ($_FILES atau Base64 data URL)
    $uploadDir = __DIR__ . '/../uploads/';
    if (!is_dir($uploadDir)) {
        @mkdir($uploadDir, 0755, true);
    }

    $uploadedFile = $_FILES['image_file'] ?? $_FILES['img'] ?? $_FILES['file'] ?? null;
    if ($uploadedFile && isset($uploadedFile['tmp_name']) && is_uploaded_file($uploadedFile['tmp_name'])) {
        $ext = strtolower(pathinfo($uploadedFile['name'], PATHINFO_EXTENSION));
        $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
        if (in_array($ext, $allowed)) {
            $filename = 'car_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
            if (move_uploaded_file($uploadedFile['tmp_name'], $uploadDir . $filename)) {
                $img = 'uploads/' . $filename;
            }
        }
    } elseif (!empty($img) && preg_match('/^data:image\/(\w+);base64,/', $img, $m)) {
        $ext = strtolower($m[1]);
        if ($ext === 'jpeg') $ext = 'jpg';
        $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
        if (in_array($ext, $allowed)) {
            $decoded = base64_decode(substr($img, strpos($img, ',') + 1));
            if ($decoded !== false) {
                $filename = 'car_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
                if (file_put_contents($uploadDir . $filename, $decoded)) {
                    $img = 'uploads/' . $filename;
                }
            }
        }
    }

    if (!$img) {
        $img = $model . '.jpg';
    }

    try {
        // Cek duplikasi nomor rangka VIN
        $stmtCheck = $pdo->prepare("SELECT `id`, `vin` FROM `vehicle_vins` WHERE `vin` = ? LIMIT 1");
        $stmtCheck->execute([$vin]);
        if ($stmtCheck->fetch()) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => "Nomor Rangka VIN {$vin} sudah terdaftar dalam sistem inventaris dealer. Harap gunakan nomor VIN unik."
            ], JSON_UNESCAPED_UNICODE);
            exit();
        }

        $pdo->beginTransaction();

        // 1. Simpan ke tabel `vehicles`
        $stmtCar = $pdo->prepare("
            INSERT INTO `vehicles` (`brand`, `model`, `category`, `price`, `fuel`, `seats`, `trans`, `engine`, `warranty`, `img`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmtCar->execute([$brand, $model, $category, $price, $fuel, $seats, $trans, $engine, $warranty, $img]);
        $vehicleId = (int)$pdo->lastInsertId();

        // 2. Simpan unit nomor rangka fisik ke `vehicle_vins`
        $engineNo = $engine_number ?: ('ENG-' . substr($vin, -6));
        $stmtVin = $pdo->prepare("
            INSERT INTO `vehicle_vins` (`vehicle_id`, `vin`, `engine_number`, `color`, `status`, `location`)
            VALUES (?, ?, ?, ?, 'READY', ?)
        ");
        $stmtVin->execute([$vehicleId, $vin, $engineNo, $color, $location]);
        $vinId = (int)$pdo->lastInsertId();

        $pdo->commit();

        echo json_encode([
            'success' => true,
            'message' => "Unit baru {$model} dan nomor rangka VIN {$vin} berhasil disimpan permanen ke database!",
            'vehicle_id' => $vehicleId,
            'vin_id' => $vinId,
            'data' => [
                'id' => $vehicleId,
                'brand' => $brand,
                'model' => $model,
                'category' => $category,
                'price' => $price,
                'fuel' => $fuel,
                'seats' => $seats,
                'trans' => $trans,
                'engine' => $engine,
                'warranty' => $warranty,
                'img' => $img,
                'vin' => $vin,
                'engine_number' => $engineNo,
                'color' => $color,
                'location' => $location,
                'status' => 'READY',
                'vins' => [
                    [
                        'vin_id' => $vinId,
                        'vehicle_id' => $vehicleId,
                        'vin' => $vin,
                        'engine_number' => $engineNo,
                        'color' => $color,
                        'status' => 'READY',
                        'location' => $location
                    ]
                ]
            ]
        ], JSON_UNESCAPED_UNICODE);
    } catch (Exception $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Gagal menyimpan kendaraan ke database: ' . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
    exit();
}
