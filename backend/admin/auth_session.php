<?php
session_start();

// If user is NOT logged in, redirect to login page immediately
if (!isset($_SESSION["admin_logged_in"]) || $_SESSION["admin_logged_in"] !== true) {
    header("Location: index.php");
    exit();
}
?>