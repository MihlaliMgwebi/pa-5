<?php
require_once 'db_connect.php';

$db = Database::getInstance();

$conn = $db->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['type']) && isset($_POST['apikey']) && isset($_POST['return'])) {
        $type = urldecode($_POST['type']);
        $apikey = urldecode($_POST['apikey']);
        $return = json_decode($_POST['return'], true);

        $limit = isset($_POST['limit'])? $_POST['limit'] : 10;
        $sort = isset($_POST['sort'])? $_POST['sort'] : null;
        $order = isset($_POST['order'])? $_POST['order'] : null;
        $fuzzy = isset($_POST['fuzzy'])? $_POST['fuzzy'] : false;
        $search = isset($_POST['search'])? json_decode($_POST['search']) : [];

        $stmt = $conn->prepare("SELECT * FROM userTable WHERE api_key =?");
        $stmt->bind_param("s", $apikey);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            switch ($type) {
                case 'GetAllListings':
                    $query = "SELECT ".implode(",",$return)." FROM listingTable WHERE 1=1";

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
                                case 'price-min':
                                    $query .= " AND $key >= $value";
                                    break;
                                case 'price-max':
                                    $query .= " AND $key <= $value";
                                    break;
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

                    if ($fuzzy) {
                        // TODO
                    }

                    $stmt = $conn->prepare($query);
                    if ($stmt === false) {

                        $response = array(
                            'status' => 'error',
                            'message' => 'Failed to prepare the SQL statement'
                        );
                        echo json_encode($response);
                        exit;
                    }
                    $stmt->execute();
                    $listings = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
                    $limitedListings = array_slice($listings, 0, $limit);

                    if ($sort && $order) {
                        usort($limitedListings, function ($a, $b) use ($sort, $order) {
                            if ($order === 'asc') {
                                return $a[$sort] <=> $b[$sort];
                            } else {
                                return $b[$sort] <=> $a[$sort];
                            }
                        });
                    }

                    $response = array(
                        'status' => 'success',
                        'timestamp' => time() * 1000,
                        'data' => $limitedListings
                    );
                    echo json_encode($response);
                    exit;

                default:
                    $response = array(
                        'success' => 0,
                        'message' => 'Unsupported request type'
                    );
                    echo json_encode($response);
                    exit;
            }
        } else {
            $response = array(
                'success' => 0,
                'message' => 'Invalid API key'
            );
            echo json_encode($response);
        }
    } else {
        $response = array(
            'success' => 0,
            'message' => 'Missing required parameters'
        );
        echo json_encode($response);
    }
} else {
    $response = array(
        'success' => 0,
        'message' => 'Invalid request method'
    );
    echo json_encode($response);
}

?>
