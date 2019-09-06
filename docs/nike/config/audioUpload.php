<?php

$file_name = date("YmdHis")."_".time();



$tmp_filename = $_FILES["fileName"]["tmp_name"];

rename($tmp_filename,"/upload/audio/{$file_name}_recoding.wav");



$uploadDir = "/upload/audio";

move_uploaded_file($tmp_filename, "$uploadDir/$tmp_filename");

echo $file_name;

?>