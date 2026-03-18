<?php
require_once "auth_session.php";
require_once "../config/db.php";

$db = new DB();
$conn = $db->connect();

$id = $_GET['id'] ?? $_POST['id'] ?? null;
$data = ['name'=>'','tagline'=>'','description'=>'','type'=>'drone','specs'=>'','image'=>''];

// LOAD DATA IF EDITING
if ($id && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    $stmt = $conn->prepare("SELECT * FROM products WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $res = $stmt->get_result()->fetch_assoc();
    if($res) {
        $data = $res;
        $specsArr = json_decode($res['specs'] ?? '[]', true);
        if(is_array($specsArr)) $data['specs'] = implode(", ", $specsArr);
    }
}

// SAVE DATA
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $tagline = $_POST['tagline'];
    $desc = $_POST['description'];
    $type = $_POST['type'];
    
    // Specs handling
    $specsRaw = $_POST['specs']; 
    $specsJson = json_encode(array_map('trim', explode(',', $specsRaw)));

    // Image handling
    $image_path = $_POST['existing_image'];
    
    if (!empty($_FILES['image']['name'])) {
        $target_dir = "../uploads/";
        if (!file_exists($target_dir)) mkdir($target_dir, 0777, true);
        
        $filename = time() . "_" . basename($_FILES["image"]["name"]);
        $target_file = $target_dir . $filename;
        
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
            // 🚨 IMPORTANT: Ensure 'radarsnipers' matches your folder name
            $image_path = $protocol . "://" . $_SERVER['HTTP_HOST'] . "/radarsnipers/backend/uploads/" . $filename;
        }
    }

    if ($id) {
        $stmt = $conn->prepare("UPDATE products SET name=?, tagline=?, description=?, type=?, specs=?, image=? WHERE id=?");
        $stmt->bind_param("ssssssi", $name, $tagline, $desc, $type, $specsJson, $image_path, $id);
    } else {
        $stmt = $conn->prepare("INSERT INTO products (name, tagline, description, type, specs, image) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $name, $tagline, $desc, $type, $specsJson, $image_path);
    }
    
    if ($stmt->execute()) {
        header("Location: products.php");
        exit;
    } else {
        echo "Error: " . $stmt->error;
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title><?= $id ? 'Edit' : 'Add' ?> Product</title>
    <style>
        body { font-family: sans-serif; padding: 40px; background: #f8fafc; }
        form { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); max-width: 600px; margin: auto; }
        input, select, textarea { width: 100%; padding: 10px; margin: 5px 0 15px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
        button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer; }
    </style>
</head>
<body>
    <h2 style="text-align:center;"><?= $id ? 'Edit' : 'Add New' ?> Product</h2>
    <form method="POST" enctype="multipart/form-data">
        <input type="hidden" name="id" value="<?= htmlspecialchars($id ?? '') ?>">
        
        <label>Name</label>
        <input type="text" name="name" value="<?= htmlspecialchars($data['name']) ?>" required>

        <label>Tagline</label>
        <input type="text" name="tagline" value="<?= htmlspecialchars($data['tagline']) ?>">

        <label>Category</label>
        <select name="type">
            <option value="drone" <?= $data['type']=='drone'?'selected':'' ?>>Drone</option>
            <option value="software" <?= $data['type']=='software'?'selected':'' ?>>Software</option>
        </select>

        <label>Description</label>
        <textarea name="description" rows="5"><?= htmlspecialchars($data['description']) ?></textarea>

        <label>Specs (e.g. Speed: 100km/h, Range: 5km)</label>
        <input type="text" name="specs" value="<?= htmlspecialchars($data['specs']) ?>">

        <label>Image</label>
        <input type="file" name="image" accept="image/*">
        <input type="hidden" name="existing_image" value="<?= htmlspecialchars($data['image']) ?>">
        
        <?php if(!empty($data['image'])): ?>
            <br><img src="<?= htmlspecialchars($data['image']) ?>" style="width:100px; border-radius:4px;">
        <?php endif; ?>

        <br><br>
        <button type="submit">Save</button>
        <a href="products.php" style="display:block; text-align:center; margin-top:15px; color:#666;">Cancel</a>
    </form>
</body>
</html>