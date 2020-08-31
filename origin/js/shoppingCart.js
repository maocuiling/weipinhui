// 再从本地存储中把数据拿出来
var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
console.log(shoppingCart);
// 根据数组渲染购物车
var table = document.querySelector("table");
var sum = document.getElementById("sum");

function render() {

    var isAllCheck = shoppingCart.every(value => {
        return value.isChecked;
    });
    console.log(isAllCheck)
    var str = ` <thead>
                <tr>
                    <th><input class="allCheck" type="checkbox" ${isAllCheck ? "checked" : ""} >全选</th>
                    <th scope="col">商品ID</th>
                    <th scope="col">商品名称</th>
                    <th scope="col">商品价格</th>
                    <th scope="col">数量</th>
                    <th scope="col">操作</th>
                    <th scope="col">删除</th>
                </tr>
            </thead>
            <tbody >`;

    shoppingCart.forEach(value => {
        str += `
                <tr>
                    <th scope="row"><input data-id="${value.goods_id}" class="singleCheck" ${value.isChecked ? "checked" : ""} type="checkbox"/></th>
                    <th scope="row">${value.goods_id}</th>
                    <td title="${value.goods_name}"><span style="display: inline-block;width: 300px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${value.goods_name}</span></td>
                    <td>${value.goods_price}</td>
                    <td>${value.count}</td>
                    <td><button type="button" class="btn increase" data-id="${value.goods_id}">+</button ><button type="button" data-id="${value.goods_id}" class="btn decrease">-</button></td>
                    <td class="d-flex justify-content-md-center"><button type="button" class="close" aria-label="关闭">
                        <span class="del" aria-hidden="true" data-id="${value.goods_id}" >&times;</span>
                      </button></td>
                </tr>
            `;
    })

    str += `</tbody>`;


    if (!shoppingCart.length) {
        str = "<h1><a href='./list.html'>您的购物车空空如也，请去挑选一些商品吧！！！</a></h1>"
    }


    table.innerHTML = str;
}

// 计算总价的函数 
function checkin() {
    // 根据数组中所有的拥有isChekced属性的对象的价格和数量相乘再累计
    var sumPrice = 0;
    shoppingCart.forEach(value => {
        if (value.isChecked) {
            sumPrice += value.goods_price * value.count;
        }
    });
    sum.innerHTML = "￥" + sumPrice;
    if (!shoppingCart.length) {
        sum.parentNode.style.display = "none";
    }
}

// 将本地存储的数据更新
function update() {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}
render();
checkin();

// 使用委托模式添加事件
table.onclick = function (e) {
    // 判定是否是全选
    if (e.target.className === "allCheck") {
        // 全选
        shoppingCart.forEach(value => {
            value.isChecked = e.target.checked;
        });
        render();
        checkin();

        return;
    }
    // 判定是否是单选
    if (e.target.className === "singleCheck") {
        // 确定是哪一件商品
        // 从input身上获取商品id
        var id = e.target.getAttribute("data-id");
        // console.log(id);
        // 根据id从数组中找到对应的商品信息
        var goodsInfo = shoppingCart.find(value => {
            return value.goods_id === id;
        });
        console.log(goodsInfo)
        // 将当前的input状态与goodsInfo的isChecked设置为一个值(要么都是真 要么都是假)
        goodsInfo.isChecked = e.target.checked;
        render();
        checkin();
        update();
        return;
    }

    if (e.target.className.includes("increase")) {
        // 获取id
        var id = e.target.getAttribute("data-id");
        // 根据id找到对应的数据
        var goodsInfo = shoppingCart.find(value => {
            return value.goods_id === id;
        });
        // 增加数据的count属性值
        goodsInfo.count++;
        render();
        checkin();
        update();
        return;
    }
    if (e.target.className.includes("decrease")) {
        // 获取id
        var id = e.target.getAttribute("data-id");
        // 根据id找到对应的数据
        var goodsInfo = shoppingCart.find(value => {
            return value.goods_id === id;
        });
        // 增加数据的count属性值
        goodsInfo.count--;
        if (goodsInfo.count <= 0) {
            goodsInfo.count = 0;
        }
        render();
        checkin();
        update();
        return;
    }

    if (e.target.className === "del") {
        // 获取id
        var id = e.target.getAttribute("data-id");
        // 根据id找到对应的数据的索引
        var goodsInfoIdx = shoppingCart.findIndex(value => {
            return value.goods_id === id;
        });
        // 删除数组中的数据 
        shoppingCart.splice(goodsInfoIdx, 1);
        render();
        checkin();
        update();
        return;
    }

}
