; (function () {
    //实现用户名验证功能
    //获取元素
    var $username = $("#username");
    var $password = $("#password");
    var $submitBtn = $("#submitBtn");
    var $usernameTips = $("#usernameTips")
    var $passwordTips = $("#passwordTips")
    //定义两把锁 一把决定用户名是否验证通过 一把决定密码是否验证通过
    var $user_lock = false;
    var $pass_lock = false;
    //输入框失去焦点的时候 发送请求
    $username.on("blur", function () {
        //获取用户输入的文本
        var $val = $username.val();
        console.log($val);
        //定义正则表达式
        var $reg = /^[^\d]\w{6,10}$/;
        //验证是否符合正则的规则
        if (!$reg.test($val)) {
            $usernameTips.text("请输入7~11位的英文字符，不能以数字开头");
            $user_lock = false;
            return;
        }
        $usernameTips.text("√用户名通过验证");

        //发送请求
        $.ajax({
            url: "../php/checkusername.php",
            type: "get",
            data: {
                username: $val
            },
            dataType: "json"
        })
            .then(function (data) {
                console.log(data)
                if (!data.error) {
                    console.log(data)
                    $user_lock = true;
                } else {
                    console.log(data)
                    alert(data.msg);
                    throw new Error(data.msg);
                }
            })
            .catch(function (err) {
                console.log(err);
                $user_lock = false;
            })
    });

    $password.on("blur", function () {
        var $val = $password.val();
        console.log($val)
        var $reg = /^[^\d]\w{6,10}$/;
        if (!$reg.test($val)) {
            $passwordTips.text("请输入7~11位的英文字符，不能以数字开头");
            $pass_lock = false;
            return;
        }
        $passwordTips.text("√密码通过验证");
        $pass_lock = true;
    });

    $submitBtn.on("click", function () {
        // 思路： 我们不可以直接发送请求 而是要先看用户名和密码是否都通过了验证 都通过才发送  任何一个不通过的话 不发送请求
        // 通过判定 两把锁的状态决定是否发送请求
        if (!($user_lock && $pass_lock)) {
            return;
        }
        //发送ajax
        $.ajax({
            url: "/php/regist.php",
            type: "post",
            data: {
                username: $username.val(),
                password: $password.val()
            },
            dataType: "json"
        })
            .then(function (data) {
                console.log(data)
                alert(data.msg);
                if (!data.error) {
                    console.log(data);
                    // 成功之后 我们要跳转到登录页面 
                    location.href = "./login.html";
                } else {
                    console.log(data)
                    throw new Error(data.msg);
                }
            })
            .catch(function (e) {
                alert("注册失败");
            })
    });

})();