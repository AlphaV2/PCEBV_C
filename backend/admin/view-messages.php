<?php
require "auth-check.php";
require "../config/db.php";

$messages = $conn->query("SELECT * FROM contact_messages ORDER BY id DESC");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Messages</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>

<div class="sidebar">
    <a href="dashboard.php">Dashboard</a>
    <a href="add-product.php">Add Product</a>
    <a href="logout.php">Logout</a>
</div>

<div class="content">
    <h2>Contact Messages</h2>

    <?php while ($row = $messages->fetch_assoc()): ?>
        <div class="msg-card">
            <h4><?= $row['name'] ?></h4>
            <p>Email: <?= $row['email'] ?></p>
            <p>Phone: <?= $row['phone'] ?></p>
            <p><?= $row['message'] ?></p>
        </div>
    <?php endwhile; ?>
</div>

</body>
</html>
