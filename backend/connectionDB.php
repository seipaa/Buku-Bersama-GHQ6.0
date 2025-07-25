<?php
$host = '127.0.0.1'; 
$user = 'root'; 
$pass = 'root'; 
$db   = 'Book_bers'; 
$port = 3306;


$conn = new mysqli($host, $user, $pass, $db, $port);

if ($conn->connect_error) {
    die('Koneksi gagal: ' . $conn->connect_error);
}
echo 'Koneksi berhasil';

//$conn->close();
?>
