<?php
// Include the database connection file
require_once 'db_connect.php';

// Get access to the database instance
$db = Database::getInstance();

// Get the database connection from the database
$conn = $db->getConnection();

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the name and password from the request body
    if(isset($_POST['name'])){
        $name = $_POST['name'];
    }
    if(isset($_POST['password'])){
        $password = $_POST['password'];
    }

    // Print the username and password 
    // var_dump("Username: ". $name);      
    // var_dump("Paswword: ". $password);      
    // Print the POST data     
    // var_dump("POST Data: ");     
    // var_dump($_POST);

    // Prepare a SQL query to select the user with the given name and password
    $stmt = $conn->prepare("SELECT * FROM userTable WHERE name =? AND password =?");
    if ($stmt === false) {
        die("Error: ". $conn->error);
    }
    $stmt->bind_param("ss", $name, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if a user was found with the given credentials
    if ($result->num_rows > 0) {
        // Generate a unique API key for the user
        $api_key = bin2hex(random_bytes(16));

        // Update the user's API key in the database
        $stmt = $conn->prepare("UPDATE userTable SET api_key =? WHERE name =?");
        $stmt->bind_param("ss", $api_key, $name);
        $stmt->execute();

        // Return the API key to the user
        $response = array(
            'success' => 1,
            'api_key' => $api_key
        );
        echo json_encode($response);
    } else {
        // Return an error message if the credentials are incorrect
        $response = array(
            'success' => 0,
            'message' => 'Invalid name or password'
        );
        echo json_encode($response);
    }
} else {
    // Return an error message if the request method is not POST
    $response = array(
        'success' => 0,
        'message' => 'Invalid request method'
    );
    echo json_encode($response);
}
?>