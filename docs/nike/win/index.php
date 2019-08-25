<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta property="og:title" content="AF1 ART BATTLE"><!-- 수정 -->
<meta property="og:type" content="website"><!-- 수정 -->
<meta property="og:image" content="images/og.jpg"><!-- 수정 -->
<title>AF1 DIY STUDIO</title>
<link rel="shortcut icon" href="images/favicon.ico"/>
<link rel="stylesheet" type="text/css" href="css/reset.css"/>
<link rel="stylesheet" type="text/css" href="css/common.css"/>
<script type="text/javascript" src="js/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="/js/util.js"></script>
<script type="text/javascript" src="/js/jquery.redirect.js"></script>
</head>
<body>

<div id="wrap">

	<div class="table">
		<h1><img src="images/img_battleforce1.png" alt="BATTLE FORCE SEOUL - AF1 ART BATTLE"></h1>
		<div class="content before">
			<div class="txt">
				<img src="images/img_content1.png" alt="FIGURE KIT 당첨자 확인 - 이벤트에 응모하신 전화번호를 입력해주세요">
			</div>
			<div class="insert">
				<label><input id="phone" type="text" class="phone_number" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event)" maxlength="11" placeholder="-없이 입력하세요"></label>
			</div>
			<div class="btn_area">
				<button type="button" onclick=""><img src="images/btn_confirm.jpg" alt="확인"></button>
			</div>
		</div>
	</div>

</div>

<!-- 팝업 - 키트 -->
<div class="popup pop-failed">
	<div class="pop-cont">
		<div class="inner">
			<div class="bg">
				<h2><img src="images/img_logo.png" alt=""></h2>
				<img src="images/img_pop_content3.png" alt="">
				<a href="https://www.nike.com/kr/ko_kr/c/nsw/battleforce/art"><img src="images/btn_pop_content2.png" alt="배틀포스 페이지 바로가기"></a>
			</div>
		</div>
	</div>
</div>
<!-- //팝업 - 키트 -->

<script type="text/javascript">
	//휴대폰번호 input 숫자 이외 입력 막기
	function onlyNumber(event){
		event = event || window.event;
		var keyID = (event.which) ? event.which : event.keyCode;
		if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 )
			return;
		else
			return false;
	}
	function removeChar(event) {
		event = event || window.event;
		var keyID = (event.which) ? event.which : event.keyCode;
		if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 )
			return;
		else
			event.target.value = event.target.value.replace(/[^0-9]/g, "");
	}

	
	jQuery(document).on("click", ".btn_area", function(){
		var phone = $('#phone').val().trim();

		var phoneNumberRegex = /^[0-9]{3}[0-9]{3,}[0-9]{4}$/;
		if(!phoneNumberRegex.test(phone)) {
			alert("휴대폰 번호를 입력해주세요");
			return false;
		}

		var url = "/win/find_user.php";
		var data = {
			"phone" : phone
		};
		
		scriptUtil.ajaxCallBack(url, "POST", data, "html", function(response){
			if(response == '200')
				$.redirect('./winner.php', {'phone': phone});
			else
				popOpen('.pop-failed');
		}, function(data){
		});

	});
</script>

</body>
</html>