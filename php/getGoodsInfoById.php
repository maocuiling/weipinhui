<?php
    // 获取前端传递的id
    $id = $_GET["id"];
    // 连接数据库
    mysql_connect("localhost", "root", "root");
    // 选择数据库
    mysql_select_db("test");
    // 定义sql语句
    $sql = "select * from goods where goods_id='$id'";
    // 执行sql语句
    $result = mysql_query($sql);
    // 抽取数据 
    $row = mysql_fetch_array($result);
    // 组装json
    $arr = array("error" => 0, "data" => $row);
    // 返回json
    echo json_encode($arr);
?>