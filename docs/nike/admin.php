<?php
	$url = "http://d3gx3e902377qv.cloudfront.net/"; 
?>
<!DOCTYPE html>
<html lang="en">
<head>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-127769031-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-127769031-1');
</script>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta property="og:title" content="AF1 ART BATTLE"><!-- 수정 -->
<meta property="og:type" content="website"><!-- 수정 -->
<meta property="og:image" content="<?=$url?>images/og.jpg"><!-- 수정 -->
<title>AF1 DIY STUDIO</title>
<link rel="stylesheet" type="text/css" href="<?=$url?>css/reset.css"/>
<link rel="stylesheet" type="text/css" href="<?=$url?>css/common.css"/>
<script type="text/javascript" src="<?=$url?>js/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="<?=$url?>js/jquery.bxslider.min.js"></script>
<script type="text/javascript" src="<?=$url?>js/common.js"></script>
<script type="text/javascript" src="<?=$url?>js/util.js"></script>
<script type="text/javascript" src="/js/jquery.redirect.js"></script>
<!-- <script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script> -->
</head>
<body>

<div id="wrap">

<!-- Header -->
<div id="header">
	<h1><a href="./index.php"><img src="<?=$url?>images/logo.png" alt="AF1 DIY STUDIO"></a></h1>
	<a href="javascript:popOpen('.pop-kit');" class="btn_infomation">소개</a>
</div>
<!-- //Header -->

<!-- Container -->
<div id="container">
	<h2 class="blind">본문 내용</h2>

	<div class="admin">
		<div class="section">
			<div class="txt_top">
				<img src="<?=$url?>images/img_admin_top.png" alt="">
			</div>
			<div class="box">
				<ul>
					<li>
						<input id="my_id" type="hidden">
						<strong>
							<img src="<?=$url?>images/txt_admin1.png" alt="NIKE.COM ID">
							<a href="https://www.nike.com/kr/ko_kr/register?cp=kr_br_ot_nsw_battleforce" target="blank_" class="btn_join">nike.com 회원 가입하기</a><!-- 수정 -->
						</strong>
						<div class="insert">
							<label><input id="nike_id" type="text"></label>
						</div>
					</li>
					<li>
						<strong><img src="<?=$url?>images/txt_admin2.png" alt="INSTAGRAM ID"></strong>
						<div class="insert">
							<label><input id="insta_id" type="text"></label>
						</div>
					</li>
					<li>
						<strong><img src="<?=$url?>images/txt_admin3.png" alt="휴대폰 번호"></strong>
						<div class="insert">
							<label><input id="phone" type="text" class="phone_number" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event)" maxlength="11" placeholder="-없이 입력하세요"></label>
						</div>
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
						</script>
					</li>
					<!-- <li class="address">
						<strong><img src="<?=$url?>images/txt_admin4.png" alt="경품 수령 주소"></strong>
						<div class="search_add">
							<input type="text" id="address1" disabled>
							<a href="javascript:mydaum()">
								<img src="<?=$url?>images/btn_address.png" alt="주소 검색">
								<img src="<?=$url?>images/btn_address_on.png" class="btn-hover" alt="주소 검색">
							</a>
						</div>
						<input type="text" id="address2" placeholder="상세 주소">
					</li> -->
				</ul>

				<div class="chk">
					<div class="collect_agree" onclick="popOpen('.pop-collectagree');">
						<img src="<?=$url?>images/img_admin_checkbox2.png" alt="이벤트 안내를 위한 개인 정보 수집에 동의합니다. (필수)">
					</div>
					<input type="checkbox" id="smsAgree"><label for="smsAgree"><img src="<?=$url?>images/img_admin_checkbox1.png" alt="이벤트 안내를 위한 SMS 수신에 동의합니다. (선택)"></label>
				</div>
			</div>
			<a href="#" class="btn ft-drukwide">
				<img src="<?=$url?>images/btn_admin.png" alt="next">
				<img src="<?=$url?>images/btn_admin_on.png" class="btn-hover" alt="next"><!-- 수정 -->
			</a>
		</div>
	</div>

	<!-- iOS에서는 position:fixed 버그가 있음, 적용하는 사이트에 맞게 position:absolute 등을 이용하여 top,left값 조정 필요 -->
	<!-- <div id="address_popup" style="display:none">
        <div class="dimmed" style="position:absolute;top: 0;left: 0;bottom: 0;right: 0;z-index: 12;background-color: black;opacity: 0.8;"></div>
	    <div id="layer" style="position:absolute;top:50%;left:50%;transform: translate(-50%, -50%);overflow:hidden;z-index:13;-webkit-overflow-scrolling:touch;">
	        <img src="//t1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼">
        </div>
	</div> -->

</div>
<!-- //Container -->

<!-- 팝업 - 키트 -->
<div class="popup pop-kit">
	<div class="pop-cont">
		<div class="txt">
			<div class="inner"><!-- 수정 -->
				<img src="<?=$url?>images/img_kit.jpg" alt="">
				<button type="button" class="btn-close">닫기</button>
			</div>
		</div>
	</div>
