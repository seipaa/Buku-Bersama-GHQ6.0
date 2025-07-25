<?php
header('Content-Type: application/json');
require_once(__DIR__ . '/../connectionDB.php');

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? $_GET['id'] : null;

switch ($method) {
    case 'GET':
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM universities WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_assoc();
            echo json_encode(['status' => 'success', 'data' => $data]);
        } else {
            $result = $conn->query("SELECT * FROM universities");
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode(['status' => 'success', 'data' => $data]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['name']) || !isset($data['location']) || !isset($data['type'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Data tidak lengkap']);
            exit;
        }
        $stmt = $conn->prepare("INSERT INTO universities (name, location, type) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $data['name'], $data['location'], $data['type']);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Universitas berhasil ditambahkan']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal menambah universitas']);
        }
        $stmt->close();
        break;

    case 'PUT':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'ID diperlukan']);
            exit;
        }
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $conn->prepare("UPDATE universities SET name=?, location=?, type=? WHERE id=?");
        $stmt->bind_param("sssi", $data['name'], $data['location'], $data['type'], $id);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Universitas berhasil diupdate']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal update universitas']);
        }
        $stmt->close();
        break;

    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'ID diperlukan']);
            exit;
        }
        $stmt = $conn->prepare("DELETE FROM universities WHERE id=?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Universitas berhasil dihapus']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal hapus universitas']);
        }
        $stmt->close();
        break;
}
$conn->close();
?>
