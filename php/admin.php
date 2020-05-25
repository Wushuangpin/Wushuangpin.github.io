<?php

function add_user()
{
  // 验证非空
  if (empty($_POST['name'])) {
    $GLOBALS['error_message'] = '请输入名称';
    return;
  }


  if (empty($_POST['xposition'])) {
    $GLOBALS['error_message'] = '请输入横坐标';
    return;
  }

  if (empty($_POST['yposition'])) {
    $GLOBALS['error_message'] = '请输入纵坐标';
    return;
  }


  // 取值
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
  // 接收文件并验证img1
  /*   if (empty($_FILES['img1'])) {
    $GLOBALS['error_message'] = '请上传图片';
    return;
  } */

  $ext1 = pathinfo($_FILES['img1']['name'], PATHINFO_EXTENSION);
  // => jpg
  $target1 = '../images/' . $name . '1' . '.' . $ext1;

  //用户有上传才添加
  /* if (!move_uploaded_file($_FILES['img1']['tmp_name'], $target1)) {
    $GLOBALS['error_message'] = '上传头像失败';
    return;
  } */

  $img1 = substr($target1, 2);

  // 接收文件并验证img2
  /*  if (empty($_FILES['img2'])) {
    $GLOBALS['error_message'] = '请上传图片';
    return;
  } */

  $ext2 = pathinfo($_FILES['img2']['name'], PATHINFO_EXTENSION);
  // => jpg
  $target2 = '../images/' . $name . '2' . '.' . $ext2;

  //用户有上传才添加
  /* if (!move_uploaded_file($_FILES['img2']['tmp_name'], $target2)) {
    $GLOBALS['error_message'] = '上传头像失败';
    return;
  } */
  $img2 = substr($target2, 2);

  // 接收文件并验证img3
  /* if (empty($_FILES['img3'])) {
    $GLOBALS['error_message'] = '请上传图片';
    return;
  } */

  $ext3 = pathinfo($_FILES['img3']['name'], PATHINFO_EXTENSION);
  // => jpg
  $target3 = '../images/' . $name . '3' . '.' . $ext3;

  //用户有上传才添加
  /* if (!move_uploaded_file($_FILES['img3']['tmp_name'], $target3)) {
    $GLOBALS['error_message'] = '上传头像失败';
    return;
  } */

  $img3 = substr($target3, 2);

  // 1. 建立连接
  $conn = mysqli_connect("localhost", "root", "", "gucuo");

  if (!$conn) {
    $GLOBALS['error_message'] = '连接数据库失败';
    return;
  }

  // 2. 开始查询
  $query = mysqli_query($conn, "INSERT INTO `users` (`id`, `name`, `xposition`, `yposition`, `type`, `located`, `grade`, `address`, `xiangxi`, `xianzhuang`, `buildtime`, `img1`, `img2`, `img3`, `img4`, `img5`) VALUES (NULL, '${name}', '${xposition}', '${yposition}', '${type}', '${located}', '${grade}', '${address}', '${xiangxi}', '${xianzhuang}', '${buildtime}', '${img1}', '${img2}', '${img3}', '', '')");

  if (!$query) {
    $GLOBALS['error_message'] = '查询过程失败';
    return;
  }

  $affected_rows = mysqli_affected_rows($conn);

  if ($affected_rows !== 1) {
    $GLOBALS['error_message'] = '添加数据失败';
    return;
  }
  
  //重置顺序
  $query1 = mysqli_query($conn, 'ALTER TABLE users DROP id;');
  $query2 = mysqli_query($conn, 'ALTER TABLE users ADD id mediumint( 8 ) NOT NULL FIRST;');
  $query3 = mysqli_query($conn, 'ALTER TABLE users MODIFY COLUMN id MEDIUMINT( 8 ) NOT NULL AUTO_INCREMENT,ADD PRIMARY KEY(id);');
  
  // 响应
  header('Location: /manage.php');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  add_user();
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
  <link href="third.css" rel="stylesheet" type="text/css">
  <script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
  <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>

<body>

  <iframe src="/navbar.html" style="display:block;height: 19.2vh" width="100%" frameborder="0"></iframe>
  <div style="text-align:left;"><span style="font-size:25px;margin-left:20px;">添加信息</span></div>
  <hr style="margin-top: 5px;margin-bottom: 5px;">
  <main style="margin-left:10%;margin-right:10%;">
    <?php if (isset($error_message)) : ?>
      <div class="alert alert-warning">
        <?php echo $error_message; ?>
      </div>
    <?php endif ?>
    <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" enctype="multipart/form-data" autocomplete="off">
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
        <input type="text" class="form-control" id="name" name="name">
      </div>
      <div class="form-group" style="width:25%;margin-left: 2%;float: left;">
        <label for="xposition">经度</label>
        <input type="text" class="form-control" id="xposition" name="xposition">
      </div>
      <div class="form-group" style="width:25%;margin-left: 2%;float: left;">
        <label for="yposition">纬度</label>
        <input type="text" class="form-control" id="yposition" name="yposition">
      </div>
      <div class="form-group" style="width:25%;margin-left: 2%;float: left;">
        <label for="type">类型</label>
        <input type="text" class="form-control" id="type" name="type">
      </div>
      <div class="form-group" style="width:25%;margin-left: 2%;float: left;">
        <label for="located">所在地</label>
        <input type="text" class="form-control" id="located" name="located">
      </div>
      <div class="form-group" style="width:25%;margin-left: 2%;float: left;">
        <label for="grade">保护等级</label>
        <input type="text" class="form-control" id="grade" name="grade">
      </div>
      <div class="form-group" style="width:25%;margin-left: 2%;float: left;">
        <label for="buildtime">建造年代</label>
        <input type="text" class="form-control" id="buildtime" name="buildtime">
      </div>
      <div class="form-group" style="width:52%;margin-left: 2%;float: left;">
        <label for="address">地址</label>
        <input type="text" class="form-control" id="address" name="address">
      </div>
      <div class="form-group" style="width:35%;margin-left: 2%;float: left;">
        <label for="xiangxi">详细信息</label>
        <textarea type="text" class="form-control" id="xiangxi" name="xiangxi" style="width: 420px; height: 75px;"></textarea>
      </div>
      <div class="form-group" style="width:35%;margin-left: 5.5%;float: left;">
        <label for="xianzhuang">现状</label>
        <textarea type="text" class="form-control" id="xianzhuang" name="xianzhuang" style="width: 420px; height: 75px;"></textarea>
      </div>
      <div class="form-group" style="width:35%;margin-left: 2%;float: left;margin-bottom: 0px;">
        <button class="btn btn-primary">保存</button>
      </div>
    </form>
  </main>
</body>

</html>