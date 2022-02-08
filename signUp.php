<?php

$conn = mysqli_connect("localhost","root","","paw");

$name = $_POST["name"];
$email = $_POST["email"];
$password = $_POST["password"];  

$query = "insert into logs(name,email,password) VALUES ('".$name."','".$email."','".$password."');";
$rsp = mysqli_query($conn,$query); 

$query = "select * from logs where name=\"".$name."\" and password=\"".$password."\";";
$result = mysqli_query($conn,$query);
$resultAsAnArray = $result->fetch_assoc();
echo $resultAsAnArray['id'].';'.$resultAsAnArray['name'];

?>