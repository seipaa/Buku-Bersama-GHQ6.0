<?php
header('Content-Type: application/json');
require_once(__DIR__ . '/../connectionDB.php');

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? $_GET['id'] : null;

switch ($method) {
    case 'GET':
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM appreciations WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_assoc();
            echo json_encode(['status' => 'success', 'data' => $data]);
        } else {
            $result = $conn->query("SELECT * FROM appreciations");
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode(['status' => 'success', 'data' => $data]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['userId']) || !isset($data['resumeId']) || !isset($data['type'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Data tidak lengkap']);
            exit;
        }
        $stmt = $conn->prepare("INSERT INTO appreciations (userId, resumeId, type, message, createdAt) VALUES (?, ?, ?, ?, NOW())");
        $stmt->bind_param("ssss", $data['userId'], $data['resumeId'], $data['type'], $data['message']);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Apresiasi berhasil ditambahkan']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal menambah apresiasi']);
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
        $stmt = $conn->prepare("UPDATE appreciations SET type=?, message=? WHERE id=?");
        $stmt->bind_param("ssi", $data['type'], $data['message'], $id);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Apresiasi berhasil diupdate']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal update apresiasi']);
        }
        $stmt->close();
        break;

    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'ID diperlukan']);
            exit;
        }
        $stmt = $conn->prepare("DELETE FROM appreciations WHERE id=?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Apresiasi berhasil dihapus']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal hapus apresiasi']);
        }
        $stmt->close();
        break;
}
$conn->close();
?>
