<?php
	include_once("../config/config.php");
	
	
	$resultMsg = 200;
	
	try{
		session_start();
		session_destroy();
	}catch(Exception $e){
		$msg = $e -> getMessage();
		$resultMsg = 500;
	}
?>
<?=$resultMsg?>
