var map = new BMap.Map("allmap", { enableMapClick: false }); // 创建地图实例  
var point = new BMap.Point(119.42842, 26.114367); // 创建点坐标  
map.centerAndZoom(point, 11); // 初始化地图，设置中心点坐标和地图级别
map.enableScrollWheelZoom(); // 滚轮效果
map.setMapStyleV2({ styleJson: styleJson });

//指北针
function north() {
    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
    this.defaultOffset = new BMap.Size(20, 20);
}
north.prototype = new BMap.Control();
north.prototype.initialize = function (map) {
    var div = document.createElement("a");
    div.href = "javascript:void(0)"
    div.style.width = "60px";
    div.style.height = "60px";
    div.style.backgroundImage = "url(/images/north.png)"
    div.style.backgroundRepeat = "no-repeat"
    div.style.backgroundSize = "100% 100%"
    map.getContainer().appendChild(div);
    return div;
};
var myZoomCtrl = new north();
map.addControl(myZoomCtrl);
//添加坐标自定义显示控件
map.addEventListener("mousemove", function (e) {
    var jing_du_value = e.point.lng;
    var wei_du_value = e.point.lat;
    var cengji_value = e.target.getZoom();
    //alert(e.point.lng + "," + e.point.lat);
    var a = document.getElementById("a");
    a.innerHTML = "经度：" + jing_du_value.toFixed(6) + "丨" + "纬度：" + wei_du_value.toFixed(6) + "丨" + "放大层级：" + cengji_value;
});
map.addEventListener("moving", function (e) {
    const { lng, lat } = map.getCenter();
    var C_jing_du_value = lng;
    var C_wei_du_value = lat;
    //alert(e.point.lng + "," + e.point.lat);
    var c = document.getElementById("c");
    c.innerHTML = "地图中心经度：" + C_jing_du_value.toFixed(6) + "丨" + "地图中心纬度：" + C_wei_du_value.toFixed(6);
});

function a() {
    this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
    this.defaultOffset = new BMap.Size(840, 16);
}
a.prototype = new BMap.Control();
a.prototype.initialize = function (map) {
    var div = document.createElement("div");
    div.id = "a"
    div.innerText = "经度：119.590546丨纬度：25.880033丨放大层级：11"
    div.style.width = "350px";
    map.getContainer().appendChild(div);
    return div;
};
var myZoomCtrl = new a();
map.addControl(myZoomCtrl);
//开源API工具控件
function c() {
    this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
    this.defaultOffset = new BMap.Size(840, 0);
}
c.prototype = new BMap.Control();
c.prototype.initialize = function (map) {
    var div = document.createElement("div");
    div.id = "c"
    div.style.width = "350px";
    div.innerText = "地图中心经度：119.41347丨地图中心纬度：26.14965"
    map.getContainer().appendChild(div);
    return div;
};
var myZoomCtrl = new c();
map.addControl(myZoomCtrl);
//开源API工具控件

function x5() {
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
    this.defaultOffset = new BMap.Size(15, 10);
}
x5.prototype = new BMap.Control();
x5.prototype.initialize = function (map) {
    var div = document.createElement("div");
    div.id = "x1"
    map.getContainer().appendChild(div);
    return div;
};
var myZoomCtrl = new x5();
map.addControl(myZoomCtrl);
//开源API工具控件

function picture() {
    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
    this.defaultOffset = new BMap.Size(10, 90);
}
picture.prototype = new BMap.Control();
picture.prototype.initialize = function (map) {
    var e3 = document.createElement("a");
    e3.href = ""
    e3.download = "downImg"
    e3.id = "btn"
    e3.className = "btn btn-info"
    e3.innerHTML = "专题图制作";
    e3.onclick = function () {
        $("#btn").hide();
        var imgName = "福州市古厝专题图.jpg";
        var canvas2 = document.createElement("canvas");
        let _canvas = document.getElementById("allmap");
        var w = parseInt(window.getComputedStyle(_canvas).width);
        var h = parseInt(window.getComputedStyle(_canvas).height);
        //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
        canvas2.width = w * 2;
        canvas2.height = h * 2;
        canvas2.style.width = w + "px";
        canvas2.style.height = h + "px";
        var context = canvas2.getContext("2d");
        context.scale(2, 2);
        html2canvas(document.getElementById("allmap"), { canvas: canvas2 }).then(function (canvas) {
            //document.body.appendChild(canvas);
            //canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
            var dataUrl = canvas.toDataURL('image/jpeg', 1.0);
            /* document.getElementById("btn").setAttribute("href", canvas.toDataURL()); */
            dataURIToBlob(imgName, dataUrl, callback);
        });
        var dataURIToBlob = function (imgName, dataURI, callback) {
            var binStr = atob(dataURI.split(',')[1]),
                len = binStr.length,
                arr = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i);
            }
            callback(imgName, new Blob([arr]));
        }
        var callback = function (imgName, blob) {
            var triggerDownload = $("<a>").attr("href", URL.createObjectURL(blob)).attr("download", imgName).appendTo("body").on("click", function () {
                if (navigator.msSaveBlob) {
                    return navigator.msSaveBlob(blob, imgName);
                }
            });
            triggerDownload[0].click();
            triggerDownload.remove();
        };
        $("#btn").show();
    };
    map.getContainer().appendChild(e3);
    //返回DOM
    return e3;
};
var myZoomCtrl = new picture();
map.addControl(myZoomCtrl);
//开源API工具控件