<?php

require_once 'functions.php';
// 接收要修改的数据 ID
if (empty($_GET['id'])) {
  exit('<h1>必须传入指定参数</h1>');
}

$id = $_GET['id'];

// 1. 建立连接
$conn = mysqli_connect("localhost", "root", "", "gucuo");

if (!$conn) {
  exit('<h1>连接数据库失败</h1>');
}

// 2. 开始查询
// 因为 ID 是唯一的 那么找到第一个满足条件的就不用再继续了 limit 1
$query = mysqli_query($conn, "select * from users where id = {$id} limit 1;");

if (!$query) {
  exit('<h1>查询数据失败</h1>');
}

$user = mysqli_fetch_assoc($query);

if (!$user) {
  exit('<h1>找不到你要编辑的数据</h1>');
}
function edit()
{
  global $user;
  global $id;
  // 取值
  $img1 = $user['img1'];
  $img2 = $user['img2'];
  $img3 = $user['img3'];
  $name = $_POST['name'];
  $xposition = $_POST['xposition'];
  $yposition = $_POST['yposition'];
  $type = $_POST['type'];
  $located = $_POST['located'];
  $grade = $_POST['grade'];
  $buildtime = $_POST['buildtime'];
  $address = $_POST['address'];
  $xiangxi = $_POST['xiangxi'];
  $xianzhuang = $_POST['xianzhuang'];

  // 有上传就修改
  if (isset($_FILES['img1']) && $_FILES['img1']['error'] === UPLOAD_ERR_OK) {
    // 用户上传了新头像 -> 用户希望修改头像
    $ext1 = pathinfo($_FILES['img1']['name'], PATHINFO_EXTENSION);
    $target1 = '../images/' . $name . '1' . '.' . $ext1;
    if (!move_uploaded_file($_FILES['img1']['tmp_name'], $target1)) {
      $GLOBALS['error_message'] = '上传头像失败';
      return;
    }
    $img1 = substr($target1, 2);
  }
  if (isset($_FILES['img2']) && $_FILES['img2']['error'] === UPLOAD_ERR_OK) {
    // 用户上传了新头像 -> 用户希望修改头像
    $ext2 = pathinfo($_FILES['img2']['name'], PATHINFO_EXTENSION);
    $target2 = '../images/' . $name . '2' . '.' . $ext2;
    if (!move_uploaded_file($_FILES['img2']['tmp_name'], $target2)) {
      $GLOBALS['error_message'] = '上传头像失败';
      return;
    }
    $img2 = substr($target2, 2);
  }

  if (isset($_FILES['img3']) && $_FILES['img3']['error'] === UPLOAD_ERR_OK) {
    // 用户上传了新头像 -> 用户希望修改头像
    $ext3 = pathinfo($_FILES['img3']['name'], PATHINFO_EXTENSION);
    $target3 = '../images/' . $name . '3' . '.' . $ext3;
    if (!move_uploaded_file($_FILES['img3']['tmp_name'], $target3)) {
      $GLOBALS['error_message'] = '上传头像失败';
      return;
    }
    $img3 = substr($target3, 2);
  }

  $sql = "UPDATE `users` SET `name` = '${name}', `xposition` = '${xposition}', `yposition` = '${yposition}', `type` = '${type}', `located` = '${located}', `grade` = '${grade}', `address` = '${address}', `xiangxi` = '${xiangxi}', `xianzhuang` = '${xianzhuang}', `buildtime` = '${buildtime}', `img1` = '${img1}', `img2` = '${img2}', `img3` = '${img3}' WHERE `users`.`id` = '${id}'";
  $res = xiu_execute($sql);
  if ($res < 0) {
    exit('编辑失败');
    return;
  }

  header('Location: /manage.php');
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  edit();
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>福州市古厝信息展示与交流平台</title>
  <link rel="icon" type="image/x-icon" href="../images/title.ico" />
  <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
  <link href="/css/third.css" rel="stylesheet" type="text/css">
  <script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
  <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>

<body>
  <iframe src="/navbar.html" style="display:block;height: 19.2vh" width="100%" frameborder="0"></iframe>
  <div style="text-align:left;"><span style="font-size:25px;margin-left:20px;">编辑“<?php echo $user['name']; ?>”信息</span></div>
  <hr style="margin-top: 5px;margin-bottom: 5px;">
  <main style="margin-left:10%;margin-right:10%;">
    <form action="<?php echo $_SERVER['PHP_SELF'] . '?id=' . $id; ?>" method="post" enctype="multipart/form-data" autocomplete="off">
      <div style="width:25%;margin-left: 2%;float: left;">
        <img src="<?php echo $user['img1']; ?>" style="height:60px;width:100px">
      </div>
      <div style="width:25%;margin-left: 2%;float: left;">
        <img src="<?php echo $user['img2']; ?>" style="height:60px;width:100px">
      </div>
      <div style="width:25%;margin-left: 2%;float: left;">
        <img src="<?php echo $user['img3']; ?>" style="height:60px;width:100px">
      </div>
      <div class="form-group" style="width:25%;margin-left: 2%;float: left;">
        <label for="img1">图片1</label>
        <input type="file" class="form-control" id="img1" name="img1" style="height:120%;">
      </div>
      <div class="form-group" style="width:25%;margin-left: 2%;float: left;">
        <label for="img2">图片2</label>
        <input type="file" class="form-control" id="img2" name="img2" style="height:120%;">
      </div>
      <div class="form-group" style="width:25%;margin-left: 2%;float: left;">
        <label for="img3">图片3</label>
        <input type="file" class="form-control" id="img3" name="img3" style="height:120%;">
      </div>
      <div class="form-group" style="width:25%;margin-left: 2%;float: left;">
        <label for="name">名称</label>
        <input type="text" class="form-control" id="name" name="name" value="<?php echo $user['name']; ?>">
      </div>
      <div class="form-group" style="width:25%;margin-left: 2%;float: left;">
        <label for="xposition">经度</label>
        <input type="text" class="form-control" id="xposition" name="xposition" value="<?php echo $user['xposition']; ?>">
      </div>
      <div class="form-group" style="width:25%;margin-left: 2%;float: left;">
        <label for="yposition">纬度</label>
        <input type="text" class="form-control" id="yposition" name="yposition" value="<?php echo $user['yposition']; ?>">
      </div>
      <div class="form-group" style="width:25%;margin-left: 2%;float: left;">
        <label for="type">类型</label>
        <input type="text" class="form-control" id="type" name="type" value="<?php echo $user['type']; ?>">
      </div>
      <div class="form-group" style="width:25%;margin-left: 2%;float: left;">
        <label for="located">所在地</label>
        <input type="text" class="form-control" id="located" name="located" value="<?php echo $user['located']; ?>">
      </div>
      <div class="form-group" style="width:25%;margin-left: 2%;float: left;">
        <label for="grade">保护等级</label>
        <input type="text" class="form-control" id="grade" name="grade" value="<?php echo $user['grade']; ?>">
      </div>
      <div class="form-group" style="width:25%;margin-left: 2%;float: left;">
        <label for="buildtime">建造年代</label>
        <input type="text" class="form-control" id="buildtime" name="buildtime" value="<?php echo $user['buildtime']; ?>">
      </div>
      <div class="form-group" style="width:52%;margin-left: 2%;float: left;">
        <label for="address">地址</label>
        <input type="text" class="form-control" id="address" name="address" value="<?php echo $user['address']; ?>">
      </div>
      <div class="form-group" style="width:35%;margin-left: 2%;float: left;">
        <label for="xiangxi">详细信息</label>
        <textarea type="text" class="form-control" id="xiangxi" name="xiangxi" style="width: 420px; height: 75px;"><?php echo $user['xiangxi']; ?></textarea>
      </div>
      <div class="form-group" style="width:35%;margin-left: 5.5%;float: left;">
        <label for="xianzhuang">现状</label>
        <textarea type="text" class="form-control" id="xianzhuang" name="xianzhuang" style="width: 420px; height: 75px;"><?php echo $user['xianzhuang']; ?></textarea>
      </div>
      <div class="form-group" style="width:35%;margin-left: 2%;float: left;margin-bottom: 0px;">
        <button class="btn btn-primary">保存</button>
      </div>
    </form>
  </main>
</body>

</html>