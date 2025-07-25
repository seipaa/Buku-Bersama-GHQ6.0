<?php
header('Content-Type: application/json');
require_once(__DIR__ . '/../connectionDB.php');

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? $_GET['id'] : null;

switch ($method) {
    case 'GET':
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM ai_reviews WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_assoc();
            echo json_encode(['status' => 'success', 'data' => $data]);
        } else {
            $result = $conn->query("SELECT * FROM ai_reviews");
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode(['status' => 'success', 'data' => $data]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['resumeId']) || !isset($data['score']) || !isset($data['feedback'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Data tidak lengkap']);
            exit;
        }
        $stmt = $conn->prepare("INSERT INTO ai_reviews (resumeId, score, feedback, summary, strengths, improvements, tags, difficulty, estimatedReadTime, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
        $stmt->bind_param("sdssssssi", $data['resumeId'], $data['score'], $data['feedback'], $data['summary'], $data['strengths'], $data['improvements'], $data['tags'], $data['difficulty'], $data['estimatedReadTime']);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'AI Review berhasil ditambahkan']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal menambah AI Review']);
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
        $stmt = $conn->prepare("UPDATE ai_reviews SET score=?, feedback=?, summary=?, strengths=?, improvements=?, tags=?, difficulty=?, estimatedReadTime=? WHERE id=?");
        $stmt->bind_param("dssssssii", $data['score'], $data['feedback'], $data['summary'], $data['strengths'], $data['improvements'], $data['tags'], $data['difficulty'], $data['estimatedReadTime'], $id);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'AI Review berhasil diupdate']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal update AI Review']);
        }
        $stmt->close();
        break;

    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'ID diperlukan']);
            exit;
        }
        $stmt = $conn->prepare("DELETE FROM ai_reviews WHERE id=?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'AI Review berhasil dihapus']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal hapus AI Review']);
        }
        $stmt->close();
        break;
}
$conn->close();
?>
