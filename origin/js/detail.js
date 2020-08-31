
// 想办法得到URL中的querystring部分的id
// 获取里面的指定部分
var getParam = function (key) {
    var querystring = location.search.slice(1);
    var arr = querystring.split("&");
    for (var i = 0; i < arr.length; i++) {
        var subArr = arr[i].split("=");
        if (key === subArr[0]) {
            return subArr[1];
        }
    }
}
var id = getParam("id");

var box = document.getElementById("box");

QF.get("/php/getGoodsInfoById.php", { id }, ({ error, data }) => {
    box.innerHTML = `
    <div class="col-6 top">
        <div class="card" >
            <div id="small" class="small">
                <img src="${data.goods_big_logo}" class="card-img-top" alt="...">
                 <div id="mask" class="mask"></div>
            </div>
            <div id="big" class="big"></div>     
        </div>
    </div>
    <div class="col-6 bottom">
        <p class="card-text">${data.goods_name}</p>
        <div class="price">
            <h3>￥${data.goods_price}</h3> <span class="price-max">￥${data.goods_price * 2}</span> <span>5折</span> <span class = "bg" ></span>
        </div>
        <p  class="kucun">库存： ${data.goods_number}</p>
        <div class="peisong">
        <label>配送<label/><input text="text" value="请选择地址">
        </div>
        <p class = "yunfei"> <span>运费</span> 新会员专享满38元免邮（限唯品自营商品，部分商品不可用）</p>
        <div class="color">
        <span>白色</span> <span>黑色</span> <span>蓝色</span> 
        </div>
        <div class="size">
        <span>XS</span> <span>S</span> <span>M</span> <span>L</span> 
        <span>XL</span>
        </div>
        <button type="button" class="btns btn">加入购物车</button>
    </div>
    ${data.goods_introduce}
    `
})