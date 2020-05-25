<?php

// 接收要删除的数据 ID
if (empty($_GET['id'])) {
  exit('<h1>必须传入指定参数</h1>');
}

$id = $_GET['id']; // => 1,2,3

// 1. 建立连接
$conn = mysqli_connect("localhost","root","","gucuo");

if (!$conn) {
  exit('<h1>连接数据库失败</h1>');
}

// 2. 开始查询
$query = mysqli_query($conn, 'delete from users where id in (' . $id . ');');

if (!$query) {
  exit('<h1>查询数据失败</h1>');
}

$affected_rows = mysqli_affected_rows($conn);

if ($affected_rows <= 0) {
  exit('<h1>删除失败</h1>');
}

//重置顺序
$query1 = mysqli_query($conn, 'ALTER TABLE users DROP id;');
$query2 = mysqli_query($conn, 'ALTER TABLE users ADD id mediumint( 8 ) NOT NULL FIRST;');
$query3 = mysqli_query($conn, 'ALTER TABLE users MODIFY COLUMN id MEDIUMINT( 8 ) NOT NULL AUTO_INCREMENT,ADD PRIMARY KEY(id);');

header('Location: /manage.php');
