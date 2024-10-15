<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "leventdeneyim";


$conn = new mysqli($servername,$username,$password,$dbname);

if($conn->connect_error){
    die("bağlantı hatası ->" . $conn->connect_error);
}

$sql = "SELECT examName,exam_shell,start_time,finish_time FROM exams";

$result = $conn -> query($sql);

$examnames = [];


if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $examnames[] = ['examName' => $row['examName'],'exam_shell' => $row['exam_shell'],'start_time'=>$row['start_time'],'finish_time' => $row['finish_time']];
    }
}

header('Content-Type: application/json');
echo json_encode($examnames);


$conn->close();




?>