<?php

if(isset($_POST["query"])){
    $conn = mysqli_connect("localhost","root","","paw");
    $data = array();
    $input =$_POST["query"];
    $query="select * from products where name like '%".$input."%'ORDER BY name ASC;";
    $result = $conn->query($query);

    foreach($result as $row){
        $data[] = array(
            "name" => str_ireplace($input, "<b>".$input."</b>", $row["name"]), "price" => $row["price"], "image" =>  $row["image"]
        );
    }
    echo json_encode($data);
}
