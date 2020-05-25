var map = new BMap.Map("allmap"); // 创建地图实例  
var point = new BMap.Point(119.42842, 26.114367); // 创建点坐标  
map.centerAndZoom(point, 11); // 初始化地图，设置中心点坐标和地图级别
map.enableScrollWheelZoom(); // 滚轮效果

// 比例尺控件
map.addControl(
    new BMap.ScaleControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        offset: new BMap.Size(160, 10)
    })
);
// 缩略图控件
map.addControl(
    new BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        isOpen: true
    })
);

//添加坐标自定义显示控件
map.addEventListener("mousemove", function(e) {
    var jing_du_value = e.point.lng;
    var wei_du_value = e.point.lat;
    var cengji_value = e.target.getZoom();
    //alert(e.point.lng + "," + e.point.lat);
    var a = document.getElementById("t1");
    a.innerHTML = "经度：" + jing_du_value.toFixed(5) + "丨" + "纬度：" + wei_du_value.toFixed(5) + "丨" + "放大层级：" + cengji_value;
});
map.addEventListener("moving", function() {
    const { lng, lat } = map.getCenter();
    var C_jing_du_value = lng;
    var C_wei_du_value = lat;
    //alert(e.point.lng + "," + e.point.lat);
    var c = document.getElementById("t2");
    c.innerHTML = "地图中心经度：" + C_jing_du_value.toFixed(5) + "丨" + "地图中心纬度：" + C_wei_du_value.toFixed(5);
});

function t1() {
    this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
    this.defaultOffset = new BMap.Size(840, 16);
}
t1.prototype = new BMap.Control();
t1.prototype.initialize = function(map) {
    var div = document.createElement("div");
    div.id = "t1"
    div.innerText = "经度：119.590546丨纬度：25.880033丨放大层级：11"
    div.style.width = "350px";
    map.getContainer().appendChild(div);
    return div;
};
var myZoomCtrl = new t1();
map.addControl(myZoomCtrl);
//开源API工具控件
function t2() {
    this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
    this.defaultOffset = new BMap.Size(840, 0);
}
t2.prototype = new BMap.Control();
t2.prototype.initialize = function(map) {
    var div = document.createElement("div");
    div.id = "t2"
    div.style.width = "350px";
    div.innerText = "地图中心经度：119.41347丨地图中心纬度：26.14965"
    map.getContainer().appendChild(div);
    return div;
};
var myZoomCtrl = new t2();
map.addControl(myZoomCtrl);
//开源API工具控件


var xhr = new XMLHttpRequest();
xhr.open("GET", "/php/users.php", true);
xhr.onload = function() {
    var users = JSON.parse(this.responseText); //拿数据
    //多点标注窗体
    var opts = {
        enableAutoPan: true, // 是否开启信息窗口打开时地图自动移动，本应开启，但API v3.0 此功能有问题,后面在打开信息窗口内重写这种效果
    };

    var markers = new Array();
    for (var i in users) {
        var point = new BMap.Point(users[i].xposition, users[i].yposition);
        var marker = new BMap.Marker(point);

        var content = '<div class="div2"><div id="' + users[i].name + '" class="carousel slide" style="width: 200px;height: 130px;">' +
            '<ol class="carousel-indicators" style="height: 0px">' +
            '<li data-target="#' + users[i].name + '" data-slide-to="0" class="active"></li>' +
            '<li data-target="#' + users[i].name + '" data-slide-to="1"></li>' +
            '<li data-target="#' + users[i].name + '" data-slide-to="2"></li></ol><div class="carousel-inner" id="pic"><div class="item active">' +
            '<img src=' + users[i].img1 + ' alt="First slide" style="width: 200px;height: 130px;"><div class="carousel-caption" style="width: 120px;height: 0px;">第一张</div></div><div class="item">' +
            '<img src=' + users[i].img2 + ' alt="Second slide" style="width: 200px;height: 130px;"><div class="carousel-caption" style="width: 120px;height: 0px;">第二张</div></div><div class="item">' +
            '<img src=' + users[i].img3 + ' alt="Third slide" style="width: 200px;height: 130px;"><div class="carousel-caption" style="width: 120px;height: 0px;">第三张</div></div></div>' +
            '<a class="left carousel-control" style="background:transparent;" href="#' + users[i].name + '" role="button" data-slide="prev">' +
            '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>' +
            '<span class="sr-only">Previous</span></a>' +
            '<a class="right carousel-control" style="background:transparent;" href="#' + users[i].name + '" role="button" data-slide="next">' +
            '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>' +
            '<span class="sr-only">Next</span>' +
            '</a><div style="background-color: aliceblue;margin-top: 15px;border-radius: 10px;">' +
            '<div class="p1"><a >' + users[i].name + '</a></div><div class="p2">' +
            '<span class="p">地址：' + users[i].address + '</span><br>' +
            '<span class="p">类别：' + users[i].type + '</span><br>' +
            '<span class="p">保护等级：' + users[i].grade + '</span><br>' +
            '<span class="p">所在地：' + users[i].located + '</span><br>' +
            '<span class="p">建造年代：' + users[i].buildtime + '</span><br>' +
            '<a id="button2" type="button" class="btn btn-primary" onclick= swal("' + users[i].name + '","' + users[i].xiangxi + '")>详情</a>'
        '</div></div></div></div>'

        addClickHandler(content, marker);
        markers.push(marker);
        /* marker.setAnimation(BMAP_ANIMATION_BOUNCE); */
        marker.disableMassClear();
        label = new BMap.Label(users[i].name, {
            offset: new BMap.Size(-20, 25),
            enableMassClear: false
        }); //创建marker点的标记,这里注意下,因为百度地图可以对label样式做编辑,
        label.setStyle({
            background: "rgb(226, 240, 243)",
        }); //对label 样式隐藏 
        marker.setLabel(label); //把label设置到maker上 	
    }

    markerClusterer = new BMapLib.MarkerClusterer(map, { markers: markers });

    function addClickHandler(content, marker) {
        marker.addEventListener("click", function(e) {
            openInfo(content, e);
        });
    }

    function openInfo(content, e) {
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
        map.openInfoWindow(infoWindow, point); //开启信息窗口
        /* map.centerAndZoom(new BMap.Point(p.getPosition().lng, p.getPosition().lat), getZoom());// 重写 是否开启信息窗口打开时地图自动移动 */
    }
}
xhr.send();