import { SceneManager } from './SceneManager.js';
import { ModelManager } from './ModelManager.js';
import { VIEW } from './SceneManager.js';
// 터치 마우스 락
function TouchLock() {
    ModelManager.Instance.Lock();
}
// 터치 마우스 락풀음
function TouchUnLock() {
    ModelManager.Instance.UnLock();
}
//layerCloseCrack();
document.addEventListener("keydown", onDocumentKeyDown, false);
function layerCloseCrack() {
    $('.layer').find('.layer-close-crack').on('click', function () {
        $(this).closest('.layer').fadeOut(300);
    });
    let f = function controlOpen(obj) {
        console.log("call:" + obj);
        $(obj).addClass('complete');
    };
    ModelManager.Instance.SetFunction(f);
}
function SaveImage() {
    var fname = '';
    $.ajax({
        method: 'POST',
        async: false,
        url: 'photo_upload.php',
        data: {
            photo: ModelManager.Instance.SaveImage()
        },
        success: function (data) {
            fname = data.result;
            sessionStorage.setItem("my_image", fname); //이미지명 저장
            //console.log('save image name to session : ' + sessionStorage.getItem("my_image"));
        }
    });
    return fname;
}
//Here's PHP script:
//photo_upload.php
// <?php
//     $data = $_POST['photo'];
//     list($type, $data) = explode(';', $data);
//     list(, $data)      = explode(',', $data);
//     $data = base64_decode($data);
//     mkdir($_SERVER['DOCUMENT_ROOT'] . "/photos");
//     file_put_contents($_SERVER['DOCUMENT_ROOT'] . "/photos/".time().'.png', $data);
//     die;
// ?>
window.addEventListener('load', () => { SceneManager.Instance.OnClickStart(); SceneManager.Instance.Init(); });
///////////////
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    switch (keyCode) {
        case 49: // 1
            SceneManager.Instance.SetView(VIEW.MAIN_VIEW);
            break;
        case 50: // 2
            SceneManager.Instance.SetView(VIEW.CUSTOM_VIEW);
            break;
        case 51: // 3
            SceneManager.Instance.SetView(VIEW.BADGE_VIEW); //
            break;
        case 52: // 4
            SceneManager.Instance.SetView(VIEW.LINE_VIEW); // 끈
            break;
        case 53: // 5
            SceneManager.Instance.SetView(VIEW.LABEL_VIEW);
            break;
        case 54: // 6
            SceneManager.Instance.SetView(VIEW.BACKGROUND_VIEW);
            break;
        case 55: // 7
            SceneManager.Instance.SetView(VIEW.TEXTINPUT_VIEW);
            SceneManager.Instance.OnClick();
            break;
        case 56: // 8
            break;
        case 57: // 9
            break;
        case 48: // 0
            break;
    }
}
function GoView(Idx) {
    switch (Idx) {
        case 0:
            // 커스텀 화면으로 가기
            SceneManager.Instance.SetView(VIEW.CUSTOM_VIEW);
            break;
        case 1:
            // 뱃지 화면으로 가기
            SceneManager.Instance.SetView(VIEW.BADGE_VIEW);
            break;
        case 2:
            // 끈 화면으로 가기
            SceneManager.Instance.SetView(VIEW.LINE_VIEW);
            break;
        case 3:
            // 라벨 하면으로 가기
            SceneManager.Instance.SetView(VIEW.LABEL_VIEW);
            break;
        case 4:
            // 배경 화면 변경 으로 가기
            SceneManager.Instance.SetView(VIEW.BACKGROUND_VIEW);
            break;
        case 5:
            // // 텍스트 입력으로 가기
            SceneManager.Instance.SetView(VIEW.TEXTINPUT_VIEW);
            // 화면 저장
            // SceneManager.Instance.OnClick();
            break;
        case 6:
            // 파일 서버에 올리기
            break;
        // case 49: // 1
        // SceneManager.Instance.SetView(VIEW.MAIN_VIEW);
        // break;
        // case 50: // 2
    }
}
// $(function () {
//     var winH = $(window).height();
//     $('#wrap').css('height', winH);
//     //Information 닫기
//     $('.btn-info-close').on('click', function () {
//         $(this).closest('.step-contents').removeClass('info').addClass('on');
//         //가이드 레이어 오픈
//         if ($(this).closest('.step-contents').find('.guide').length > 0) {
//             $(this).closest('.step-contents').find('.guide').fadeIn(300, function () {
//                 $(this).delay(3000).fadeOut(300);
//             });
//         }
//     });
//     //Next 클릭
//     $('.btn-next').on('click', function (e) {
// 		var step = $(this).data('step');
// 		//메인으로 돌아가기
// 		if(step == 'go_main') {
// 			location.replace('custom.html');
// 			return false;
// 		}
//         var Idx = $(this).closest('.step-contents').index();
// 		var rv = true;
// 		//all for 메시지 체크
// 		if(step == 'check_msg') {
// 			rv = checkMessage();
// 			if(rv==false) {
// 				e.stopPropagation();
// 				return false;
// 			}
// 		}
// 		//인스타아이디, 연락처 체크
// 		if(step == 'check_input') {
// 			rv = checkInput();
// 			if(rv==false) {
// 				e.stopPropagation();
// 				return false;
// 			}
// 			console.log('1111');
// 		}
// 		if(rv==true) {
// 			console.log('2222');
// 			if ($('.step-contents').eq(Idx + 1).find('.popup-info').length > 0) {
// 				//안내 팝업이 있을 경우
// 				$('.step-contents').removeClass('on').eq(Idx + 1).addClass('info');
// 			}
// 			else {
// 				//안내 팝업이 없을 경우
// 				$('.step-contents').removeClass('on').eq(Idx + 1).addClass('on');
// 			}
// 	        GoView(Idx + 1);
// 		}
//         console.log('step' + (Idx + 2)); //현재 스텝
//     });
//     //Back 클릭
//     $('.btn-back').on('click', function () {
//         var Idx = $('.step-contents.on').index();
//         $('.step-contents').removeClass('on').eq(Idx - 1).addClass('on');
//         GoView(Idx - 1);
//     });
//     //개인정보 보호 팝업 체크 이벤트
//     $('.popup2 .input-checkbox input').on('change', function () {
//         if ($(this).is(':checked')) {
//             $('.stage-insert .fake-checkbox').addClass('on');
//             $('.popup2').fadeOut(300);
//         }
//         else {
//             $('.stage-insert .fake-checkbox').removeClass('on');
//         }
//     });
// 	//다시 만들기
// 	$('.btn-return').on('click', function () {
// 		$('#msg').val('');
// 		$('#insta_id').val('');
// 		$('#contact').val('');
// 		$('#chk1').removeClass('on');
// 		sessionStorage.removeItem("my_image");
// 		//step 1 으로 이동
// 		$('.step-contents').removeClass('on complete');
//         $('.step-contents.step1').addClass('on');
//         GoView(0);
// 	});
// 	$('.btn-hashtag').on('click', function () {
// 		var t = document.createElement("textarea");
// 		document.body.appendChild(t);
// 		t.value = '#AIRFORCE1 #ALLFOR1 #AF1PARANOISEBYYOU';
// 		t.select();
// 		document.execCommand('copy');
// 		document.body.removeChild(t);
// 		alert('해쉬태그를 복사했습니다.');
// 	});
// 	$('.btn-download').on('click', function () {
// 		var img = sessionStorage.getItem("my_image");
// 		window.open(img);
// 	});
// });
// var accessToken = '';
// function getToken() {
// 	$.ajax({
// 		url: 'https://nike-api.toogoof.net/o/token/',
// 		type: 'post',
// 		dataType: 'json',
// 		data: JSON.stringify({
// 		  client_id: 'pSvD5XOOvBy1rNdfAldIkij0c1MAirYtGrRLjfW9',
// 		  client_secret: 'FzUiBbskysmyFjHDYEGI9evMWHXMpnplhp3gB4Edfv9e5oEoiNTtP3Z1GSoSQ96ezUfPziLt3bMJKORomJEsedAcdjHdhDNdpVzS8RjZ098IhYJHrFAuzxQZomxcgjP1',
// 		  grant_type: 'password',
// 		  username: 'admin',
// 		  password: 'admin'
// 		}),
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json'
// 		},
// 		success: function(data) {
// 			accessToken = data.access_token;
// 			sessionStorage.setItem("access_token", accessToken);
// 		}
// 	});
// }
// //all for 메시지 체크
// function checkMessage() {
// 	var msg = $.trim($('#msg').val());
// 	if(msg=='') {
// 		alert('메시지를 입력해주세요.');
// 		$('#msg').focus();
// 		return false;
// 	}
// 	var rv = false;
// 	rv = checkWord(msg);
// 	if(!rv) {
// 		return false;
// 	}
// 	$.ajax({
// 		url		: 'check_message.php',
// 		type	: 'post',
// 		async	: false,
// 		data	: {msg : msg},
// 		success: function(data) {
// 			if(data.result != 'Y') {
// 				alert('금지 단어가 포함되어 있습니다. 다른 내용을 입력해주세요.');
// 				$('#msg').val('');
// 				$('#msg').focus();
// 				rv = false;
// 			} else {
// 				rv = true;
// 			}
// 		}
// 	});
// 	return rv;
// }
// //인스타ID, 연락처 체크
// function checkInput() {
// 	var msg			= $.trim($('#msg').val());
// 	var insta_id	= $.trim($('#insta_id').val());
// 	var contact		= $.trim($('#contact').val());
// 	var agree1		= 'false';
// 	var agree2		= 'false';
// 	if(insta_id=='') {
// 		alert('인스타그램 ID를 입력해주세요.');
// 		$('#insta_id').focus();
// 		return false;
// 	}
// 	if(!checkInstaId(insta_id)) {
// 		return false;
// 	}
// 	if(contact=='') {
// 		alert('연락처를 입력해주세요.');
// 		$('#contact').focus();
// 		return false;
// 	}
// 	if(!checkContact(contact)) {
// 		return false;
// 	}
// 	if($('#chk1').hasClass('on')==false) {
// 		alert('이벤트 안내를 위한 개인정보 수집에 동의해주세요.');
// 		return false
// 	} else {
// 		agree1 = 'true';
// 	}
// 	if( $("input[id=chk2]:checkbox:checked").length > 0 ) {
// 		agree2 = 'true';
// 	}
// 	//이미지 업로드
// 	SaveImage();
// 	var form = new FormData();
// 	form.append("text",					msg);
// 	form.append("instagram_id",			insta_id);
// 	form.append("phone_number",			contact);
// 	form.append("original_image",		dataURItoBlob(ModelManager.Instance.SaveImage()));
// 	form.append("personal_info_agreed", agree1);
// 	form.append("text_agreed",			agree2);
// 	var rv = false;
// 	$.ajax({
// 		url: 'https://nike-api.toogoof.net/applications/',
// 		type: "POST",
// 		async: false,
// 		crossDomain: true,
// 		mimeType: "multipart/form-data",
// 		headers: {
// 			"Accept": "application/json",
// 			"Authorization": "Bearer " + sessionStorage.getItem("access_token"),
// 			"Host": "nike-api.toogoof.net",
// 			"Accept-Encoding": "gzip, deflate",
// 			"Connection": "keep-alive"
// 		},
// 		data: form,
// 		processData: false,
// 		contentType: false,
// 		cache: false,
// 		timeout: 600000,
// 		success: function (data) {
// 			var message = data.message || '';
// 			if(message != '') {
// 				alert(message);
// 				//rv = false;
// 				return false;
// 			} else {
// 				rv = true;
// 				return true;
// 			}
// 		},
// 		error: function (request, status, error) {
// 			var obj = $.parseJSON(request.responseText);
// 			var msg = obj.message;
// 			alert(msg);
// 			console.log("ERROR : ", msg);
// 		}
// 	});
// 	return rv;
// }
// function dataURItoBlob(dataURI) {
// 	var byteString = atob(dataURI.split(',')[1]);
// 	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
// 	var ab = new ArrayBuffer(byteString.length);
// 	var ia = new Uint8Array(ab);
// 	for (var i = 0; i < byteString.length; i++) {
// 		ia[i] = byteString.charCodeAt(i);
// 	}
// 	return new Blob([ab], {type: mimeString});			
// }
// function checkWord(str) {
// 	var pattern_num = /[0-9]/;	// 숫자 
// 	var pattern_eng = /[a-zA-Z]/;	// 문자 
// 	var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
// 	var pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
// 	if( (pattern_num.test(str)) || (pattern_spc.test(str)) ) {
// 		alert("영문 또는 한글만 입력해주세요.");
// 		$('#msg').val('');
// 		$('#msg').focus();
// 		return false;
// 	} else if( (pattern_eng.test(str)) && (pattern_kor.test(str)) ) {
// 		alert("한영 혼용은 불가합니다.");
// 		$('#msg').val('');
// 		$('#msg').focus();
// 		return false;
// 	} else if( pattern_eng.test(str) ) {
// 		if(str.length > 8) {
// 			alert('영문은 8 글자만 입력 가능합니다.');
// 			$('#msg').focus();
// 			return false;
// 		} else {
// 			return true;
// 		}
// 	} else if( pattern_kor.test(str) ) {
// 		if(str.length > 5) {
// 			alert('한글은 5 글자만 입력 가능합니다.');
// 			$('#msg').focus();
// 			return false;
// 		} else {
// 			return true;
// 		}
// 	} else {
// 		alert("영문(8자 이내) 또는 한글(5자 이내)만 입력해주세요.");
// 		$('#msg').val('');
// 		$('#msg').focus();
// 		return false;
// 	}
// }
// function checkInstaId(str) {
// 	var pattern_num = /[0-9]/;	// 숫자 
// 	var pattern_eng = /[a-zA-Z]/;	// 문자 
// 	var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
// 	var pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
// 	if( (pattern_kor.test(str)) || (pattern_spc.test(str))  ) {
// 		alert("인스타그램ID를 확인해주세요.");
// 		$('#insta_id').val('');
// 		$('#insta_id').focus();
// 		return false;
// 	}
// 	return true;
// }
// function checkContact(str) {
// 	var pattern_num = /[0-9]/;	// 숫자 
// 	if( !(pattern_num.test(str)) ) {
// 		alert("연락처는 숫자만 입력해주세요.");
// 		$('#contact').val('');
// 		$('#contact').focus();
// 		return false;
// 	}
// 	return true;
// }
//
