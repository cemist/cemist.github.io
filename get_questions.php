<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "leventdeneyim";


$conn = new mysqli($servername, $username, $password, $dbname);

if($conn -> connect_error){
    die("Bağlantı hatası: " . $conn -> connect_error);
}


$exam_name = $_GET['name']; 
$question_number = $_GET['number'];
$sql = "SELECT questionpath FROM $exam_name WHERE  questionnumber= ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die('Sorgu hazırlanamıyor: ' . $conn->error);
}

$stmt->bind_param('i',$question_number);
$stmt->execute();
$stmt->bind_result($image_path);
$stmt->fetch();

header('Content-Type: application/json');


echo json_encode(['image_path' => $image_path]);


$stmt->close();
$conn->close();

?>