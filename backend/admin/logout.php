<?php
require "auth-check.php";
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>

<div class="sidebar">
    <h3>Radar Sniper Admin</h3>
    <a href="dashboard.php">Dashboard</a>
    <a href="add-product.php">Add Product</a>
    <a href="view-messages.php">Contact Messages</a>
    <a href="logout.php" class="logout">Logout</a>
</div>

<div class="content">
    <h1>Welcome Admin</h1>
    <p>Manage products, contact messages, and website content.</p>
</div>

</body>
</html>
