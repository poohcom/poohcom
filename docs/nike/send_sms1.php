<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<?php
	/******************** 인증정보 ********************/
	$sms_url = "https://apis.aligo.in/send/"; // 전송요청 URL
	$sms['user_id'] = "sallbull"; // SMS 아이디
	$sms['key'] = "iaev15jcbpto9hwlqjgouqx1du4nxy0l";//인증키
	/******************** 인증정보 ********************/

	
	$message = "[BATTLE FORCE SEOUL]\nAF1 ART BATTLE에 참여하신 여러분 환영합니다. 하단의 링크를 눌러 캠페인 사이트에 접속해 주세요\n\nwww.battleforce-art.co.kr";
	$send_number = '0269248741';
	$phone_number = $_POST['phone_number'];
	
	$sms['msg'] = $message;
	$sms['receiver'] = $phone_number;
	$sms['sender'] = $send_number;

	$host_info = explode("/", $sms_url);
	$port = $host_info[0] == 'https:' ? 443 : 80;
	
	$oCurl = curl_init();
	curl_setopt($oCurl, CURLOPT_PORT, $port);
	curl_setopt($oCurl, CURLOPT_URL, $sms_url);
	curl_setopt($oCurl, CURLOPT_POST, 1);
	curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($oCurl, CURLOPT_POSTFIELDS, $sms);
	curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);
	$ret = curl_exec($oCurl);
	echo $ret;
	curl_close($oCurl);
?>
</body>