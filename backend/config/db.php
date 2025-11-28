<?php
class DB {
    private $host = "localhost";
    private $user = "root"; // XAMPP default
    private $pass = "";     // XAMPP default
    private $dbname = "radarsniperS_db";

    public $conn;

    public function connect() {
        $this->conn = new mysqli($this->host, $this->user, $this->pass, $this->dbname);
        if ($this->conn->connect_error) {
            die(json_encode(["status" => false, "message" => "DB Connection Failed: " . $this->conn->connect_error]));
        }
        $this->conn->set_charset("utf8mb4");
        return $this->conn;
    }
}