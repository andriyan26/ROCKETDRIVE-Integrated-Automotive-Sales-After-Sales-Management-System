<?php
// ====================================================================
// ROCKETDRIVE — Endpoint Unggah Gambar Kendaraan (Upload API)
// Menerima file gambar (JPG, PNG, WEBP, GIF) dan menyimpannya ke /uploads/
// ====================================================================

require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');

// Hanya izinkan POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Metode HTTP tidak diizinkan. Gunakan POST.']);
    exit();
}

$uploadDir = __DIR__ . '/../uploads/';
if (!is_dir($uploadDir)) {
    if (!@mkdir($uploadDir, 0755, true)) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Gagal membuat direktori uploads di server.']);
        exit();
    }
}

$file = $_FILES['image_file'] ?? $_FILES['image'] ?? $_FILES['file'] ?? null;
$rawInput = file_get_contents('php://input');
$jsonInput = json_decode($rawInput, true);

$uploadedUrl = null;
$filename = null;

// 1. Penanganan unggah via multipart/form-data
if ($file && isset($file['tmp_name']) && is_uploaded_file($file['tmp_name'])) {
    if ($file['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Terjadi kesalahan saat mengunggah file. Kode: ' . $file['error']]);
        exit();
    }

    // Maksimal 10MB
    if ($file['size'] > 10 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Ukuran file gambar maksimal 10 MB.']);
        exit();
    }

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    if (!in_array($ext, $allowed)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Format file tidak didukung. Harap unggah file JPG, JPEG, PNG, WEBP, atau GIF.']);
        exit();
    }

    $filename = 'car_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
    $targetPath = $uploadDir . $filename;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        $uploadedUrl = 'uploads/' . $filename;
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Gagal memindahkan file yang diunggah ke folder uploads.']);
        exit();
    }
}
// 2. Penanganan unggah via Base64 JSON
elseif ($jsonInput && !empty($jsonInput['image_base64'])) {
    $base64 = $jsonInput['image_base64'];
    if (preg_match('/^data:image\/(\w+);base64,/', $base64, $matches)) {
        $ext = strtolower($matches[1]);
        if ($ext === 'jpeg') $ext = 'jpg';
        $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
        if (!in_array($ext, $allowed)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Format gambar Base64 tidak didukung.']);
            exit();
        }

        $base64Data = substr($base64, strpos($base64, ',') + 1);
        $decoded = base64_decode($base64Data);
        if ($decoded !== false) {
            $filename = 'car_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
            $targetPath = $uploadDir . $filename;
            if (file_put_contents($targetPath, $decoded)) {
                $uploadedUrl = 'uploads/' . $filename;
            }
        }
    }
}

if ($uploadedUrl && $filename) {
    echo json_encode([
        'success' => true,
        'message' => 'Gambar mobil berhasil diunggah ke server!',
        'url' => $uploadedUrl,
        'filename' => $filename
    ], JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Tidak ada file gambar valid yang diterima.'
    ], JSON_UNESCAPED_UNICODE);
}
