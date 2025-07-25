<?php
header('Content-Type: application/json');
require_once(__DIR__ . '/../connectionDB.php');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name']) || !isset($data['email']) || !isset($data['nim']) || !isset($data['role']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Data tidak lengkap']);
    exit;
}

// Hash password
$hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (name, email, nim, role, password, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
$stmt->bind_param("sssss", $data['name'], $data['email'], $data['nim'], $data['role'], $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Registrasi berhasil']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Registrasi gagal, email atau nim mungkin sudah terdaftar']);
}
$stmt->close();
$conn->close();
?>
