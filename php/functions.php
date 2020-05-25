<?php 

//去除PHP错误Notice 
error_reporting(0); 

/**
 * 封装大家公用的函数
 */

session_start();

/**
 * 获取当前登录用户信息，如果没有获取到则自动跳转到登录页面
 */

function xiu_get_current_user(){
	if (empty($_SESSION['current_login_users'])) {
		header('Location:/login.php');
		exit();
	}
	return $_SESSION['current_login_users'];
}

/**
 * 通过一个数据库查询获取多条数据
 * => 索引数组套关联数组
 */

function xiu_fetch_all ($sql) {
  $conn = mysqli_connect("localhost","root","","gucuo");
	if (!$conn) {
		exit('连接失败');
	}
	$query = mysqli_query($conn,$sql);
	if (!$query) {
		exit('查询失败');
	}

	while ($row = mysqli_fetch_assoc($query)) {
		$result[] = $row;
	}

	//可以不释放还有关闭 ，因为会自动
	mysqli_free_result($query);
	mysqli_close($conn);
	return $result;
}

/**
 * 获取单条数据
 * => 关联数组
 */
function xiu_fetch_one ($sql) {
	$res = xiu_fetch_all($sql);
	return isset($res[0]) ? $res[0] : null;
}

/**
 * 执行一个增 删 该语句
 */
function xiu_execute ($sql) {
  $conn = mysqli_connect("localhost","root","","gucuo");
	if (!$conn) {
		exit('连接失败');
	}
	$query = mysqli_query($conn,$sql);
	if (!$query) {
		exit('查询失败');
	}

	//对于增删改类的 都是获取受影响行数
	$affected_rows = mysqli_affected_rows($conn);

	//可以不释放还有关闭 ，因为会自动
	// mysqli_free_result($query);
	// mysqli_close($conn);
	return $affected_rows;
}

/**
 * 输出分页链接
 * @param  integer $page    当前页码
 * @param  integer $total   总页数
 * @param  string  $format  链接模板，%d 会被替换为具体页数
 * @param  integer $visible 可见页码数量（可选参数，默认为 5）
 * @example
 *   <?php xiu_pagination(2, 10, '/list.php?page=%d', 5); ?>
 */
function xiu_pagination ($page, $total, $format, $visible = 5) {
  // 计算起始页码
  // 当前页左侧应有几个页码数，如果一共是 5 个，则左边是 2 个，右边是两个
  $left = floor($visible / 2);
  // 开始页码
  $begin = $page - $left;
  // 确保开始不能小于 1
  $begin = $begin < 1 ? 1 : $begin;
  // 结束页码
  $end = $begin + $visible - 1;
  // 确保结束不能大于最大值 $total
  $end = $end > $total ? $total : $end;
  // 如果 $end 变了，$begin 也要跟着一起变
  $begin = $end - $visible + 1;
  // 确保开始不能小于 1
  $begin = $begin < 1 ? 1 : $begin;

  // 上一页
  if ($page - 1 > 0) {
    printf('<li><a href="%s">&laquo;</a></li>', sprintf($format, $page - 1));
  }

  // 省略号
  if ($begin > 1) {
    print('<li class="disabled"><span>···</span></li>');
  }

  // 数字页码
  for ($i = $begin; $i <= $end; $i++) {
    // 经过以上的计算 $i 的类型可能是 float 类型，所以此处用 == 比较合适
    $activeClass = $i == $page ? ' class="active"' : '';
    printf('<li%s><a href="%s">%d</a></li>', $activeClass, sprintf($format, $i), $i);
  }

  // 省略号
  if ($end < $total) {
    print('<li class="disabled"><span>···</span></li>');
  }

  // 下一页
  if ($page + 1 <= $total) {
    printf('<li><a href="%s">&raquo;</a></li>', sprintf($format, $page + 1));
  }
}