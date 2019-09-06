<?php
	
	error_reporting(E_ERROR | E_WARNING);

	ini_set("display_errors", 1);

	function dbConnection(){
		$host = "localhost";
		$username = "nike";
		$password = "nike";
		$dbname = "nike";
		$con = mysqli_connect($host, $username, $password, $dbname) or die("DATABASE FAILED TO RESPOND.");
		return $con;
	}
	
	function sql_query($sql, $con){
		$result = mysqli_query($con, $sql);
		return $result;
	}
	
	function sql_fetch_array($result){
		//$result = sql_query($sql, $con);
		$row = mysqli_fetch_array($result);
		if($row != null)
			$trimmed_row=array_map('trim',$row);
		else
			$trimmed_row = $row;
		return $trimmed_row;
	}
	
	function sql_fetch($result){
		//$result = sql_query($sql, $con);
		$row = mysqli_fetch_assoc($result);
		return  $row;
	}
	
	function sql_close($con){
		mysqli_close($con);
	}	
?>