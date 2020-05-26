function getData() {
    var data;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/data/data2.json", false);
    xhr.onload = function () {
        data = JSON.parse(this.responseText); //拿数据
    }
    xhr.send();
    return data;
}
var datas = getData();