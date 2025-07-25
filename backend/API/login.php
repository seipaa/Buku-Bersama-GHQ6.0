<?php
header('Content-Type: application/json');
require_once(__DIR__ . '/../connectionDB.php');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Email dan password wajib diisi']);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $data['email']);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($data['password'], $user['password'])) {
    // Untuk produksi, sebaiknya return token (JWT/session), ini contoh sederhana
    unset($user['password']); // Jangan kirim password ke client
    echo json_encode(['status' => 'success', 'message' => 'Login berhasil', 'user' => $user]);
} else {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Email atau password salah']);
}
$stmt->close();
$conn->close();
?>
