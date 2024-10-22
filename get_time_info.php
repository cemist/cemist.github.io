<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "leventdeneyim";

// Veritabanı bağlantısını yap
$conn = new mysqli($servername, $username, $password, $dbname);

if($conn -> connect_error){
    die("Bağlantı hatası: " . $conn -> connect_error);
}

$exam_name = $_GET['name']; 
$sql = "SELECT start_time, finish_time FROM exams WHERE examName=?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die('Sorgu hazırlanamıyor: ' . $conn->error);
}

$stmt->bind_param('s', $exam_name);
$stmt->execute();
$stmt->bind_result($start_time, $finish_time);
$stmt->fetch();


$start_time_iso = $start_time; 
$finish_time_iso = $finish_time;

header('Content-Type: application/json');
echo json_encode(['start_time' => $start_time_iso, 'finish_time' => $finish_time_iso]);

$stmt->close();
$conn->close();

?>