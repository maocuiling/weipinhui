; (function () {
    // 实现用户名验证功能
    var $username = $("#username");
    var $password = $("#password");
    var $submitBtn = $("#submitBtn");
    var $usernameTips = $("#usernameTips")
    var $passwordTips = $("#passwordTips")
    // 定义两把锁  一把决定用户名是否验证通过 一把决定密码是否验证通过
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
            $usernameTips.text("您的用户名不符合规范");
            $user_lock = false;
            return;
        }
        $usernameTips.text("");
        $user_lock = true;
    });


    $password.on("blur", function () {
        var $val = $password.val();
        console.log($val)
        var $reg = /^[^\d]\w{6,10}$/;
        if (!$reg.test($val)) {
            $passwordTips.text("您的密码不符合规范");
            $pass_lock = false;
            return;
        }
        $passwordTips.text("");
        $pass_lock = true;

    });


    $submitBtn.on("click", function () {
        // 验证两把锁屏
        if (!($user_lock && $pass_lock)) {
            return;
        }


        //发送ajax请求
        $.ajax({
            url: "/php/login.php",
            type: "post",
            data: {
                username: $username.val(),
                password: $password.val()
            },
            dataType: "json"
        })
            .then(function (data) {
                alert(data.msg);
                console.log(data)
                if (!data.error) {
                    // 先获取URL的hash部分
                    var $targetURL = location.hash.slice(1) || "./list.html";
                    console.log($targetURL);
                    // 提示用户
                    // alert(data.msg);
                    // 登录成功 跳转到列表页
                    location.href = $targetURL;
                } else {
                    // alert(data.msg);
                    throw new Error(data.msg);
                }
            })
            .catch(function (e) {
                alert("登录失败");
            })
    })
})();