<?php
$host = 'db-xt32.cv06ouuo8e9n.ap-southeast-1.rds.amazonaws.com'; 
$user = 'userbook'; 
$pass = 'userbook'; 
$db   = 'Book_bers'; 
$port = 3306;


$conn = new mysqli($host, $user, $pass, $db, $port);

if ($conn->connect_error) {
    die('Koneksi gagal: ' . $conn->connect_error);
}
echo 'Koneksi berhasil';

//$conn->close();
?>
