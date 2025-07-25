<?php
header('Content-Type: application/json');
require_once(__DIR__ . '/../connectionDB.php');

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? $_GET['id'] : null;

switch ($method) {
    case 'GET':
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM materials WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_assoc();
            echo json_encode(['status' => 'success', 'data' => $data]);
        } else {
            $result = $conn->query("SELECT * FROM materials");
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode(['status' => 'success', 'data' => $data]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['title']) || !isset($data['description']) || !isset($data['content'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Data tidak lengkap']);
            exit;
        }
        $stmt = $conn->prepare("INSERT INTO materials (title, description, content, mataKuliah, semesterId, semester, programStudiId, authorId, tags, downloadCount, appreciationCount, viewCount, fileUrl, pdfUrl, thumbnailUrl, status, aiReviewScore, aiReviewFeedback, aiReviewSummary, difficulty, estimatedReadTime, isOpenSource, license, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        $stmt->bind_param("sssssisissiiisssssdsiis", $data['title'], $data['description'], $data['content'], $data['mataKuliah'], $data['semesterId'], $data['semester'], $data['programStudiId'], $data['authorId'], $data['tags'], $data['downloadCount'], $data['appreciationCount'], $data['viewCount'], $data['fileUrl'], $data['pdfUrl'], $data['thumbnailUrl'], $data['status'], $data['aiReviewScore'], $data['aiReviewFeedback'], $data['aiReviewSummary'], $data['difficulty'], $data['estimatedReadTime'], $data['isOpenSource'], $data['license']);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Material berhasil ditambahkan']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal menambah material']);
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
        $stmt = $conn->prepare("UPDATE materials SET title=?, description=?, content=?, mataKuliah=?, semesterId=?, semester=?, programStudiId=?, authorId=?, tags=?, downloadCount=?, appreciationCount=?, viewCount=?, fileUrl=?, pdfUrl=?, thumbnailUrl=?, status=?, aiReviewScore=?, aiReviewFeedback=?, aiReviewSummary=?, difficulty=?, estimatedReadTime=?, isOpenSource=?, license=?, updatedAt=NOW() WHERE id=?");
        $stmt->bind_param("sssssisissiiisssssdsiisi", $data['title'], $data['description'], $data['content'], $data['mataKuliah'], $data['semesterId'], $data['semester'], $data['programStudiId'], $data['authorId'], $data['tags'], $data['downloadCount'], $data['appreciationCount'], $data['viewCount'], $data['fileUrl'], $data['pdfUrl'], $data['thumbnailUrl'], $data['status'], $data['aiReviewScore'], $data['aiReviewFeedback'], $data['aiReviewSummary'], $data['difficulty'], $data['estimatedReadTime'], $data['isOpenSource'], $data['license'], $id);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Material berhasil diupdate']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal update material']);
        }
        $stmt->close();
        break;

    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'ID diperlukan']);
            exit;
        }
        $stmt = $conn->prepare("DELETE FROM materials WHERE id=?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Material berhasil dihapus']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal hapus material']);
        }
        $stmt->close();
        break;
}
$conn->close();
?>
