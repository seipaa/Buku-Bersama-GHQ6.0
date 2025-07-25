<?php
$host = 'db-xt32.cv06ouuo8e9n.ap-southeast-1.rds.amazonaws.com'; // Ganti dengan host Cloudflare Tunnel jika berbeda
$user = 'userbook'; // Ganti dengan username database Anda
$pass = 'userbook'; // Ganti dengan password database Anda
$db   = 'Book_bers'; // Ganti dengan nama database Anda
$port = 3306;


$conn = new mysqli($host, $user, $pass, $db, $port);

if ($conn->connect_error) {
    die('Koneksi gagal: ' . $conn->connect_error);
}
echo 'Koneksi berhasil';

$conn->close();
?>
