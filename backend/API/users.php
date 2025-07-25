<?php
header('Content-Type: application/json');
require_once(__DIR__ . '/../connectionDB.php');

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? $_GET['id'] : null;

switch ($method) {
    case 'GET':
        if ($id) {
            // Ambil user by ID
            $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();
            echo json_encode(['status' => 'success', 'data' => $user]);
        } else {
            // Ambil semua user
            $result = $conn->query("SELECT * FROM users");
            $users = [];
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
            echo json_encode(['status' => 'success', 'data' => $users]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        // Validasi sederhana
        if (!isset($data['name']) || !isset($data['email']) || !isset($data['nim']) || !isset($data['role']) || !isset($data['password'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Data tidak lengkap']);
            exit;
        }
        $stmt = $conn->prepare("INSERT INTO users (name, email, nim, role, password, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
        $stmt->bind_param("sssss", $data['name'], $data['email'], $data['nim'], $data['role'], $data['password']);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'User berhasil ditambahkan']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal menambah user']);
        }
        $stmt->close();
        break;

    case 'PUT':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'ID user diperlukan']);
            exit;
        }
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare("UPDATE users SET name=?, email=?, nim=?, role=?, password=? WHERE id=?");
        $stmt->bind_param("sssssi", $data['name'], $data['email'], $data['nim'], $data['role'], $data['password'], $id);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'User berhasil diupdate']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal update user']);
        }
        $stmt->close();
        break;

    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'ID user diperlukan']);
            exit;
        }
        $stmt = $conn->prepare("DELETE FROM users WHERE id=?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'User berhasil dihapus']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal hapus user']);
        }
        $stmt->close();
        break;
}

$conn->close();
?>
