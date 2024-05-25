<?php
// Include the database connection file
require_once 'db_connect.php';

// Get access to the database instance
$db = Database::getInstance();

// Get the database connection from the database
$conn = $db->getConnection();

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the required parameters are present in the request body
    if (isset($_POST['type']) && isset($_POST['apikey']) && isset($_POST['return'])) {
        // Required: apikey, type, return. 
        $type = $_POST['type'];
        $apikey = $_POST['apikey'];
        $return = $_POST['return'];

        // Optional: limit, sort, order, fuzzy, search
        $limit = isset($_POST['limit'])? $_POST['limit'] : 10; // Set a default value for limit
        $sort = isset($_POST['sort'])? $_POST['sort'] : null;
        $order = isset($_POST['order'])? $_POST['order'] : null;
        $fuzzy = isset($_POST['fuzzy'])? $_POST['fuzzy'] : false;
        $search = isset($_POST['search'])? json_decode($_POST['search']) : [];

        // Check if the API key is valid
        $stmt = $conn->prepare("SELECT * FROM userTable WHERE api_key =?");
        $stmt->bind_param("s", $apikey);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Handle the different types of requests
            switch ($type) {
                case 'GetAllListings':
                    // Handle the GetAllListings request
                    // Perform database query to retrieve listings based on the provided parameters
                    // Example: SELECT * FROM listingsTable WHERE location LIKE '%Hatfield%' AND type = 'ale'
                    
                    // Fetch the listings based on the provided parameters
                    // Construct the SQL query to fetch the listings based on the provided search criteriaparameters
                    $query = "SELECT * FROM listingTable WHERE 1=1";

                    // var_dump('_POST',$_POST);
                    // Loop through the search criteria and add conditions to the SQL query
                    if (!empty($search)) {
                        foreach ($search as $key => $value) {
                            switch ($key) {
                                case 'id':
                                case 'title':
                                case 'location':
                                case 'amenities':
                                case 'description':
                                    $query .= " AND $key LIKE '%$value%'";
                                    break;
                                case 'price':
                                case 'bedrooms':
                                case 'bathrooms':
                                case 'parking_spaces':
                                    $query .= " AND $key = $value";
                                    break;
                                case 'type':
                                    $query .= " AND $key = '$value'";
                                    break;
                            }
                        }
                    }
                    // TODO maybe
                    // if ($fuzzy) {
                    //     // Apply fuzzy search logic if enabled
                    //     // Example: Use a fuzzy search library or algorithm to match the location and type
                    // }
                    // var_dump('type',$type);
                    // var_dump('query',$query);
                    $stmt = $conn->prepare($query);
                    if ($stmt === false) {
                        // Handle the error
                        $response = array(
                            'status' => 'error',
                            'message' => 'Failed to prepare the SQL statement'
                        );
                        echo json_encode($response);
                        exit;
                    }
                    $stmt->execute();
                    // The output of the code snippet will be an array of associative arrays representing the fetched listings. Each associative array will contain the column names as keys and the corresponding values from the database.
                    $listings = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
                    // Limit the number of listings based on the provided limit parameter
                    $limitedListings = array_slice($listings, 0, $limit);
                    
                    // Sort the listings based on the provided sort and order parameters
                    if ($sort && $order) {
                        usort($limitedListings, function ($a, $b) use ($sort, $order) {
                            if ($order === 'asc') {
                                return $a[$sort] <=> $b[$sort];
                            } else {
                                return $b[$sort] <=> $a[$sort];
                            }
                        });
                    }
                    
                    // var_dump('listings', $listings);
                    // Prepare the response data
                    // $responseData = array();
                    // var_dump('limitedListings', $limitedListings);
                    // foreach ($limitedListings as $listing) {
                    //     $listingData = array();
                    //     var_dump('listing', $listing);
                    //     foreach ($return as $field) {
                    //         $listingData[$field] = $listing[$field];
                    //     }
                    //     $responseData[] = $listingData;
                    //     var_dump('responseData', $responseData);
                    // }

                    // Prepare the response object
                    $response = array(
                        'status' => 'success',
                        'timestamp' => time() * 1000, // Convert to milliseconds
                        'data' => $limitedListings
                    );
                    echo json_encode($response);
                    exit;

                // Add more cases for other types of requests
                default:
                    // Return an error message for unsupported request types
                    $response = array(
                        'success' => 0,
                        'message' => 'Unsupported request type'
                    );
                    echo json_encode($response);
                    exit;
            }
        } else {
            // Return an error message if the API key is invalid
            $response = array(
                'success' => 0,
                'message' => 'Invalid API key'
            );
            echo json_encode($response);
        }
    } else {
        // Return an error message if the required parameters are missing
        $response = array(
            'success' => 0,
            'message' => 'Missing required parameters'
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