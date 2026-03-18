<?php
require_once "../config/security.php";
require_once "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if (!$username || !$password) {
    echo json_encode(["status" => false, "message" => "Missing credentials"]);
    exit;
}

$db = new DB();
$conn = $db->connect();

// Use SHA256 hashing (Simple & compatible)
$hashed_pass = hash('sha256', $password);

$stmt = $conn->prepare("SELECT id FROM admin_users WHERE username = ? AND password = ?");
$stmt->bind_param("ss", $username, $hashed_pass);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => true, "token" => bin2hex(random_bytes(16))]); // Simple Session Token
} else {
    echo json_encode(["status" => false, "message" => "Invalid credentials"]);
}
?>