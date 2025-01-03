<?php

define("MYSQL_SERVER", "w0109bd9.kasserver.com");
define("MYSQL_USER", "d03ee685");
define("MYSQL_PASS", "RFXq9TsFX9fcfjXWZ5sd");
define("MYSQL_DB", "d03ee685");

$servername = MYSQL_SERVER;
$username = MYSQL_USER;
$password = MYSQL_PASS;
$database = MYSQL_DB;

$con = mysqli_connect($servername, $username, $password, $database);
$con->set_charset("utf8mb4");
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}
