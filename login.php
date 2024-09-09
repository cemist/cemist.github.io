<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "leventdeneyim";

$conn = new mysqli($servername,$username,$password,$dbname);

if($conn->connect_error){
    die("bağlantı hatası ->" . $conn->connect_error);
}

$postdata = file_get_contents('php://input');
$data = json_decode($postdata,true);

$user = $data['username'];
$pass = $data['password'];

$sql = "SELECT * FROM users WHERE username='$user' AND password ='$pass'";
$result = $conn -> query($sql);


if($result->num_rows>0){
  $response = array(
    "status" => "succes",
    "message" => "Login Successful"
  );
}else{
    $response = array(
        "status" => "error",
        "message" => "Invalid informations"
    );
}

echo json_encode($response);
$conn -> close();
?>