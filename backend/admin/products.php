<?php
require 'auth_session.php';
require '../config/db.php';

$db = new DB();
$conn = $db->connect();
$message = "";

// DELETE
if (isset($_GET['delete'])) {
    $id = intval($_GET['delete']);
    $conn->query("DELETE FROM products WHERE id=$id");
    header("Location: products.php");
}

// ADD
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $tagline = $_POST['tagline'];
    $category = $_POST['category'];
    $desc = $_POST['description'];
    // JSON Specs
    $specs = json_encode(array_map('trim', explode(',', $_POST['specs']))); 

    $target_dir = "../uploads/";
    $file_name = time() . "_" . basename($_FILES["image"]["name"]);
    $target_file = $target_dir . $file_name;

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
        $sql = "INSERT INTO products (name, tagline, category, description, specs, image_url) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $img_path = "uploads/" . $file_name;
        $stmt->bind_param("ssssss", $name, $tagline, $category, $desc, $specs, $img_path);
        
        if ($stmt->execute()) $message = "Product Added Successfully!";
        else $message = "Error: " . $conn->error;
    } else {
        $message = "Image upload failed.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Manage Products</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
    <div class="sidebar">
        <h3>Radar Admin</h3>
        <a href="dashboard.php">Dashboard</a>
        <a href="products.php" class="active">Manage Products</a>
        <a href="gallery.php">Manage Gallery</a>
        <a href="messages.php">Messages</a>
        <a href="logout.php" class="logout">Logout</a>
    </div>

    <div class="content">
        <h2>Manage Products</h2>
        <?php if($message) echo "<p style='color:green; font-weight:bold;'>$message</p>"; ?>

        <div class="card">
            <h3>Add New Product</h3>
            <form method="POST" enctype="multipart/form-data">
                <input type="text" name="name" placeholder="Product Name" required>
                <input type="text" name="tagline" placeholder="Tagline (e.g. Precision Agriculture)" required>
                <select name="category">
                    <option value="drone">Drone</option>
                    <option value="hardware">Hardware (Sensor)</option>
                    <option value="software">Software</option>
                </select>
                <input type="text" name="specs" placeholder="Specs (comma separated: Range:2km, Battery:LiPo)" required>
                <textarea name="description" placeholder="Description" rows="3" required></textarea>
                <input type="file" name="image" required>
                <button type="submit">Add Product</button>
            </form>
        </div>

        <h3>Product List</h3>
        <table>
            <tr><th>Image</th><th>Name</th><th>Category</th><th>Actions</th></tr>
            <?php
            $result = $conn->query("SELECT * FROM products ORDER BY id DESC");
            while($row = $result->fetch_assoc()) {
                echo "<tr>
                    <td><img src='../{$row['image_url']}' class='thumb'></td>
                    <td><b>{$row['name']}</b><br><small>{$row['tagline']}</small></td>
                    <td>{$row['category']}</td>
                    <td><a href='products.php?delete={$row['id']}' class='btn btn-danger' onclick='return confirm(\"Delete?\")'>Delete</a></td>
                </tr>";
            }
            ?>
        </table>
    </div>
</body>
</html>