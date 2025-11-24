<?php
require "../config/db.php";
require "../utils/sanitize.php";
require "../utils/response.php";

$name = clean($_POST['name']);
$email = clean($_POST['email']);
$phone = clean($_POST['phone']);
$message = clean($_POST['message']);

$sql = $conn->prepare("INSERT INTO contact_messages (name, email, phone, message)
VALUES (?, ?, ?, ?)");
$sql->bind_param("ssss", $name, $email, $phone, $message);

if ($sql->execute()) {
    send(true, "Message submitted");

} else {
    send(false, "Database error");
}
?>
