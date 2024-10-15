<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "leventdeneyim";


$conn = new mysqli($servername, $username, $password, $dbname);

if($conn -> connect_error){
    die("Bağlantı hatası: " . $conn -> connect_error);
}

$exam_name= $_POST['username'];
$question_number= $_POST['questionnumber'];
$answer = $_POST['answer'];

$sql = "INSERT INTO answes (username, questionpath, answer) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('sis', $exam_name, $question_number, $answer);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Cevap kaydedilemedi.']);
}

$stmt->close();
$conn->close();

?>