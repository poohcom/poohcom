<?php
	include_once("../config/config.php");	
	
    $resultMsg = 200;
	$phone = $_REQUEST['phone'];
    
    try{
		
        $con = dbConnection();
        
        $sql = " select * from NK_WINNER where phone='" . $phone . "'";
		
        $result = sql_query($sql, $con);
        
        if(($result->num_rows)<1)
        {  
            $resultMsg = 300;
        }
		
		sql_close($con);
	}catch(Exception $e){
		$msg = $e -> getMessage();
		$resultMsg = 500;
    }
    
    echo $resultMsg;
?>