<?php
require "../config/db.php";
require "../utils/sanitize.php";
require "../utils/response.php";

if (!isset($_GET['id'])) send(false, "Product ID missing");

$id = clean($_GET['id']);

$sql = "SELECT * FROM products WHERE id=$id LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows == 0) send(false, "Product not found");

send(true, "Product fetched", $result->fetch_assoc());
?>
