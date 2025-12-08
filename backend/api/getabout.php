<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "../config/db.php";

$db = new DB();
$conn = $db->connect();

// Fetch Content
$content = [];
$sql_content = "SELECT paragraph_text FROM about_content ORDER BY section_order ASC";
$result_content = $conn->query($sql_content);
if ($result_content) {
    while ($row = $result_content->fetch_assoc()) {
        $content[] = $row['paragraph_text'];
    }
}

// Fetch Team
$team = [];
$sql_team = "SELECT * FROM team_members";
$result_team = $conn->query($sql_team);
if ($result_team) {
    while ($row = $result_team->fetch_assoc()) {
        $team[] = $row;
    }
}

echo json_encode([
    "status" => true, 
    "data" => [
        "content" => $content, 
        "team" => $team
    ]
]);

$conn->close();
?>