// 前端操作cookie
// 浏览器没有给我们提供操作cookie的api 只能自己封装方法
function getCookie(key) {
    var cookieStr = document.cookie;
    var arr = cookieStr.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var subArr = arr[i].split("=");
        if (subArr[0] === key) {
            return subArr[1];
        }
    }
}
var isLogin = getCookie("islogin");
if (!isLogin) {
    location.href = "./login.html#" + location.href;
}
function setCookie(key, value) {
    document.cookie = key + "=" + value;
}
function clearCookie(key) {
    document.cookie = key + "=" + "aaa;max-age=-1";
}