</div>
<!-- //팝업 - 키트 -->

<!-- 팝업 - 개인정보 약관 동의 - 수정 -->
<div class="popup pop-collectagree">
	<div class="pop-cont">
		<div class="txt">
			<div class="inner">
				<img src="<?=$url?>images/img_admin_pop_top.png" alt="">
				<div class="textarea">
				<!-- 수정 -->
				<h2>개인정보 수집 및 이용 동의</h2><br>
				아래는 ‘Battle Force 이벤트ʼ(이하 “이벤트”) 참가 신청, 이벤트 진행 및 이벤트 관련 안내를 위한 연락을 목적으로 사용되는 개인 정보에 대한 수집 / 이용 동의 확인 절차로, 나이키는 참가자의 개인정보보호 를 소중하게 생 각하고 이를 보호하기 위하여 항상 최선을 다해 노력하고 있습니다. 나이키는 개 인정보보호 관련 법률규정을 준 수하고 있습니다.<br>
				(유)나이키코리아는 이벤트의 원활한 진행을 위해 신청 시 NIKE.COM, event.nike.co.kr 를 통해 아래와 같은 내용을 수집하고 사용합니다.<br>
				<h3>[필수] 개인정보 수집·이용 동의</h3><br><br>
				<table>
					<thead>
						<tr>
							<th scope="col">목적</th>
							<th scope="col">항목</th>
							<th scope="col">보유기간</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>이벤트 경품 전달 목적</td>
							<td>NIKE.COM ID</td>
							<td>등록일로부터 2개월까지</td>
						</tr>
						<tr>
							<td>이벤트 참여 여부 확인</td>
							<td>INSTAGRAM ID</td>
							<td>등록일로부터 2개월까지</td>
						</tr>
						<tr>
							<td>당첨 사실 고지 및 이벤트 알림</td>
							<td>휴대폰 번호</td>
							<td>등록일로부터 2개월까지</td>
						</tr>
						<tr>
							<td>이벤트 경품 배송 목적</td>
							<td>경품수령주소</td>
							<td>등록일로부터 2개월까지</td>
						</tr>
					</tbody>
				</table><br><br>
				※동의거부권리및동의거부시불이익: 필수정보의수집이용에관한동의를거부하실수있으며,다만필 수 정보는 “이벤트”참가를 위해서 필요한 최소한의 개인정보이므로 동의를 해 주셔야 “이벤트” 참가가 가능합니다.<br><br>

				<h2>개인정보 처리업무 위탁에 대한 고지</h2>
				(유)나이키코리아는 “이벤트” 진행을 위해 참가자의 개인 정보를 외부에 위탁하여 처리하고 있으 며, 관계법령에 따라 위탁 계약 시 개인정보가 안전하게 관리될 수 있도록 규정하고 있습니다. 동 이벤트의 개인정보취급 수탁자 와 그 업무의 내용은 아래와 같습니다.<br><br>
				<table>
					<thead>
						<tr>
							<th scope="col">수탁자</th>
							<th scope="col">목적</th>
							<th scope="col">제공하는 정보</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>(주)포스트비쥬얼</td>
							<td>이벤트 진행 대행 및 시스템 데이터 관리</td>
							<td>NIKE.COM ID<br>INSTAGRAM ID<br>휴대폰 번 호 경품 수령주소</td>
						</tr>
						<tr>
							<td>비구스</td>
							<td>시스템 데이터 관리</td>
							<td>NIKE.COM ID<br>INSTAGRAM ID 휴대폰 번 호 경품 수령주소</td>
						</tr>
					</tbody>
				</table><br><br>

				<h2>개인정보 처리방침</h2>
				(유)나이키코리아는 고객의 개인정보보호를 소중하게 생각하고, 고객의 개인정보를 보호하기 위 하여 항상 최선을 다해 노력하고 있습니다. (유)나이키코리아는 「개인정보보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」을 비롯한 모든 개인정보보호 관련 법률규정을 준수하고 있 습니다.<br><br>

				<h3>1. 수집하는 개인정보의 항목 및 수집방법</h3>
				개인정보 수집에 대한 동의<br>
				(유)나이키코리아는 개인정보 수집,이용 동의에 대해 「동의합니다」 를 클릭할 수 있는 절차를 마 련하고 있으며, 「동의합니다」 버튼을 클릭하면 개인정보 수집에 대해 동의한 것으로 봅니다.<br><br>

				"(유)나이키코리아"가 "서비스" 이용과 관련하여 수집하는 개인정보의 범위는 아래와 같습니다.<br>
				[필수입력사항]<br>
				① 성명<br>
				② 이메일주소, 이메일 수신여부<br>
				③ 휴대폰번호, SMS 수신여부<br>
				④ 희망ID(회원의 경우)<br>
				⑤ 비번호(회원의 경우)<br>
				⑥ 생년월일<br>
				⑦ 성별 서비스 이용 또는 사업처리 과정에서 아래와 같은 정보들이 생성되어 수집될 수 있습니다.<br>
				- 서비스이용기록, 접속로그, 쿠키, 접속IP정보, 결제기록, 이용정지기록 개인 정보의 수집 방법은 아래와 같습니다.<br>
				① 홈페이지, 서면양식, 전화, 팩스를 통한 문의하기<br>
				② 제휴사로부터의 제공<br>
				③ 이벤트 응모, 서비스 이용 기록 수집 툴을 통한 수집<br>
				④ 본인인증을 통한 회원정보 제공<br><br>

				<h3>2. 개인정보의 수집 및 이용목적</h3>
				(유)나이키코리아는 본 조 제 1항의 수집 정보를 다음과 같은 목적을 위하여 사용합니다.<br>
				① 서비스 이용에 따른 본인식별, 실명확인, 가입의사 확인, 연령제한 서비스 이용<br>
				② 고지사항 전달, 불만처리 의사소통 경로 확보, 물품배송 시 정확한 배송지 정보 확보<br>
				③ (유)나이키코리아는가 주관하는 행사, 프로모션, 서베이의 응모, 접수, 등록을 포함한 전반적 인 운 관리 및 이와 관련된 경품, 제품, 소식지 및 각종 홍보물 등의 배송<br>
				④ (유)나이키코리아가 제공하는 각종 소식 및 고지 사항 전달, 본인 의사 확인<br>
				⑤ (유)나이키코리아의 마케팅 활동에 필요한 인구 통계학적 분석.<br><br>

				<h3>3. 비회원 고객 개인정보수집</h3>
				(유)나이키코리아는 비회원 고객 또한 물품 및 서비스 상품의 구매를 하실 수 있습니다. 비회원 고객이 상품 구매 및 이와 관련한 서비스 (예, 제품 입고 알림 서비스 (Notify Me), 환불, 수선 A/S등 포함), 배송 및 대금 결제, 주문내역 조회 및 구매확인 등을 위하여 필요할 경우에만 최소 한의 개인정보만을 수집, 이용하고 있습니다. 입력하신 정보는 수집 시 안내해 드린 목적 외에는 다른 어떠한 용도로도 사용되지 않습니다.<br>

				<h2>4. 개인정보의 목적 외 사용 및 제3자에 대한 제공 및 공유</h2>
				(유)나이키코리아는 회원의 개인정보를 '개인정보의 수집항목 및 수집방법', '개인정보의 이용' 에 서 고지한 범위 내에서 사용하며, 동 범위를 초과하여 이용하거나 타인 또는 타기업/기관에 제공 하지 않습니다.<br>
				다만, 다음은 예외로 합니다.<br>
				1) 회원이 사전에 동의한 경우<br>
				(유)나이키코리아는 회원의 개인정보를 제3자에게 제공하기 이전에 다음의 모든 사항을 회원에 게 알리고 동의를 받습니다.<br>
				(1) 개인정보를 제공받는 자<br>
				(2) 개인정보를 제공받는 자의 개인정보 이용 목적<br>
				(3) 제공하는 개인정보의 항목<br>
				(4) 개인정보를 제공받는 자의 개인정보 보유 및 이용 기간<br>
				2) 관계법률의 규정에 의거하거나, 수사목적으로 관계법률에서 정한 절차와 방법에 따라 수사기 관이 개인정보 제공을 요구하는 경우<br>
				3) 업의 양수 등 업의 양수 등에 관한 사유가 발생하여 회원의 개인정보 이전이 필요한 경우, (유)나이키코리아 는 정보통신망 이용 촉진 및 정보보호에 관한 법률 등 관계법률에서 규정한 절차와 방법에 따라 개인정보 이전에 관한 사실 등을 사전에 고지하며, 회원에게는 개인정보 이전에 관한 동의 철회권 을 부여합니다.<br><br>

				<h2>5. 개인정보 처리 업무의 위탁</h2>
				(유)나이키코리아는 서비스 향상을 위해 고객의 개인정보를 외부에 위탁하여 처리하고 있으며, 관계법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 규정하고 있습니다. 현재, (유)나이키코리아는 개인정보처리 수탁자와 그 업무의 내용은 다음과 같습니다.<br><br>
				<table>
					<thead>
						<tr>
							<th scope="col">수탁자</th>
							<th scope="col">위탁업무내용</th>
							<th scope="col">제공하는 정보</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>GS SHOP㈜</td>
							<td>전산시스템의 구축 및 유지보수</td>
							<td>회원정보, 주문정보</td>
						</tr>
						<tr>
							<td>LF Logistics, CJ대한통운</td>
							<td>상품배송업무</td>
							<td>배송정보</td>
						</tr>
						<tr>
							<td>서울신용평가정보㈜</td>
							<td>실명확인, 본인인증 및 문자메 세지 전송</td>
							<td>회원정보</td>
						</tr>
						<tr>
							<td>㈜에코마케팅 </td>
							<td>마케팅업무일체 </td>
							<td>회원정보, 주문정보, 배송정보 </td>
						</tr>
						<tr>
							<td>KG이니시스 </td>
							<td>신용카드,실시간계좌이체 결 제, 휴대폰 결제</td>
							<td>주문자명, 이메일주소, 환불계 좌 예금주명/계좌번호, IP 주소</td>
						</tr>
						<tr>
							<td>(주)아이뱅크 </td>
							<td>전시정보의 입력 및 주문정보 확인</td>
							<td>회원정보, 주문정보</td>
						</tr>
						<tr>
							<td>㈜커스토머인사이트</td>
							<td>서버관리 및 데이터 베이스 백 업, 고객 데이터 저장관리</td>
							<td>회원정보, 주문정보, 배송정보</td>
						</tr>
						<tr>
							<td>㈜플랜잇파트너스</td>
							<td>분석레포트</td>
							<td>회원정보, 주문정보, 배송정보 </td>
						</tr>
						<tr>
							<td>카카오페이</td>
							<td>카카오페이 온라인 간편결제 에 대한 결제 대행 업무 (결제 승인 및 취소, 매입, 정산)</td>
							<td>회원정보, 주문정보</td>
						</tr>
					</tbody>
				</table><br><br>
				회원의 특정 주문 형태에 따라(예시. 주문 예약에 따른 나이키 오프라인 매장 내 구입) 전술된 개 인정보처리 수탁자 외에 나이키 판매점에 회원의 개인정보(연락처 등)가 제공될 수 있습니다.<br><br>

				<h2>6. 개인정보의 보유 및 이용기간</h2>
				(유)나이키코리아가 회원님의 개인정보를 수집하는 경우 그 보유기간은 회원가입 하신 후 해지 (탈퇴신청, 직권탈퇴 포함)시까지 입니다. 또한 해지 시 (유)나이키코리아는 회원님의 개인정보를 즉시 파기하며 개인정보가 제3자에게 제공된 경우에는 제3자에게도 파기하도록 지시합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.<br>
				① 보존 항목 : 고객 정보, 서비스 이용기록, 결제기록, 접속 IP 정보<br>
				② 보존 근거 : 고객님의 탈퇴기록 및 수사기관 협조 등에 이용하기 위하여 보존함<br>
				③ 보존 기간 : 3개월<br>
				관계법령의 규정에 의하여 보존할 필요가 있는 경우 (유)나이키코리아는 아래와 같이 관계법령에 서 정한 일정한 기간 동안 회원정보를 보관합니다.<br>
				① 계약 또는 청약철회 등에 관한 기록 : 5년 (전자상거래등에서의 소비자보호에 관한 법률)<br>
				② 대금결제 및 재화 등의 공급에 관한 기록 : 5년 (전자상거래등에서의 소비자보호에 관한 법률)<br>
				③ 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년 (전자상거래등에서의 소비자보호에 관한 법 률)<br>
				④ 방문에 관한 기록 : 3개월 (통신비보호법)<br>
				⑤ (유)나이키코리아는 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 제29조 및 시행령 제 16조에 따라 휴면회원의 경우 다음과 같이 처리합니다.<br>
				- 미이용 기준 : 당사 서비스에 대한 로그인 일자기준<br>
				- 유효기간 : 1년<br>
				- 휴면회원 처리에 대한 안내 : 30일 이전 메일을 통한 안내<br>
				- 휴면회원에 대한 개인정보 처리 : 분리 보관조치<br>
				- 분리 보관 정보 : 회원정보 등<br>
				- 분리 보관 정보에 대한 보존 기간 : 5년후 식별정보만 남기고 비식별화 조치(개인을 특정할 수 있는 정보는 삭제)<br>
				- 계정활성화 : 고객님의 요청에 의거 계정활성화 조치 실시<br><br>

				<h2>7. 개인정보의 파기 절차 및 방법</h2>
				(유)나이키코리아 또는 그로부터 개인 정보를 제공받은 제3자는 개인 정보의 수집 목적 또는 제 공받은 목적을 달성한 때에는 아래와 같은 방법과 절차로 당해 개인 정보를 지체 없이 파기 및 삭 제합니다.<br>
				회원가입정보의 경우 : 회원탈퇴 하거나 회원에서 제명된 때<br>
				대금지급정보의 경우 : 대금의 완제일 또는 채권소멸시효기간이 만료된 때<br>
				배송정보의 경우 : 물품 또는 서비스가 인도되거나 제공된 때<br>
				설문조사, 이벤트 등 일시적 목적을 위하여 수집한 경우 : 당해 설문조사, 이벤트 등이 종료한 때<br>
				①파기절차<br>
				"이용자"가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 (종이의 경 우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 (보유 및 이용기간 참조) 일정 기간 저장된 후 파기됩니다. 별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니 고서는 보유 되어지는 이외의 다른 목적으로 이용되지 않습니다.<br>
				② 파기방법<br>
				전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니 다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.<br><br>

				<h2>8. 개인정보의 자동 수집 장치의 설치/운 및 그 거부에 관한 사항</h2>
				상기 개인 정보 외에 "서비스"는 쿠키(Cookie)와 픽셀 태그(Pixel Tag)를 통해 접속자를 인식 하며 아래의 목적으로 쿠키를 사용합니다. (쿠키는 웹 사이트 또는 웹 사이트의 서비스 제공자가 "이용자"의 컴퓨터내의 웹 브라우저로 전송하는 작은 텍스트 파일을 말하며, 이 파일들은 웹 사이 트 또는 서비스 제공자의 시스템이 "이용자"의 웹 브라우저를 인식하고 특정 정보를 저장하고 기 억하도록 합니다. 픽셀 태그는 "이용자"에게 전자우편을 보냈을 때 정형화된 포맷으로 전달하며 "이용자"가 언제 읽었는지 알려주는 작은 그래픽 이미지입니다.)<br>
				① "이용자"의 과거 방문 시 이용한 컨텐츠를 기억하여 다음 방문 시 "이용자"에게 향상된 "서비 스" 제공.<br>
				② "서비스"의 방문 traffic의 분석 및 "서비스"의 이용 행태 파악.<br>
				③ 필요에 따라 제3자와의 계약을 통해 "서비스" 방문 traffic 분석에 활용.<br>
				"이용자"는 본인이 이용하는 컴퓨터의 웹 브라우저에서 쿠키 수집 시 경고 창이 뜨도록 하거나, 쿠키 기능을 중지할 수 있습니다. (자세한 사항은 웹 브라우저의 '도움말'이나 'Help' 기능을 참조 하십시오) 만약 쿠키를 중지시킬 경우 이 기능을 통해 이용 가능했던 "서비스" 내의 여러 컨텐츠 나 기능을 이용할 수 없으며 "서비스"가 제대로 구동하지 않을 수 있습니다.<br><br>

				<h2>9. 이용자 및 법정대리인의 권리와 그 행사방법</h2>
				"이용자"는 언제든지 (유)나이키코리아가 보유한 자신 혹은 당해 만 14세 미만 아동의 개인 정보 에 대해 열람 및 오류 정정 및 동의 철회를 요구할 수 있으며 (유)나이키코리아는 이에 대해 필요 한 조치를 취할 의무를 집니다.<br>
				(유)나이키코리아가 개인정보의 수집을 위해 "이용자"의 동의를 받아야 하는 경우에는 개인 정보 관리 책임자의 신원 (소속, 성명 및 전화번호, 기타 연락처), 정보의 수집 목적 및 이용 목적, 제 3 자에 대한 정보 제공 관련 사항 (제공 받은 자, 제공 목적 및 제공할 정보의 내용)등 정보통신망 이 용촉진 및 정보보호 등에 관한 법률 등의 요구하는 사항을 명시하거나 고지해야 하며 "이용자"는 언제든지 이 동의를 철회할 수 있습니다.<br>
				이와 관련한 각종 문의 및 요청은 "서비스" 사이트 (http://www.nike.com/kr)의 '고객 상담' 메뉴나 서비스 담당자(service@nike.co.kr )에게 메일을 보내 변경 및 열람을 신청 하셔야 합 니다.<br>
				회원 정보는 로그인 후 회원 정보 페이지 상에서 "이용자"가 직접 자신 혹은 당해 만 14세 미만 아동의 개인 정보를 변경 또는 열람할 수 있습니다.<br>
				"이용자"의 법정 대리인이 "이용자"의 개인 정보의 열람 및 변경을 원할 경우 서비스 담당자 (service@nike.co.kr)에게 메일로 문의하시고 서비스 담당자의 지시에 따라 법정 대리인임을 증명할 자료 및 증표를 제시 하셔야 합니다.<br><br>

				<h2>10. 정보주체와 법정대리인의 권리의무 및 행사방법</h2>
				① 정보주체는 (유)나이키코리아에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사 할 수 있습니다.<br>
				1. 개인정보 열람요구<br>
				2. 오류 등이 있을 경우 정정 요구<br>
				3. 삭제요구<br>
				4. 처리정지 요구<br>
				② 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하 실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.<br>
				③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.<br>
				④ 제1항에 따른 권리 행사는 정보주체 및 정보주체의 법정대리인이나 위임을 받은 자 등 대리인 을 통하여 하실 수 있습니다. 이 경우 서비스 담당자의 지시에 따라 법정 대리인임을 증명할 자료 및 증표를 제시 하셔야 합니다.<br><br>

				<h2>11. 개인정보 열람청구 ,정정 ,삭제 ,처리정지 요청 방법</h2>
				정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니 다. (유)나이키코리아는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다. 이와 관련한 각종 문의 및 요청은 "서비스" 사이트 (http://www.nike.com/kr)의 '고객 상담' 메뉴나 서비스 담당자(service@nike.co.kr )에게 메일로 신청 하셔야 합니다.<br>
				▶ 개인정보 열람청구 접수․처리 부서<br>
				부서명 : Direct Digital Commerce<br>
				담당자 : 서준우<br>
				연락처 :  &lt;080-022-0182&gt;, &lt;service@nike.co.kr&gt;, &lt;02-2112-2285&gt;<br><br>

				<h2>12. 만14세 미만 아동의 개인정보보호</h2>
				(유)나이키코리아는 아동의 개인정보를 보호하기 위하여, 만 14세 미만의 아동이 회원 가입을 신 청할 경우 법정대리인(친권자인 모, 후견인 등)의 동의를 받도록 하고 있습니다. 따라서 14세 미 만의 아동이 (유)나이키코리아는 회원에 가입하고자 하는 경우에는 서비스 담당자 (service@nike.co.kr) 에게 메일로 문의해 주시기 바라며, 동의 확인을 위해 필요한 법정대리 인의 최소한의 개인정보 (이름, 연락처 등)를 알려주시기 바랍니다. 법정대리인이 가입에 동의하 지 않은 경우, 아동은 (유)나이키코리아는 회원에서 제외 될 수 있습니다.<br>
				(유)나이키코리아는 법정대리인은 아동회원의 개인정보를 열람, 동의철회, 정정하실 수 있습니 다.<br>
				(유)나이키코리아는 만14세 미만의 아동으로부터 수집한 개인정보에 대하여 법정대리인이 오류 의 정정을 요구하는 경우 그 오류를 정정할 때까지 해당 개인정보의 이용 및 제공을 금지합니다.<br><br>

				<h2>13. 광고성 정보 전송의 제한</h2>
				(유)나이키코리아는 회원의 명시적인 수신거부 의사에 반하여 리목적의 광고성 정보를 전송하 지 않습니다.<br>
				회원이 뉴스레터 등 전자우편 전송에 대한 동의를 한 경우 전자우편의 제목란 및 본문란에 다음 사항과 같이 회원이 쉽게 알아 볼 수 있도록 조치합니다.<br>
				① 전자우편의 제목란 : (광고)라는 문구를 제목에 표시하고, 전자우편 본문란의 주요 내용을 표 시합니다.<br>
				② 전자우편의 본문란 : 수신거부의 의사표시를 할 수 있는 전송자의 명칭, 전자우편주소, 전화번 호 및 주소를 명시하며 수신 거부의 의사를 쉽게 표시할 수 있는 방법 및 회원이 동의를 한 시기 및 내용을 명시합니다.<br>
				③ 팩스, 휴대폰 문자전송 등 전자우편 이외의 문자전송을 통해 리목적의 광고성 정보를 전송하 는 경우에는 전송내용 처음에 (광고)라는 문구를 표기하고 전송내용 중에 전송자의 연락처를 명 시하도록 조치합니다.<br>
				④ 회원은 리목적의 광고성 정보를 전송 받은 경우 언제든지 이에 대해 수신거부의 의사표시를 할 수 있고, (유)나이키코리아는 즉각 전송중단의 조치를 취한 후 이를 회원에게 알립니다.<br><br>

				<h2>14. 도용된 개인정보에 대한 조치</h2>
				이용자가 타인의 개인정보를 도용하여 회원가입 등을 하음을 알게 된 때에는 지체 없이 해당 아 이디에 대한 서비스 이용정지 또는 회원탈퇴 등 필요한 조치를 취합니다.<br>
				자신의 개인정보 도용을 인지한 이용자가 해당 아이디에 대해 서비스 이용정지 또는 회원탈퇴를 요구하는 경우에는 즉시 조치를 취합니다.<br>
				※ 이때 개인정보가 도용됨을 주장하는 이용자의 본인 확인방법으로는 전자정부에서 시행하는 주 민등록증 진위확인 서비스를 이용합니다.<br>
				기타 개인정보에 관한 상담이 필요한 경우에는 개인정보침해신고센터, 대검찰청 인터넷범죄수사 센터, 경찰청 사이버테러대응센터 등으로 문의하실 수 있습니다.<br>
				① 개인정보침해신고센터<br>
				- 전화 : 118<br>
				- URL : http://privacy.kisa.or.kr<br>
				② 개인정보 분쟁조정위원회<br>
				전화: 1833 – 6972<br>
				URL : http://www.kopico.go.kr<br>
				③ 대검찰청 사이버안전국<br>
				- 전화 : 국번없이 1301<br>
				- URL : http://www.spo.go.kr<br>
				④ 경찰청 사이버안전국<br>
				- 전화 : 국번없이 182<br>
				- URL : http://cyberbureau.police.go.kr<br><br>

				<h2>15. 개인정보 보호를 위한 기술적, 관리적 보호대책</h2>
				(유)나이키코리아는 이용자들의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조 또 는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적/관리적 보호대책을 강구하고 있습 니다.<br>
				① 내부관리계획 수립∙시행<br>
				(유)나이키코리아는 개인정보의 분실도난유출위조변조 또는 훼손되지 아니하도록 내부 의사결정 절차를 통하여 내부 관리계획을 수립시행하고 있습니다.<br>
				②개인정보의 암호화<br>
				이용자의 비번호는 일방향 암호화하여 저장 및 관리되고 있으며, 개인정보의 확인 및 변경은 비 번호를 알고 있는 본인에 의해서만 가능합니다. 비번호는 이용자의 생일, 전화번호 등 타인이 추측하기 쉬운 숫자 등을 이용하지 않도록 비번호 생성규칙을 수립하여 적용하고 있습니다. 개 인정보는 안전한 암호 알고리즘으로 암호화되어 저장 및 관리되고 있습니다.<br>
				③해킹 등에 대비한 대책<br>
				(유)나이키코리아는 해킹 등 회사 정보통신망 침입에 의해 이용자의 개인정보가 유출되는 것을 방지하기 네트워크 관련 보안 장비 등을 운하고 있으며, 개인정보는 암호화 통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다.<br>
				④개인정보 취급자의 최소화 및 교육<br>
				(유)나이키코리아는 회사의 개인정보 취급자를 최소한으로 제한하며, 개인정보 취급자에 대한 교 육 등 관리적 조치를 통해 개인정보보호의 중요성을 인식시키고 있습니다.<br>
				⑤접근통제<br>
				개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정 보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터 의 무단 접근을 통제하고 있습니다.<br>
				⑥물리적 안전조치<br>
				(유)나이키코리아는 전산실, 자료보관실 등 개인정보를 보관하고 있는 물리적 보관 장소를 별도 로 두고 있으며, 이에 대한 출입통제 절차를 수립∙운하고 있습니다.
				(유)나이키코리아는 이용자 개인의 실수나 기본적인 인터넷의 위험성 때문에 일어나는 일들에 대 해 책임을 지지 않습니다. (유)나이키코리아는 회원 개개인이 본인의 개인정보를 보호하기 위해 서 자신의 ID 와 비번호를 적절하게 관리하고 여기에 대한 책임을 져야 합니다.<br>
				그 외 내부 관리자의 실수나 기술관리 상의 사고로 인해 개인정보의 상실, 유출, 변조, 훼손이 유 발될 경우 (유)나이키코리아는 즉각 회원께 사실을 알리고 적절한 대책과 보상을 강구할 것입니다.<br>

				16. 상정보처리기기 운, 관리 방침<br>
				① (유)나이키코리아는 아래와 같이 상정보처리기기를 설치,운하고 있습니다.<br>
				1. 상정보처리기기 설치 근거 및 목적 : (유)나이키코리아의 시설안전․화재예방<br>
				2. 설치 대수, 설치 위치, 촬 범위 : 건물 30,31,33층 내 32대 설치, 촬범위는 주요시설물의 전 공간을 촬<br>
				3. 관리책임자, 담당부서 및 상정보에 대한 접근권한자 : HR팀 정해 부장 02-2006-5713<br>
				4. 상정보 촬시간, 보관기간, 보관장소, 처리방법<br>
				- 촬시간 : 24시간 촬영<br>
				- 보관기간 : 촬시부터 30일<br>
				- 보관장소 및 처리방법 : 각 층 내 서버실에 보관 및 처리<br>
				5. 상정보 확인 방법 및 장소 : 관리책임자에 요구 (HR팀)<br>
				6. 정보주체의 상정보 열람 등 요구에 대한 조치 : 개인상정보 열람, 존재확인 청구서로 신청 하여야 하며, 정보주체 자신이 촬된 경우 또는 명백히 정보주체의 생명, 신체, 재산 이익을 위해 필요한 경우에 한해 열람을 허용함<br>
				7. 상정보 보호를 위한 기술적, 관리적, 물리적 조치 : 내부관리계획 수립, 접근통제 및 접근권 한 제한, 상정보의 안전한 저장․전송기술 적용, 처리기록 보관 및 위․변조 방지조치, 보관시설 마련 및 잠금장치 설치 등<br>

				<h2>17. 나이키코리아 개인정보보호책임자</h2>
				(유)나이키코리아의 개인 정보는 다음의 담당자가 책임을 맡고 있습니다.<br><br>
				<table>
					<thead>
						<tr>
							<th scope="col">담당자 성명</th>
							<th scope="col">부서명</th>
							<th scope="col">전화번호</th>
							<th scope="col">E-Mail</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>서준우</td>
							<td>NIKE KOREA DDC</td>
							<td>02-2006-5793</td>
							<td>Matthew.Seo@nike.com</td>
						</tr>
					</tbody>
				</table><br><br>

				<h2>18. 개인정보처리방침변경</h2>
				현 개인정보 처리방침은 2018년 9월 16일부터 적용됩니다. 내용의 추가, 삭제 및 수정이 있을 시에는 개정 최소 7일전(중요한 사항이 변경되는 경우는 최소 30일전)부터 웹사이트의 공지사항 을 통하여 고지할 것입니다. 만일, 개인정보의 수집 및 활용, 제3자 제공 등이 변경되어 동의가 필 요한 경우에는, 별도 동의 절차를 마련하여 진행할 것입니다. 또한 개인정보보호정책에 버전번호 및 개정일자 등을 부여하여 개정여부를 쉽게 알 수 있도록 하고 있습니다.<br><br>

				개인정보처리방침 버전번호 : v.1.5<br>
				개인정보처리방침 변경공고일자 : 2018-08-17<br>
				변경 개인정보처리방침 시행일자 : 2018-09-16<br>
				<!-- 수정 -->
				</div>
				<div class="checkbox-area">
					<input type="checkbox" id="collectAgree">
					<label for="collectAgree"><img src="<?=$url?>images/img_admin_pop_bottom.png" alt="이벤트 참여를 위한 상기내용에 동의합니다."></label>
				</div>
				<button type="button" class="btn-close">닫기</button>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
$(function(){
	$('#collectAgree').on('change', function(){
		if(this.checked){
			$('.chk').find('.collect_agree').addClass('on');
		} else {
			$('.chk').find('.collect_agree').removeClass('on');
		}
	});
});
</script>
<!-- //팝업 - 개인정보 약관 동의 -->

<script>
	// 우편번호 찾기 화면을 넣을 element
	var load = false;
    var element_layer = document.getElementById('layer');

    // function closeDaumPostcode() {
    //     // iframe을 넣은 element를 안보이게 한다.
    //     $('#address_popup').hide();
	// }
	
	// function mydaum(){
	// 	daum.postcode.load(function(){
	// 		new daum.Postcode({
	// 			oncomplete: function(data) {
	// 				$('#address1').val(data.roadAddress);

	// 				$('#address_popup').hide();
	// 			},
	// 			width : '100%',
    //         	height : '100%',
    //         	maxSuggestItems : 5
	// 		}).embed(element_layer);
	// 	});
	// 	$('#address_popup').show();

	// 	initLayerPosition();
	// }

	// function initLayerPosition(){
    //     var width = 300; //우편번호서비스가 들어갈 element의 width
    //     var height = 400; //우편번호서비스가 들어갈 element의 height
    //     var borderWidth = 5; //샘플에서 사용하는 border의 두께

    //     // 위에서 선언한 값들을 실제 element에 넣는다.
    //     element_layer.style.width = width + 'px';
    //     element_layer.style.height = height + 'px';
    //     element_layer.style.border = borderWidth + 'px solid';
    //     // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
    //     //element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
    //     //element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
    // }

	$('#nike_id').blur(function(){
		if(load) return;
		$('#insta_id').focus();
		var nike_id = $('#nike_id').val();
		if(nike_id == '' || nike_id == undefined)
			return;

		$.ajax({
			type: "POST",
			url: './check_user_nike.php',
			data: {'nike_id': nike_id},
			success: function(data) {
				if(data == '' || data == undefined)
					return;
					
				var result = confirm('참여하신 이력이 있습니다. 기존 정보를 불러올까요?');

				if(!result)
					return;

				var parse = jQuery.parseJSON( data );
				console.log(parse);
				$('#my_id').val(parse['id']);
				$('#nike_id').val(parse['nike_id']);
				$('#insta_id').val(parse['insta_id']);
				$('#phone').val(parse['phone']);
				$('.chk').find('.collect_agree').addClass('on');
				$("#collectAgree").prop("checked", 1);
				$("#smsAgree").prop("checked", parseInt(parse['sms']));
				//$('#address1').val(parse['address1']);
				//$('#address2').val(parse['address2']);

				load = true;
		  },
		  error: function(data) {
		  }
		});
	});

	jQuery(document).on("click", ".ft-drukwide", function(){
		var my_id = $('#my_id').val().trim();
		var nike_id = $('#nike_id').val().trim();
		var insta_id = $('#insta_id').val().trim();
		var phone = $('#phone').val().trim();
		var sms = $("#smsAgree").prop("checked");
		var collect = $("#collectAgree").prop("checked");
		var address1 = '';
		var address2 = '';

		if(collect == false){
			alert("개인정보 수집에 동의하세요");
			return false;
		}

		if(sms == true) sms = 1;
		else sms = 0;

		if(nike_id == ""){
			alert("나이키닷컴 아이디를 입력하세요");
			return false;
		}

		// var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
		// if(exptext.test(nike_id)==false){
		// 	alert("나이키닷컴 아이디 이메일 형식이 올바르지 않습니다.");
		// 	return false;
		// }

		if(insta_id == ""){
			alert("인스타그램 ID를 입력하세요");
			return false;
		}

		var phoneNumberRegex = /^[0-9]{3}[0-9]{3,}[0-9]{4}$/;
		if(!phoneNumberRegex.test(phone)) {
			alert("휴대폰 번호를 입력해주세요");
			return false;
		}

		// if(address1 == ""){
		// 	alert("주소를 입력하세요");
		// 	return false;
		// }

		// if(address2 == ""){
		// 	alert("상세주소를 입력하세요");
		// 	return false;
		// }
		
		var url = "/update_user.php";
		var data = {
			"my_id": my_id,
			"nike_id" : nike_id
			, "insta_id" : insta_id
			, "phone" : phone
			, "address1" : address1
			, "address2" : address2
			, "sms" : sms
		};
		
		scriptUtil.ajaxCallBack(url, "POST", data, "html", function(data){
			$.redirect('/custom_main.php', {'nike_id': nike_id});
		}, function(data){
		});

	});
</script>

</body>
</html>