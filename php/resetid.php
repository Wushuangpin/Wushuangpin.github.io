<?php


// 1. 建立连接
$conn = mysqli_connect("localhost","root","","gucuo");

if (!$conn) {
  exit('<h1>连接数据库失败</h1>');
}

// 2. 开始查询
$query1 = mysqli_query($conn, 'ALTER TABLE users DROP id;');
$query2 = mysqli_query($conn, 'ALTER TABLE users ADD id mediumint( 8 ) NOT NULL FIRST;');
$query3 = mysqli_query($conn, 'ALTER TABLE users MODIFY COLUMN id MEDIUMINT( 8 ) NOT NULL AUTO_INCREMENT,ADD PRIMARY KEY(id);');

header('Location: /manage.php');
