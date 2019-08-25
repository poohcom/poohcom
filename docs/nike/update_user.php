<?php
	include_once("./config/config.php");	
	
    $resultMsg = 200;
    $my_id = $_REQUEST['my_id'];
	$nike_id = $_REQUEST['nike_id'];
	$insta_id = $_REQUEST['insta_id'];
	$phone = $_REQUEST['phone'];
    $sms = $_REQUEST['sms'];
    $address1 = $_REQUEST['address1'];
    $address2 = $_REQUEST['address2'];
    
    try{
		
        $con = dbConnection();
        
        $sql = " select * from NK_USER where nike_id='" . $nike_id . "'";
		
        $result = sql_query($sql, $con);
        
        if(($result->num_rows)<1)
        {
            $sql = " insert into NK_USER (
                nike_id
                , insta_id
                , phone
                , address1
                , address2
                , sms
            ) values (
                '$nike_id'
                , '$insta_id'
                , '$phone'
                , '$address1'
                , '$address2'
                , '$sms'
            )";	            
            sql_query($sql, $con);
        }
        else
        {    
            $sql = " UPDATE NK_USER SET 
            insta_id='$insta_id'
            , phone='$phone'
            , address1='$address1'
            , address2='$address2'
            , sms='$sms' 
            WHERE nike_id='$nike_id';";
            
            sql_query($sql, $con);
        }
		
		sql_close($con);
	}catch(Exception $e){
		$msg = $e -> getMessage();
		$resultMsg = 500;
	}
?>