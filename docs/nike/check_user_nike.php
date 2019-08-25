<?php
	include_once("./config/config.php");	
	
    $resultMsg = 200;
    
    $nike_id = $_REQUEST['nike_id'];
    
    try{
		
		$con = dbConnection();
		
        $sql = "SELECT * FROM nike.NK_USER WHERE nike_id='$nike_id' limit 1";	
        
		$result = sql_query($sql, $con);

		if($result->num_rows > 0){
			$row = sql_fetch($result);
			sql_close($con);
			echo json_encode($row);
		}		
	}catch(Exception $e){
		$msg = $e -> getMessage();
		$resultMsg = 500;
	}
?>