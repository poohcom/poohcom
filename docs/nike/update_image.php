<?php
	include_once("./config/config.php");	
	
    $resultMsg = 200;
	$nike_id = $_REQUEST['nike_id'];
	$image = $_REQUEST['image'];
    
    try{
		
		$con = dbConnection();
        // $sql = " UPDATE NK_USER SET 
        //     image='$image' 
        //     WHERE nike_id='$nike_id';";
        $sql = " INSERT INTO NK_IMAGE (
           nike_id
           , image 
        ) values (
            '$nike_id'
            , '$image' 
        )";
        
        sql_query($sql, $con);
		
        sql_close($con);
	}catch(Exception $e){
		$msg = $e -> getMessage();
		$resultMsg = 500;
    }
    
    echo $resultMsg;
?>