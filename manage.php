<?php

// //检验数据当前访问用户的 箱子 
session_start();
if (empty($_SESSION['current_login_admin'])) {
  //没有当前登录用户信息，意味着没有登录
  header('Location:login.php');
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>福州市古厝信息展示与交流平台</title>
  <link rel="icon" type="image/x-icon" href="/images/title.ico" />
  <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
  <link href="/css/third.css" rel="stylesheet" type="text/css">
  <script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
  <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <style>
    .img_content {
      display: none;
      position: absolute;
      margin: 5% 0 0 25%;
      background-color: white;
      z-index: 1002;
      overflow: auto;
      height: 500px;
      width: 700px;
      box-shadow: 10px 10px 6px #888888;
      border: 10px solid white;
      border-radius: 15px
    }

    .colse_btn {
      border: solid 1px #3488db;
      color: white;
      margin: 5px 10px 0 0;
      height: 30px;
      line-height: 30px;
      width: 60px;
      background: #3488db;
      border-radius: .5em;
      display: inline-block;
      outline: none;
      cursor: pointer;
      text-align: center;
      float: right;
    }

    html,
    body {
      width: 100%;
      height: 100%
    }
  </style>

</head>

<body>
  <div class="img_content" id="imgContent">
    <div style="margin: 10px 10px 0 10px;"><img src="" width="660px" height="430px" id="imgCon"></div>
    <div class="colse_btn" onclick="col()">关闭</div>
  </div>
  <iframe src="navbar.html" style="display:block;width: 100%;height: 12.5%;" frameborder="0"></iframe>
  <main class="container" style="width: 95%;">
    <div class="form-group" style="margin-bottom: 0px;width:98.5%">
      <div class="row">
        <div class="col-md-8" style="width:45%;margin-right: 10px;">
          <div class="input-group">
            <input id="txt" type="text" class="form-control secbox" placeholder="请输入查询内容" />
            <span class="input-group-btn">
              <a class="btn btn-default sec">搜索</a>
            </span>
          </div>
          <div id="msg" style="background:white;position:absolute;border-radius:5px;padding:5px 10px 5px 10px;border:1px solid gray;display:none"></div>
        </div>
        <div class="col-md-3" style="float:left;width: 20%;">
          <a class="btn btn-danger add" href="/php/add.php">增加信息</a>
          <a class="btn btn-info " href="/php/resetid.php">权限修改</a>
        </div>
        <ul class="pagination pagination pull-right" style="margin-top:0px"></ul>
      </div>
    </div>
    <table class="table table-hover" id="table">
      <thead>
        <tr>
          <th>编号</th>
          <th>图片</th>
          <th>名称</th>
          <th>坐标</th>
          <th>类型</th>
          <th>所在地</th>
          <th>保护等级</th>
          <th>建造年代</th>
          <th>地址</th>
          <th class="text-center" width="140">操作</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </main>
</body>
<script src="/js/jquery.twbsPagination.js"></script>
<script src="/js/jsrender.min.js"></script>
<script id="comments_tmpl" type="text/x-jsrender">
  {{for comments}}
  {{!-- <td>{{:content}}</td> 这是js中模板的注释   --}}
  <tr>
    <td>{{:id}}</td>
    <td><img style="width: 70px;height: 47px;" src="{{:img1}}" onclick="showImg(this.src)"></td>
    <td>{{:name}}</td>
    <td>{{:xposition}},{{:yposition}}</td>
    <td>{{:type}}</td>
    <td>{{:located}}</td>
    <td>{{:grade}}</td>
    <td>{{:buildtime}}</td>
    <td>{{:address}}</td>
    <td class="text-center">
      <a class="btn btn-info btn-sm" href="/php/edit.php?id={{:id}}">编辑</a>
      <a class="btn btn-danger btn-sm" href="/php/delete.php?id={{:id}}">删除</a>
    </td>
  </tr>
  {{/for}}
</script>
<script>
  function col() {
    document.getElementById('imgContent').style.display = 'none';
  }

  function showImg(url) {
    document.getElementById('imgCon').src = url;
    document.getElementById('imgContent').style.display = 'block';
  }
</script>
<script>
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/php/users.php", true);
  xhr.onload = function() {
    if (this.status == 200) {
      var users = JSON.parse(this.responseText);

      function handle() {
        var word = document.getElementById('txt').value;
        var value = "";
        for (var i in users) {
          if (word != "" && users[i].name.match(word + ".*") != null) {
            $("#msg").show()
            value += `<a href="javascript:void(0)" onclick=jump(${users[i].id},"${users[i].name}") >${users[i].name}</a><br/>`
          }
          if (word == "") {
            $("#msg").hide()
          }
        }
        document.getElementById('msg').innerHTML = value;
      }
      jump = function(id, name) {
        $("#msg").hide();
        $(".table tr ").css("background", "white");
        document.getElementById('txt').value = name;
        if (id % 6 == 0) {
          x = id / 6
        } else {
          x = parseInt(id / 6) + 1
        }
        document.getElementById('msg').innerHTML = "";
        if (currentPage == x) {
          $(".table tr:contains(" + name + ")").css("background", "#D9EDF7");
        } else {
          setTimeout(
            function() {
              loadPageData(x, 6);
            }, 1 * 10
          )
          setTimeout(
            function() {
              $(".table tr:contains(" + name + ")").css("background", "#D9EDF7");
            }, 0.5 * 1000
          )
        }

      }
      //firefox下检测状态改变只能用oninput,且需要用addEventListener来注册事件。   
      if (/msie/i.test(navigator.userAgent)) //ie浏览器   
      {
        document.getElementById('txt').onpropertychange = handle
      } else { //非ie浏览器，比如Firefox  
        document.getElementById('txt').addEventListener("input", handle, false);
      }
    }
  }
  xhr.send();
  //搜索,只限当前页查询，跨页查询待完善
  $(".sec").click(function() { //搜索框的点击事件  
    $("#msg").hide()
    $(".table tr ").css("background", "white");
    var data = $(".secbox").val()
    if (data == 0) { //判断搜索框是否为空，是则弹窗"请输入一点东西"
      alert("请输入一点东西")
    } else { //否则搜索内容为搜索框（.secbox）里的内容（val）的项将他的背景颜色改成淡蓝色
      $(".table tr:contains(" + data + ")").css("background", "#D9EDF7");
    }
  })

  var currentPage = 1 //默认对于1
  function loadPageData(page, length) {
    $.getJSON('php/sql.php', {
      page: page,
      length: length
    }, function(res) {
      console.dir(res)
      if (page > res.total_Page) {
        loadPageData(res.total_Page, length)
        return
      }
      $('.pagination').twbsPagination('destroy')
      $('.pagination').twbsPagination({
        startPage: page,
        totalPages: res.total_Page,
        first: '&laquo',
        last: '&raquo',
        prev: '上一页',
        next: '下一页',
        visiablePages: 6,
        initiateStartPageClick: false,
        onPageClick: function(e, page) {
          loadPageData(page, length)
        }
      })

      var html = $("#comments_tmpl").render({
        comments: res.comments
      })
      $('tbody').fadeOut(function() {
        $(this).html(html)
      }).fadeIn()
      currentPage = page
    })
  }
  loadPageData(1, 6)
</script>

</html>