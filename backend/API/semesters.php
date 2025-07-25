<?php
header('Content-Type: application/json');
require_once(__DIR__ . '/../connectionDB.php');

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? $_GET['id'] : null;

switch ($method) {
    case 'GET':
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM semesters WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_assoc();
            echo json_encode(['status' => 'success', 'data' => $data]);
        } else {
            $result = $conn->query("SELECT * FROM semesters");
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode(['status' => 'success', 'data' => $data]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['number']) || !isset($data['name'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Data tidak lengkap']);
            exit;
        }
        $stmt = $conn->prepare("INSERT INTO semesters (number, name) VALUES (?, ?)");
        $stmt->bind_param("is", $data['number'], $data['name']);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Semester berhasil ditambahkan']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal menambah semester']);
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
        $stmt = $conn->prepare("UPDATE semesters SET number=?, name=? WHERE id=?");
        $stmt->bind_param("isi", $data['number'], $data['name'], $id);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Semester berhasil diupdate']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal update semester']);
        }
        $stmt->close();
        break;

    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'ID diperlukan']);
            exit;
        }
        $stmt = $conn->prepare("DELETE FROM semesters WHERE id=?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Semester berhasil dihapus']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal hapus semester']);
        }
        $stmt->close();
        break;
}
$conn->close();
?>
