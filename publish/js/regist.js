"use strict";!function(){var t=$("#username"),e=$("#password"),o=$("#submitBtn"),n=$("#usernameTips"),r=$("#passwordTips"),s=!1,a=!1;t.on("blur",function(){var o=t.val();console.log(o);if(!/^[^\d]\w{6,10}$/.test(o))return n.text("请输入7~11位的英文字符，不能以数字开头"),void(s=!1);n.text("√用户名通过验证"),$.ajax({url:"../php/checkusername.php",type:"get",data:{username:o},dataType:"json"}).then(function(o){if(console.log(o),o.error)throw console.log(o),alert(o.msg),new Error(o.msg);console.log(o),s=!0}).catch(function(o){console.log(o),s=!1})}),e.on("blur",function(){var o=e.val();console.log(o);if(!/^[^\d]\w{6,10}$/.test(o))return r.text("请输入7~11位的英文字符，不能以数字开头"),void(a=!1);r.text("√密码通过验证"),a=!0}),o.on("click",function(){s&&a&&$.ajax({url:"/php/regist.php",type:"post",data:{username:t.val(),password:e.val()},dataType:"json"}).then(function(o){if(console.log(o),alert(o.msg),o.error)throw console.log(o),new Error(o.msg);console.log(o),location.href="./login.html"}).catch(function(o){alert("注册失败")})})}();