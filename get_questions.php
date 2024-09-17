<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "leventdeneyim";


$conn = new mysqli($servername, $username, $password, $dbname);

if($conn -> connect_error){
    die("Bağlantı hatası: " . $conn -> connect_error);
}


$image_name = $_GET['name']; 

$sql = "SELECT q_path FROM questions WHERE q_name = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die('Sorgu hazırlanamıyor: ' . $conn->error);
}

$stmt->bind_param('s', $image_name);
$stmt->execute();
$stmt->bind_result($imagePath);
$stmt->fetch();

header('Content-Type: application/json');


echo json_encode(['image_path' => $imagePath]);


$stmt->close();
$conn->close();

?>