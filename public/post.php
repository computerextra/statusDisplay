<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
// header('Content-Type: application/json; charset=utf-8');

require_once("config.php");

$obj = json_decode(file_get_contents('php://input'));

// echo (file_get_contents('php://input'));
$status = $obj->status;
// echo ($status);

date_default_timezone_set("Europe/Berlin");
$since = date('H:i');
// echo ($since);

mysqli_query($con, "UPDATE status SET `status`='$status', `since`='$since' WHERE `id`=1");

echo ($status);
