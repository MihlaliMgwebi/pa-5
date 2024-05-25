<?php
class Database {
    private static $instance = null;
    private $host = "localhost";
    private $db_name = "pa5";
    private $username = "root";
    private $password = "root";
    private $conn;

    private function __construct() {
        $this->conn = null;

        try {
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);
        } catch(PDOException $exception) {
            echo "Connection error: ". $exception->getMessage();
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->conn;
    }
}

// Usage example:
// $db = Database::getInstance();
// $conn = $db->getConnection();
?>