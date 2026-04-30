<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "radarsnipers_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  echo json_encode(["status" => "error", "message" => $conn->connect_error]);
} else {
  echo json_encode(["status" => "ok", "message" => "Database connected successfully"]);
}

$conn->close();
