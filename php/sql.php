<?php
//接收客户端的 AJAX 请求 返回数据
//载入封装函数
require_once 'functions.php';

//取得客户端传递过来的分页页码
//intval :转换为数字类型
$page = empty($_GET['page']) ? 1 : intval($_GET['page']);
$length = empty($_GET['length']) ? 1 : intval($_GET['length']);
$offset = ($page - 1) * $length;

// %d :数字  %s :字符串  
$sql = sprintf('select * from users limit %d ,%d;' , $offset , $length);

$comments = xiu_fetch_all($sql);

$total_count = xiu_fetch_one('select  count(1) as num from users')['num'];

$total_Page = ceil($total_count / $length);
//虽然返回的数据类型是float ，但是数字一定是一个整数，结果json转换之后是一个整数

// 因为网络之间传输的只能是字符串
// 所以我们先将数据转换成字符串
$json = json_encode(array('comments' => $comments, 'total_Page' =>$total_Page));
 // $json = json_encode($comments);

//设置响应的响应体类型为json
header('Content-Type:application/json');

//响应给客户端
echo $json;
