<?php
// backend/admin/add-gallery.php
require 'auth_session.php';
require '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'];
    $category = $_POST['category']; // 'demo' or 'exhibition'
    $location = $_POST['location'];
    
    // Image Upload Logic
    $target_dir = "../uploads/";
    $file_name = time() . "_" . basename($_FILES["media"]["name"]);
    $target_file = $target_dir . $file_name;

    if (move_uploaded_file($_FILES["media"]["tmp_name"], $target_file)) {
        $db = new DB();
        $conn = $db->connect();
        $stmt = $conn->prepare("INSERT INTO gallery (title, category, location, type, media_url) VALUES (?, ?, ?, 'image', ?)");
        $stmt->bind_param("ssss", $title, $category, $location, $file_name);
        $stmt->execute();
        echo "Uploaded Successfully!";
    } else {
        echo "Upload Failed.";
    }
}
?>

<form method="post" enctype="multipart/form-data">
    <input type="text" name="title" placeholder="Title (e.g. Tech Expo)" required>
    <input type="text" name="location" placeholder="Location (e.g. Delhi)">
    <select name="category">
        <option value="demo">Product Demo (Left Side)</option>
        <option value="exhibition">Exhibition (Right Side)</option>
    </select>
    <input type="file" name="media" required>
    <button type="submit">Upload to Gallery</button>
</form>