function getData() {
    var data;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/php/users.php", false);
    xhr.onload = function () {
        data = JSON.parse(this.responseText); //拿数据
    }
    xhr.send();
    return data;
}
var users = getData();