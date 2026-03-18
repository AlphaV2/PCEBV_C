<?php
// backend/api/get_gallery.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/db.php'; // Ensure path to db.php is correct

$database = new DB();
$db = $database->connect();

$query = "SELECT * FROM gallery ORDER BY id DESC";
$result = $db->query($query);

$gallery = ["demos" => [], "exhibitions" => []];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $item = [
            "id" => $row['id'],
            "title" => $row['title'],
            "src" => "http://localhost/radarsnipers/backend/uploads/" . $row['media_url'], // UPDATE DOMAIN ON LIVE
            "location" => $row['location'],
            "type" => $row['type']
        ];
        
        if ($row['category'] == 'demo') {
            array_push($gallery['demos'], $item);
        } else {
            array_push($gallery['exhibitions'], $item);
        }
    }
}

echo json_encode(["status" => true, "data" => $gallery]);
?>