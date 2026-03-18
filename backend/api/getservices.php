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
$sql = "SELECT * FROM services ORDER BY id ASC";
$result = $conn->query($sql);

$services = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // 4. DECODE JSON COLUMNS
        // The DB stores them as strings, React needs Arrays/Objects
        $row['features'] = json_decode($row['features']); 
        $row['details']  = json_decode($row['details']); 
        
        // Frontend expects 'id' to be the string ID for routing/modals
        // We swap the database ID with the string ID
        $row['db_id'] = $row['id']; // Keep original ID just in case
        $row['id'] = $row['service_id_str']; 
        unset($row['service_id_str']);

        $services[] = $row;
    }
}

echo json_encode(["status" => true, "data" => $services]);
$conn->close();
?>