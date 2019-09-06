<?php
	include_once('nusoap_tong.php');
	$sms_id = 'sallbull';
	$sms_pwd = 'xhrxjel01';
	
	$title = '';
	$message = "나이키 AF1 캠페인에 참여해주셔서 감사합니다.\n아래의 링크로 접속하여 참여 바랍니다.\nwww.battleforce-art.co.kr";
	$send_number = '0262043157';
	$phone_number = $_POST['phone_number'];
	
	$lms = new LMS('http://lmsservice.tongkni.co.kr/lms.1/ServiceLMS.asmx?WSDL');
	$result = $lms->SendLMS($sms_id, $sms_pwd, $send_number, $phone_number, $title, $message);
	echo $result;
?>