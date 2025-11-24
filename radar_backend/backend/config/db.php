<?php
$host = "localhost";
$user = "radarsni";
$pass = "YOUR_CPANEL_DB_PASSWORD";
$db   = "radarsniper_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "DB connection failed"]));
}
?>
