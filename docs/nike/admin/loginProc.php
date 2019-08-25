<?php
	include_once("../config/config.php");
	
	$loginId = $_POST["loginId"];
	$loginPass = $_POST["loginPass"];
	
	$resultMsg = 200;
	
	try{
		$con = dbConnection();
		
		//로그인 검증 (아이디, 비밀번호 맞는지)
		
		$sql = " select loginid, loginpass from NK_ADMIN where loginid='" . $loginId . "' and loginpass='".$loginPass."'";
		
		$result = sql_query($sql, $con);
		
		if(($result->num_rows)>0){
			session_start();

			$row = sql_fetch($result);	
			
			$adminInfo["loginId"] = $row["loginid"];
			$adminInfo["loginPass"] = $row["loginpass"];			
			$_SESSION["adminInfo"] = $adminInfo;
			
			
		}else{
			$resultMsg = 300;
		}
		
		
		
		
		//$resultMsg = $result;
		
		//print_r($result);
		
		sql_close($con);
	}catch(Exception $e){
		$msg = $e -> getMessage();
		$resultMsg = 500;
	}
?>
<?=$resultMsg?>
