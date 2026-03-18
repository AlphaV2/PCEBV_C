<?php
require 'auth_session.php';
require '../config/db.php';

$db = new DB();
$conn = $db->connect();
$message = "";

if (isset($_GET['delete'])) {
    $id = intval($_GET['delete']);
    $conn->query("DELETE FROM gallery WHERE id=$id");
    header("Location: gallery.php");
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'];
    $category = $_POST['category'];
    $location = $_POST['location'];

    $target_dir = "../uploads/";
    $file_name = time() . "_" . basename($_FILES["media"]["name"]);
    $target_file = $target_dir . $file_name;

    if (move_uploaded_file($_FILES["media"]["tmp_name"], $target_file)) {
        $stmt = $conn->prepare("INSERT INTO gallery (title, category, location, type, media_url) VALUES (?, ?, ?, 'image', ?)");
        $img_path = "uploads/" . $file_name;
        $stmt->bind_param("ssss", $title, $category, $location, $img_path);
        if($stmt->execute()) $message = "Image Uploaded!";
    } else {
        $message = "Upload failed.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Manage Gallery</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
    <div class="sidebar">
        <h3>Radar Admin</h3>
        <a href="dashboard.php">Dashboard</a>
        <a href="products.php">Manage Products</a>
        <a href="gallery.php" class="active">Manage Gallery</a>
        <a href="messages.php">Messages</a>
        <a href="logout.php" class="logout">Logout</a>
    </div>

    <div class="content">
        <h2>Manage Gallery</h2>
        <?php if($message) echo "<p style='color:green;'>$message</p>"; ?>

        <div class="card">
            <h3>Upload Image</h3>
            <form method="POST" enctype="multipart/form-data">
                <input type="text" name="title" placeholder="Image Title (e.g. Tech Expo)" required>
                <input type="text" name="location" placeholder="Location (e.g. New Delhi)">
                <select name="category">
                    <option value="demo">Product Demo (Carousel)</option>
                    <option value="exhibition">Exhibition (Right Column)</option>
                </select>
                <input type="file" name="media" required>
                <button type="submit">Upload</button>
            </form>
        </div>

        <h3>Gallery Items</h3>
        <table>
            <tr><th>Preview</th><th>Title</th><th>Category</th><th>Action</th></tr>
            <?php
            $res = $conn->query("SELECT * FROM gallery ORDER BY id DESC");
            while($row = $res->fetch_assoc()) {
                echo "<tr>
                    <td><img src='../{$row['media_url']}' class='thumb'></td>
                    <td>{$row['title']}<br><small>{$row['location']}</small></td>
                    <td>".ucfirst($row['category'])."</td>
                    <td><a href='gallery.php?delete={$row['id']}' class='btn btn-danger' onclick='return confirm(\"Delete?\")'>Delete</a></td>
                </tr>";
            }
            ?>
        </table>
    </div>
</body>
</html>