<?php

    // 通知浏览器本次返回内容的类型  让浏览器按照此类型处理
    header("content-type: text/plain;charset=utf-8");
    // 查询数据库 查询所有商品信息 组成一个json返回给前端即可
    mysql_connect("localhost", "root", "root");
    mysql_select_db("test");
    $sql = "SELECT * FROM goods";
    $result = mysql_query($sql);
    $arr = array();
    while($row = mysql_fetch_array($result)) {
        // while循环过程： 1 从$result中抽取一条数据 是一个关联数组   2 交给$row变量存储  3 放入$arr数组中
        array_push($arr, $row);
    }
    // while循环之后  $arr 请理解成[{}, {}, {}, {}, {}] 这样的数组
    $json = array("error" => 0, "msg" => $arr);
    echo json_encode( $json );

?>