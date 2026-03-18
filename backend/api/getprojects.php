<?php
require_once "../config/security.php";
require_once "../config/db.php";

try {
    $db = new DB();
    $conn = $db->connect();

    $sql = "SELECT * FROM projects ORDER BY id DESC";
    $result = $conn->query($sql);

    $projects = [];
    while ($row = $result->fetch_assoc()) {
        $row['metrics'] = json_decode($row['metrics'] ?? '[]');
        $row['fullDetails'] = json_decode($row['full_details'] ?? '{}');
        $row['image'] = $row['image_url'];
        
        unset($row['full_details'], $row['image_url']);
        $projects[] = $row;
    }

    echo json_encode(["status" => true, "data" => $projects]);

} catch (Exception $e) {
    error_log("Projects API Error: " . $e->getMessage(), 3, "../logs/error.log");
    echo json_encode(["status" => false, "message" => "Server Error"]);
}
?>