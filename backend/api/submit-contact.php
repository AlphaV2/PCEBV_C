<?php
// 1. ALLOW REACT TO CONNECT (CORS HEADERS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// 2. HANDLE THE "HANDSHAKE" (Preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 3. CONNECT TO DATABASE
// We use a relative path. Since this file is in 'api/', we go up one level to 'config/'
$db_path = "../config/db.php";

if (!file_exists($db_path)) {
    echo json_encode(["status" => false, "message" => "Server Error: db.php not found"]);
    exit;
}

require_once $db_path;

// 4. INITIALIZE CONNECTION
// If this fails, it usually means the class name in db.php is wrong or the file has syntax errors
try {
    $db = new DB();
    $conn = $db->connect();
} catch (Exception $e) {
    echo json_encode(["status" => false, "message" => "Connection failed: " . $e->getMessage()]);
    exit;
}

// 5. READ DATA
$name    = $_POST['name']    ?? '';
$email   = $_POST['email']   ?? '';
$phone   = $_POST['phone']   ?? '';
$enquiry = $_POST['enquiry'] ?? '';
$message = $_POST['message'] ?? '';

// 6. VALIDATE
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(["status" => false, "message" => "Missing required fields"]);
    exit;
}

// 7. INSERT
$sql = "INSERT INTO contact_messages (name, email, phone, enquiry, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => false, "message" => "SQL Error: " . $conn->error]);
    exit;
}

$stmt->bind_param("sssss", $name, $email, $phone, $enquiry, $message);

if ($stmt->execute()) {
    echo json_encode(["status" => true, "message" => "Message sent successfully"]);
} else {
    echo json_encode(["status" => false, "message" => "Database Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>