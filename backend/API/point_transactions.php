<?php
header('Content-Type: application/json');
require_once(__DIR__ . '/../connectionDB.php');

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? $_GET['id'] : null;

switch ($method) {
    case 'GET':
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM point_transactions WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_assoc();
            echo json_encode(['status' => 'success', 'data' => $data]);
        } else {
            $result = $conn->query("SELECT * FROM point_transactions");
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode(['status' => 'success', 'data' => $data]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['userId']) || !isset($data['type']) || !isset($data['amount'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Data tidak lengkap']);
            exit;
        }
        $stmt = $conn->prepare("INSERT INTO point_transactions (userId, type, amount, reason, resumeId, createdAt) VALUES (?, ?, ?, ?, ?, NOW())");
        $stmt->bind_param("ssiss", $data['userId'], $data['type'], $data['amount'], $data['reason'], $data['resumeId']);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Transaksi poin berhasil ditambahkan']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal menambah transaksi poin']);
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
        $stmt = $conn->prepare("UPDATE point_transactions SET type=?, amount=?, reason=?, resumeId=? WHERE id=?");
        $stmt->bind_param("sissi", $data['type'], $data['amount'], $data['reason'], $data['resumeId'], $id);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Transaksi poin berhasil diupdate']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal update transaksi poin']);
        }
        $stmt->close();
        break;

    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'ID diperlukan']);
            exit;
        }
        $stmt = $conn->prepare("DELETE FROM point_transactions WHERE id=?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Transaksi poin berhasil dihapus']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal hapus transaksi poin']);
        }
        $stmt->close();
        break;
}
$conn->close();
?>
