<?php

$conn = mysqli_connect("localhost","root","","paw");

$user = $_POST["name"];
$password = $_POST["password"];  

if (filter_var($user, FILTER_VALIDATE_EMAIL)) {
    $query = "select * from logs where email=\"".$user."\" and password=\"".$password."\";";
} else {
    $query = "select * from logs where name=\"".$user."\" and password=\"".$password."\";";
}

$result = mysqli_query($conn,$query);
$resultAsAnArray = $result->fetch_assoc();
try{
$rows = mysqli_num_rows($result);
}catch(Exception $e){
    echo "ERROR connection to database failed!!";
}
if($rows){
    echo $resultAsAnArray['id'].';'.$resultAsAnArray['name'];
}
else{
    echo '0';
}  

?>