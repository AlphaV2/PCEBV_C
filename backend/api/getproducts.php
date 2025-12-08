<?php
// 1. HEADERS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. CONNECT
require_once "../config/db.php";
$db = new DB();
$conn = $db->connect();

// 3. FETCH
$sql = "SELECT * FROM projects ORDER BY id ASC";
$result = $conn->query($sql);

$projects = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // 4. DECODE JSON COLUMNS
        // These columns are stored as text in DB, so we convert them to Arrays/Objects
        $row['metrics'] = json_decode($row['metrics']); 
        $row['fullDetails'] = json_decode($row['full_details']); // Map DB 'full_details' to React 'fullDetails'
        
        // Remove the raw DB column to keep it clean
        unset($row['full_details']);

        $projects[] = $row;
    }
}

echo json_encode(["status" => true, "data" => $projects]);
$conn->close();
?>