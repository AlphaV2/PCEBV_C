<?php
session_start();
require "../config/db.php";

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = hash('sha256', $_POST["password"]);

    $sql = "SELECT * FROM admin_users WHERE username='$username' AND password='$password'";
    $res = $conn->query($sql);

    if ($res->num_rows > 0) {
        $_SESSION["admin_logged_in"] = true;
        header("Location: dashboard.php");
        exit;
    } else {
        $message = "Invalid Credentials";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Login</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
<div class="login-box">
    <h2>Radar Sniper Admin</h2>
    <form method="POST">
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
    </form>
    <p class="error"><?= $message ?></p>
</div>
</body>
</html>
