; (function () {

    var goodsArr = [];

    // 获取元素
    var paginationContainer = document.getElementById("paginationContainer");
    // 发送ajax 请求服务器上的数据  渲染分页结构
    QF.pGet("../php/getGoods.php", {})
        .then((data) => {
            if (!data.error) {
                goodsArr = data.msg;
                var p = new Pagination(paginationContainer, data.msg, 0, 20);
                p.display(function (arr) {
                    console.log(arr)
                    // 如何渲染这12条数据
                    var str = ` <ul  style="width:100%" class="row wrap-column list-group list-group-horizontal-sm">`;
                    // 循环12条li出来
                    arr.forEach(value => {
                        str += `
                        <li class="col col-3 list-group-item " style="padding: 0 10px; border: none; margin-bottom:20px;">
                        <div class="card" >
                            <img src="${value.goods_small_logo}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text"><a target="_blank" href="./detail.html?id=${value.goods_id}" class="text-a">${value.goods_name}</a></p>
                                <p class="d-flex justify-content-between align-items-center card-text"><span class="price">￥${value.goods_price} </span><button type="button" data-id="${value.goods_id}" class="btn">加入购物车</button></p>
                            </div>
                        </div>
                    </li>
                    `;
                    });
                    str += `</ul>`;
                    return str;
                });
            } else {
                throw new Error("请求失败");
            }
        })
        .catch((err) => {
            console.log(err)
        })

    // 使用事件委托给所有的加入购物车按钮添加点击事件
    paginationContainer.onclick = function (e) {
        // 通过e.target判定触发事件的元素是否是加入购物车按钮
        if (e.target.tagName.toLowerCase() === "button") {
            var goodsID = e.target.getAttribute("data-id");
            // 说明点到的是按钮
            console.log("当前点的是按钮，商品id是" + goodsID);
            // 哪个方法可以实现数组查询功能 
            var goodsInfo = goodsArr.find((value) => {
                return value.goods_id === goodsID;
            })
            // 1 先把本地存储中的数组取出来 
            var shoppingCartString = localStorage.getItem("shoppingCart") || "[]";
            // 2 转为数组
            var shoppingCartArr = JSON.parse(shoppingCartString);
            // 先判断数组里是否已经有这个对象 
            var isExists = shoppingCartArr.find(value => value.goods_id === goodsID);
            // 根据判定结果执行不同的业务逻辑
            if (isExists) {
                isExists.count++;
            } else {
                // 3 往数组里加入选中的这个对象
                goodsInfo.count = 1;
                shoppingCartArr.push(goodsInfo);
            }
            // 4 回转成字符串并存到本地存储里
            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartArr));
            // 跳转到购物车页面
            location.href = "./shoppingCart.html";
        }
    }
})();