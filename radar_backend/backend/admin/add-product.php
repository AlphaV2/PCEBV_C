<?php
require "auth-check.php";
require "../config/db.php";

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $description = $_POST["description"];

    // Upload image
    $img = "";
    if (!empty($_FILES["image"]["name"])) {
        $img = "uploads/" . time() . "_" . basename($_FILES["image"]["name"]);
        move_uploaded_file($_FILES["image"]["tmp_name"], $img);
    }

    $sql = $conn->prepare("INSERT INTO products (name, description, image) VALUES (?, ?, ?)");
    $sql->bind_param("sss", $name, $description, $img);

    if ($sql->execute()) {
        $message = "Product added!";
    } else {
        $message = "Error!";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Add Product</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>

<div class="sidebar">
    <a href="dashboard.php">Dashboard</a>
    <a href="view-messages.php">Messages</a>
    <a href="logout.php">Logout</a>
</div>

<div class="content">
    <h2>Add New Product</h2>
    <p><?= $message ?></p>

    <form method="POST" enctype="multipart/form-data">
        <input type="text" name="name" placeholder="Product name" required />
        <textarea name="description" placeholder="Description" required></textarea>
        <input type="file" name="image" accept="image/*" />
        <button type="submit">Add Product</button>
    </form>
</div>

</body>
</html>
