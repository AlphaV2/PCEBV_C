<?php
require "../config/db.php";
require "../config/security.php";
require "../utils/response.php";

$sql = "SELECT * FROM products ORDER BY id DESC";
$result = $conn->query($sql);

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

send(true, "Products fetched", $products);
?>
