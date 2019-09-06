<?php
	include_once("../config/config.php");	
	
    $resultMsg = 200;
	$phone = $_REQUEST['phone'];
    $address1 = $_REQUEST['address1'];
    $address2 = $_REQUEST['address2'];
    $name = $_REQUEST['name'];
    
    try{
		
        $con = dbConnection();
        
        $sql = " select * from NK_WINNER where phone='" . $phone . "'";
		
        $result = sql_query($sql, $con);
        
        if(($result->num_rows)>0)
        {  
            $sql = " UPDATE NK_WINNER SET 
            name='$name'
            , address1='$address1'
            , address2='$address2' 
            WHERE phone='$phone';";
            
            sql_query($sql, $con);
        }
        else
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