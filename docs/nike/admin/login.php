<?php 
	session_start(); 
	$request_uri = $_SERVER['REQUEST_URI'];
	$pos = strpos($request_uri, "login");
	
	$adminInfo;

	if(isset($_SESSION["adminInfo"])){
		if($pos){
			header('Location: /admin/participant_list.php');
		}
		
			$adminInfo = $_SESSION["adminInfo"];
		
	}else{
		if(!$pos){
			header('Location: /admin/login.php');					
		}

	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /> -->
<title>AF1 DIY STUDIO</title>
<link rel="shortcut icon" href="images/favicon.ico"/>
<link rel="stylesheet" type="text/css" href="css/reset.css"/>
<link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css"/>
<link rel="stylesheet" type="text/css" href="css/common.css"/>
<script type="text/javascript" src="js/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="js/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="../js/util.js"></script>
</head>
<body>

<div id="loginWrp">

	<!-- Header -->
	<div id="header">
		<h1><img src="images/logo.png" alt="AF1 DIY STUDIO"></h1>
	</div>
	<!-- //Header -->

	<div class="login">
		<h2>관리자 로그인</h2>
		<div class="form_area">
			<dl>
				<dt><label>User ID</label></dt>
				<dd><input id="loginId" type="text" value=""></dd>
			</dl>
			<dl>
				<dt><label>Password</label></dt>
				<dd><input id="loginPass" type="password" value=""></dd>
			</dl>
			<a href="javascript:loginForm();" class="btn_login">로그인</a>
		</div>
	</div>

</div>
<script type="text/javascript">
		
	jQuery(document).on("keypress", "#loginId, #loginPass", function(e){
		if (e.keyCode == 13){
			loginForm();
		}
	});
	
	var loginForm = function(){
		var loginId = jQuery("#loginId").val();
		var loginPass = jQuery("#loginPass").val();
		
		if(loginId == ""){
			alert("아이디를 입력하세요.");
			jQuery("#loginId").focus();
			return;
		}
		
		if(loginPass == ""){
			alert("비밀번호를 입력하세요.");
			jQuery("#loginPass").focus();
			return;
		}
		
		var url = "/admin/loginProc.php";


		var data = {
			"loginId" : loginId
			, "loginPass" : loginPass
		};

		scriptUtil.ajaxCallBack(url, "POST", data, "html", function(data){
			console.log(data);
			if(data.trim() == 200){
				location.href = "/admin/participant_list.php"
			}else if(data.trim() == 300){
				alert("아이디나 비밀번호를 잘못 입력하셨습니다.");
			}else{
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도하세요.");
			}
		}, function(){
		});
	};
</script>
</body>
</html>