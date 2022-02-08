<?php

$conn = mysqli_connect("localhost","root","","paw");

$name = $_POST["name"];
$price = $_POST["price"];
$image = $_POST["image"]; 
$sellerId = $_POST["sellerId"]; 

$query = "insert into products(name,price,image,sellerId) VALUES ('".$name."','".$price."','".$image."','".$sellerId."');";
$rsp = mysqli_query($conn,$query); 
echo $rsp


?>