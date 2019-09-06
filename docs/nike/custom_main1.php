<?php
	$nike_id = $_REQUEST['nike_id'];
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
<meta property="og:image" content="images/og.jpg"><!-- 수정 -->
<title>AF1 DIY STUDIO</title>
<link rel="stylesheet" type="text/css" href="<?=$url?>css/reset.css"/>
<link rel="stylesheet" type="text/css" href="<?=$url?>css/jquery.minicolors.css"/>
<link rel="stylesheet" type="text/css" href="<?=$url?>css/jquery.scrollbar.css"/>
<link rel="stylesheet" type="text/css" href="<?=$url?>css/common.css"/>
<script type="text/javascript" src="<?=$url?>js/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="<?=$url?>js/jquery.bxslider.min.js"></script>
<script type="text/javascript" src="<?=$url?>js/jquery.minicolors.min.js"></script>
<script type="text/javascript" src="<?=$url?>js/common.js"></script>
<script type="text/javascript" src="<?=$url?>js/util.js"></script>
<script type="text/javascript" src="<?=$url?>js/jquery.redirect.js"></script>
<script type="text/javascript" src="<?=$url?>js/jquery.scrollbar.min.js"></script>

<script type="text/javascript" src="<?=$url?>js/three.min.js"></script>
<script type="text/javascript" src="<?=$url?>js/libs/inflate.min.js"></script>
<script type="text/javascript" src="<?=$url?>js/loaders/TGALoader.js"></script>
<script type="text/javascript" src="<?=$url?>js/loaders/FBXLoader.js"></script>
<script type="text/javascript" src="<?=$url?>js/controls/OrbitControls.js"></script>
<script type="text/javascript" src="<?=$url?>js/Detector.js"></script>
<script type="text/javascript" src="<?=$url?>js/libs/stats.min.js"></script>
<script type="text/javascript" src="<?=$url?>js/ui/three-ui.min.js"></script>
<script type="text/javascript" src="<?=$url?>js/ui/asset-loader.min.js"></script>

<script type="text/javascript" src="https://cdn.rawgit.com/alexgibson/shake.js/master/shake.js"></script>

</head>
<body>

<!-- 로딩 -->
<div class="loading">
	<p><img src="<?=$url?>images/txt_loading.png" alt="Loading"></p>
</div>
<!-- //로딩 -->

<div id="wrap">

	<!-- Header -->
	<div id="header">
		<h1><a href="./index.php"><img src="<?=$url?>images/logo.png" alt="AF1 DIY STUDIO"></a></h1>
		<a href="javascript:resert_view();" class="btn_target">센터</a><!-- 수정 -->
		<a href="javascript:popOpen('.pop-kit');" class="btn_infomation">소개</a>
	</div>
	<!-- //Header -->

	<!-- Container -->
	<div id="container">
		<h2 class="blind">본문 내용</h2>

		<!-- Canvas -->
		<div class="canvas-wrp">
		</div>
		<!-- //Canvas -->


		<div class="ready" style="display:none">
			<div class="section">
				<div class="txt">
					<img src="<?=$url?>images/img_part_ready.png" alt="">
				</div>
			</div>
		</div>

		<div class="custom" style="display:none">
			<div class="section">
				<p class="info_txt1"><img src="<?=$url?>images/img_custom_txt1.png" alt=""></p>
				
				<div class="custom_wrp">
					<div class="custom_menu">
						<ul>
							<li class="menu menu1"><a href="javascript:customLayerOpen('.custom_color');"><img src="<?=$url?>images/custom_main1.png" alt="Color"></a></li>
							<li class="menu menu2"><!-- 해당 커스텀 메뉴 비활성화 시 disabled 추가 -->
								<a href="javascript:customLayerOpen('.custom_pattern');">
									<img src="<?=$url?>images/custom_main2.png" alt="Pattern">
								</a>
							</li>
							<li class="menu menu3">
								<a href="javascript:customLayerOpen('.custom_graphic');">
									<img src="<?=$url?>images/custom_main3.png" alt="Graphic">
								</a>
							</li>
							<li class="menu menu4">
								<a href="javascript:customLayerOpen('.custom_texture');$('.custom_texture').find('.custom_txt').focus();">
									<img src="<?=$url?>images/custom_main4.png" alt="Texture">
								</a>
							</li>
						</ul>
					</div>
				</div>
				<a href="javascript:complete()" class="btn complete">
					<img src="<?=$url?>images/btn_custom.png" alt="start">
					<img src="<?=$url?>images/btn_custom_on.png" class="btn-hover" alt="커스텀 끝내기"><!-- 수정 -->
				</a>
			</div>
		</div>

		<div class="capture" id="capture1" style="display:none">		
			<div class="section">
				<div class="table">
					<p><img src="<?=$url?>images/img_capture_top.png" alt=""></p>
					<!-- Canvas -->
					<div class="pic">
					</div>
					<!-- //Canvas -->
					<input class="slider" value="0" type="range">
				</div>

				<img id="bg1" style="display:none" src="images/bg1.png" alt="">
				<img id="bg2" style="display:none" src="images/bg2.png" alt="">

				<div class="btn_wrp">
					<a href="javascript:capture()" class="btn">
						<img src="<?=$url?>images/btn_capture1.png" alt="캡쳐하기">
						<img src="<?=$url?>images/btn_capture1_on.png" class="btn-hover" alt="캡쳐하기"><!-- 수정 -->
					</a>
					<a href="javascript:uncomplete()" class="btn">
						<img src="<?=$url?>images/btn_capture2.png" alt="다시하기">
						<img src="<?=$url?>images/btn_capture2_on.png" class="btn-hover" alt="다시하기"><!-- 수정 -->
					</a>
				</div>
			</div>
		</div>

		<div class="capture" id="capture2" style="display:none">
			<div class="section">
				<p><img src="<?=$url?>images/img_capture_top2.png" alt=""></p>

				<div class="pic">
					<img id="canvasImg1" src="" alt="">
				</div>

				<div class="btn_wrp">
					<a href="javascript:capture_confirm()" class="btn">
						<img src="<?=$url?>images/btn_capture2_1.png" alt="예">
						<img src="<?=$url?>images/btn_capture2_1_on.png" class="btn-hover" alt="예"><!-- 수정 -->
					</a>
					<a href="javascript:capture_cancel()" class="btn">
						<img src="<?=$url?>images/btn_capture2_2.png" alt="아니오">
						<img src="<?=$url?>images/btn_capture2_2_on.png" class="btn-hover" alt="아니오"><!-- 수정 -->
					</a>
				</div>
			</div>
		</div>

		<div class="share" style="display:none">
			<div class="section">
				<div class="table">
					<div class="pic">
						<img id="canvasImg2" src="" alt="">
					</div>
					<p><img src="<?=$url?>images/img_share_top.png" alt=""></p>
				</div>
				<a href="#" id="copy-url" class="btn">
					<img src="<?=$url?>images/btn_share1.png" alt="해시태그 복사하기">
					<img src="<?=$url?>images/btn_share1_on.png" class="btn-hover" alt="해시태그 복사하기"><!-- 수정 -->
				</a>
				<a href="#" id="save" class="btn">
					<img src="<?=$url?>images/btn_share2.png" alt="이미지 완료">
					<img src="<?=$url?>images/btn_share2_on.png" class="btn-hover" alt="이미지 완료"><!-- 수정 -->
				</a>
				<a href="./index.php" class="btn_back"><img src="<?=$url?>images/btn_share3.png" alt="back to home"></a>
				
				<a>
					<input  style="position:absolute; top:0; left:0; width:1px; height:1px; margin:0; padding:0; border:0;"
					id="textbox-url" value="#BATTLEFORCESEOUL #AF1ARTBATTLE " readonly/>
				</a>
			</div>
		</div>

	</div>
	<!-- //Container -->

</div>

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

<!-- 적용가능 부분 레이어 -->
<div class="layer-disabled">
	<div class="info_layer">
		<div class="table">
			<div class="pic">
				<img src="<?=$url?>images/img_custom_info1.png" alt=""><!-- 수정 -->
			</div>
		</div>
	</div>

	<div class="info_layer">
		<div class="table">
			<div class="pic">
				<img src="<?=$url?>images/img_custom_info2.png" alt=""><!-- 수정 -->
			</div>
		</div>
	</div>

	<div class="info_layer">
		<div class="table">
			<div class="pic">
				<img src="<?=$url?>images/img_custom_info3.png" alt=""><!-- 수정 -->
			</div>
		</div>
	</div>
</div>
<!-- //적용가능 부분 레이어 -->

<!-- 레이어 - 컬러선택 -->
<div class="layer custom_color">
	<button type="button" class="btn_close">닫기</button>
	<input type="text" id="colorpic">
</div>
<!-- //레이어 -->

<!-- 레이어 - 재질선택 -->
<div class="layer custom_pattern">
	<button type="button" class="btn_close">닫기</button>
	<div class="slide_wrp">
		<ul>
			<li class="mylist"><a href="#"><img src="<?=$url?>images/btn_none.png" alt=""></a></li>
			<li class="mylist"><a href="#"><img src="<?=$url?>images/pattern/pattern1.png" alt=""></a></li>
			<li class="mylist"><a href="#"><img src="<?=$url?>images/pattern/pattern2.png" alt=""></a></li>
			<li class="mylist"><a href="#"><img src="<?=$url?>images/pattern/pattern3.png" alt=""></a></li>
			<li class="mylist"><a href="#"><img src="<?=$url?>images/pattern/pattern4.png" alt=""></a></li>
			<li class="mylist"><a href="#"><img src="<?=$url?>images/pattern/pattern5.png" alt=""></a></li>
			<li class="mylist"><a href="#"><img src="<?=$url?>images/pattern/pattern6.png" alt=""></a></li>
			<li class="mylist"><a href="#"><img src="<?=$url?>images/pattern/pattern7.png" alt=""></a></li>
			<li class="mylist"><a href="#"><img src="<?=$url?>images/pattern/pattern8.png" alt=""></a></li>
			<li class="mylist"><a href="#"><img src="<?=$url?>images/pattern/pattern9.png" alt=""></a></li>
			<li class="mylist"><a href="#"><img src="<?=$url?>images/pattern/pattern10.png" alt=""></a></li>
			<li class="mylist"><a href="#"><img src="<?=$url?>images/pattern/pattern11.png" alt=""></a></li>
			<li class="mylist"><a href="#"><img src="<?=$url?>images/pattern/pattern12.png" alt=""></a></li>
			<li class="mylist"><a href="#"><img src="<?=$url?>images/pattern/pattern13.png" alt=""></a></li>
			<li class="mylist"><a href="#"><img src="<?=$url?>images/pattern/pattern14.png" alt=""></a></li>
			<li class="mylist"><a href="#"><img src="<?=$url?>images/pattern/pattern15.png" alt=""></a></li>
		</ul>
	</div>
</div>
<!-- //레이어 -->

<!-- 레이어 - 패턴선택 -->
<div class="layer custom_graphic">
	<button type="button" class="btn_close">닫기</button>
	<div class="slide_wrp">
		<ul>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/btn_none.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic1.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic2.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic3.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic4.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic5.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic6.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic7.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic8.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic9.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic10.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic11.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic12.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic13.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic14.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic15.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic16.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic17.png" alt=""></a></li>
			<li class="mygraphic"><a href="#"><img src="<?=$url?>images/graphic/graphic18.png" alt=""></a></li>
		</ul>
	</div>
</div>
<!-- //레이어 -->

<!-- 레이어 - 텍스트 -->
<div class="layer custom_texture">
	<button type="button" class="btn_close">닫기</button>
	<div class="txt_wrp">
		<input type="text" class="custom_txt" value="" id="myTextarea" onkeyup="len_chk()"><!-- 수정 -->
		<img src="<?=$url?>images/img_custom_txt.png" alt="">
	</div>
</div>
<!-- //레이어 -->

<script>

var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);

var container, stats, controls, ui, mytext;
var camera, scene, renderer, light1, light2;

var clock = new THREE.Clock();

var mixers = [];

var myobject;

var raycaster;
var mouse = new THREE.Vector2();
var myTarget = null;
var myText = null;
var INTERSECTED = [];
var radius = 100, theta = 0;
var loadingAction;
var idleAction;
var custom = false;
var left;
var zoom = false;

var red = 0;
var up = true;
var load = true;

var scaling = false;
var timescale = 0;
var count = 0;

$('.menu').on('click', function(){
	if(this.className.indexOf('disabled') != -1){
		var Idx = $(this).index();
		$('.layer-disabled').find('.info_layer').eq(Idx-1).fadeIn(200);
	}	
});

//커스텀 레이어 선택 이벤트
function customLayerOpen(layer, item){
	$(item).addClass('on');
	$('.layer').removeClass('on');
	$(layer).addClass('on');
	$('.custom_wrp').fadeOut(200);
	$('.custom .btn').stop().animate({'opacity': 0}, 200);
	controls.enabled = false;
}

//커스텀 레이어 닫기 이벤트
function customLayerClose(){
	$('.layer').find('.btn_close').on('click', function(){
		$('.layer').removeClass('on');
		$('.custom .btn').stop().animate({'opacity': 1}, 200);
		$('.custom_wrp').fadeIn(200);
		controls.enabled = true;
	});
	$('html, body').on('click touchend', function(e){
		if(!$(e.target).is('.layer, .layer *')){
			$('.layer').removeClass('on');	
			$('.custom .btn').stop().animate({'opacity': 1}, 200);
			controls.enabled = true;
		}
	});
}

function len_chk(){  
	str = $('#myTextarea').val();
     
	if(str.length >8){  
		$('#myTextarea').val(str.substring(0,8));
	} 
} 

function customStart(){
	custom = true;
	$('.custom_wrp').show().css({'bottom': 0});
	$('.info_txt1').hide();
	idleAction.loop = THREE.LoopOnce;
}

function complete(){
	idleAction.timeScale = 0;
	idleAction.time = 0;
	load = true;

	controls.reset();
	camera.position.set(0,0,100);
	controls.target.set( 0, -2, -27 );
	controls.update();

	$('.custom').css("display", "none");
	$('#capture1').css("display", "block");
	$('.btn_target').hide();
}

function uncomplete(){
	idleAction.timeScale = 1;
	idleAction.time = 0;
	load = false;

	resert_view();

	$('.custom').css("display", "block");
	$('#capture1').css("display", "none");
	$('.btn_target').show();
}

function resert_view(){
	controls.reset();
	camera.position.set(0,0,100);
	controls.target.set( 0, 0, -27 );
	controls.update();
}

function capture(){

	var bg1 = document.getElementById("bg1");
	var bg2 = document.getElementById("bg2");

	var resizedCanvas = document.createElement("canvas");
	var resizedContext = resizedCanvas.getContext("2d");

	width = (window.innerWidth > 512)? window.innerWidth: window.innerWidth*2;
	height = (window.innerWidth > 512)? window.innerHeight: window.innerHeight*2;
	resizedCanvas.width = width.toString();
	resizedCanvas.height = width.toString();
	
	var canvas = document.getElementsByTagName("canvas")[0];
	var pad = Math.abs(height - width) / 2
	//resizedContext.drawImage(canvas, 0, 300, 1100, 1100, 0, 0, 500, 500);
	resizedContext.drawImage(bg1, 0, 0, width, width);
	resizedContext.drawImage(canvas, 0, -pad, width, height);
	resizedContext.drawImage(bg2, 0, 0, width, width);
	var myResizedData = resizedCanvas.toDataURL('image/png');
	document.getElementById('canvasImg1').src = myResizedData;
	
	container = document.getElementsByClassName('canvas-wrp')[0];
	container.hidden = true;

	$('#capture1').css("display", "none");
	$('#capture2').css("display", "block");
}

function capture_cancel(){
	container = document.getElementsByClassName('canvas-wrp')[0];
	container.hidden = false;

	$('#capture2').css("display", "none");
	$('#capture1').css("display", "block");
}

function capture_confirm(){
	document.getElementById('canvasImg2').src = document.getElementById('canvasImg1').src;
	uploadImage();

	$('#capture2').css("display", "none");
	$('.share').css("display", "block");
}

jQuery(document).on("click", ".mylist", function(){
	src = jQuery(this).find('img').attr('src');
	if(src.indexOf("img_x") != -1) src = '';
	var _src = src.replace('/pattern/', '/pattern_model/');
	changePattern(_src);
});

jQuery(document).on("click", ".mygraphic", function(){
	src = jQuery(this).find('img').attr('src');
	if(src.indexOf("img_x") != -1) src = '';
	var _src = src.replace('/graphic/', '/graphic_model/');
	changePattern(_src, 1);
});

$('.slider').on("input", function() {
	idleAction.time = (this.value / 100) * (idleAction._clip.duration / 5);
});

jQuery( '#copy-url' ).click(function() {
	if(iOS) {
		iosCopyToClipboard(document.getElementById("textbox-url"));
	}
	else {
		var urlbox = document.getElementById( "textbox-url" );
		urlbox.select();
		document.execCommand( 'Copy' );
	}
	alert( '해시태그가 복사되었습니다.\n게시물에 붙여넣기 해주세요' );
});

function iosCopyToClipboard(el) {
    var oldContentEditable = el.contentEditable,
        oldReadOnly = el.readOnly,
        range = document.createRange();

    el.contentEditable = true;
    el.readOnly = false;
    range.selectNodeContents(el);

    var s = window.getSelection();
    s.removeAllRanges();
    s.addRange(range);

    el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

    el.contentEditable = oldContentEditable;
    el.readOnly = oldReadOnly;

    document.execCommand('copy');
}

jQuery( '#save' ).click(function() {
	if(iOS) alert( 'IOS는 완성된 이미지를 길게 눌러\n이미지를 저장해주세요' );
	else {
		location.href = '/download.php?file='+filename;
	}
});

$('#myTextarea').bind('input change', function() {
	console.log(this.value);
	var str = this.value.replace('\n', '');
	updateMyText(str);
});

$('#colorpic').bind('change', function() {
	changeColor();
});

var filename = "";
function uploadImage(){
	var url = "/imgUpload.php";
	var data = {
		"base64image": document.getElementById('canvasImg1').src,
		"nike_id": '<?=$nike_id?>'
	};
	
	scriptUtil.ajaxCallBack(url, "POST", data, "html", function(response){
		console.log(response)
		var parse = JSON.parse(response);

		filename = parse['fileName'];
		url = "/update_image.php";
		data = {
			"nike_id": '<?=$nike_id?>',
			"image": parse['fileName']
		};
		scriptUtil.ajaxCallBack(url, "POST", data, "html", function(response){
		}, function(error){
			console.log(error);
		});

	}, function(error){
		console.log(error);
	});
}

window.onload = function () {
$(function(){
	$('#colorpic').minicolors({
		inline: true,
		change: function(value, opacity) {
			$(this).attr('value', value);
		}
	});
});

//listen to shake event
var shake = false;
var shakeEvent = new Shake({threshold: 10});
shakeEvent.start();
window.addEventListener('shake', function(){
	if(!shake)
	{
		loadingAction.play();
		$('.ready').hide();
	}
	shake = true;
	stopShake();
}, false);

//stop listening
function stopShake(){
	shakeEvent.stop();
}

//check if shake is supported or not.
if(!("ondevicemotion" in window)){alert("Not Supported");}

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

init();
animate();

function init() {
	loadStart();

	container = document.getElementsByClassName('canvas-wrp')[0];

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.set( 0, 0, 400 );

	scene = new THREE.Scene();

	light1 = new THREE.HemisphereLight( 0xffffff, 0x444444 );
	light1.position.set( 0, 200, 0 );
	scene.add( light1 );

	light2 = new THREE.DirectionalLight( 0xffffff, 0.3 );
	light2.position.set( 0, 200, 0 );
	//light.castShadow = true;
	light2.shadow.camera.top = 180;
	light2.shadow.camera.bottom = -100;
	light2.shadow.camera.left = -120;
	light2.shadow.camera.right = 120;
	scene.add( light2 );

	// var gridHelper = new THREE.GridHelper( 1000, 20 );
	// scene.add( gridHelper );

	// model
	var loader = new THREE.FBXLoader();
	loader.load( '<?=$url?>models/shoe15.fbx', function ( object ) {

		object.mixer = new THREE.AnimationMixer( object );
		mixers.push( object.mixer );

		var action = object.mixer.clipAction( object.animations[ 0 ] );
		// action.play();

		try{
			var loadingClip = THREE.AnimationUtils.subclip( action.getClip() , 'loading', 0, 360 );
			loadingAction = object.mixer.clipAction( loadingClip );
			loadingAction.loop = THREE.LoopOnce;
			loadingAction.clampWhenFinished = true;

			var idleClip = THREE.AnimationUtils.subclip( action.getClip() , 'idle', 360, 540 );
			idleAction = object.mixer.clipAction( idleClip );
			idleAction.clampWhenFinished = true;
			// idleAction.play();
			object.mixer.addEventListener( 'finished', function( e ) {
				if(e.action._clip.name == 'loading')
				{
					$('.custom').show(); 
					$('.info_txt1').show(); 
					$('.complete').show(); 
					idleAction.play();
					load = false;
				}
			});			

			loadingAction.play();
			$('.ready').hide();
		}
		catch(error){
			console.log(error);
		}

		object.traverse( function ( child ) {
			if(child.name == "Dummy011"){
				left = child;
			}

			if ( child.isMesh ) {

				//child.castShadow = true;
				//child.receiveShadow = true;
			}
			try{
				if ( child instanceof THREE.Mesh ) {

					for ( var i = 0; i < child.material.length; i ++ ) {
						child.material[i].map = null;
						child.material[i].color.r = 1;
						child.material[i].color.g = 1;
						child.material[i].color.b = 1;
						child.material[i].emissiveIntensity = 1;
					}

					var pattern = new THREE.MeshPhongMaterial( {
						map: null,
						transparent: true,
						visible: false
					} );

					var graphic = new THREE.MeshPhongMaterial( {
						map: null,
						transparent: true,
						visible: false
					} );							
					
					//console.log(child.material.length);
					child.geometry.addGroup( 0, child.geometry.attributes.normal.count, child.material.length );
					child.geometry.addGroup( 0, child.geometry.attributes.normal.count, child.material.length+1 );
					child.material.push(pattern);
					child.material.push(graphic);

					child.updateMorphTargets();
					//console.log(child);
				}
			}
			catch(error){
				console.log(error);
			}

		} );
		//object.position.y = -50;

		myobject = object;
		scene.add( object );

	}, function(data){if(data.loaded == data.total){loadEnd();$('.ready').show();}}, function(data){console.log(data);} );

	var loader = new THREE.FontLoader();
	loader.load( '<?=$url?>font/Superstar_M54_Regular.json', function ( font ) {

		materials = [
			new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
			new THREE.MeshPhongMaterial( { color: 0xffffff } ) // side
		];

		var geometry = new THREE.TextBufferGeometry( '', {
			font: font,
			size: 3,
			height: 2,
			curveSegments: 12,
			bevelEnabled: false,
			bevelThickness: 0.6,
			bevelSize: 0.78,
			bevelSegments: 8
		} );

		mytext = new THREE.Mesh( geometry, materials );
		mytext.scale.set(0.3,0.3,0.3);
		mytext.rotation.set(-1.57,0.05,1.57);
		mytext.position.set(7.3,4.5,1.7);
		scene.add( mytext );
	});

	raycaster = new THREE.Raycaster();

	renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true, preserveDrawingBuffer: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( 0x000000, 0 );
	renderer.shadowMap.enabled = true;
	container.appendChild( renderer.domElement );
	renderer.domElement.id = "nike";

	window.addEventListener( 'resize', onWindowResize, false );

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.target.set( 10, 0, -27 );
	controls.update();

	// ui = new ThreeUI(renderer.domElement, window.innerHeight);
	// mytext = ui.createText('', 120, 'superstar M54', '#595757');
	// mytext.textAlign = 'center';
	// //mytext.textBaseline = 'middle';
	// mytext.anchor.x = ThreeUI.anchors.center;
	// mytext.anchor.y = ThreeUI.anchors.center;

	renderer.domElement.addEventListener( 'mousedown', onMouseDown, false );
	renderer.domElement.addEventListener( 'touchstart', onTouchStart, false );
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	if ( mixers.length > 0 ) {

		for ( var i = 0; i < mixers.length; i ++ ) {

			mixers[ i ].update( clock.getDelta() );

		}

	}

	render();

	//stats.update();

}

function render() {
	if(left && mytext){
		mytext.parent = left;
	}

	if(!zoom && loadingAction && loadingAction.time > 5)
	{
		zoom = true;
		camera.position.set(0,0,100);
		controls.target.set( 0, 0, -27 );
		controls.update();
	}

	if(!scaling && loadingAction && loadingAction.time > 7.5)
	{
		loadingAction.timeScale = 1;
		scaling = true;
	}
	else if(!scaling && loadingAction && loadingAction.time > 5)
	{
		loadingAction.timeScale = 4;
		console.log(loadingAction.time);
	}

	renderer.render( scene, camera );
}

function onMouseDown( event ) {
	event.preventDefault();
	mouse.x = ( event.touches[ 0 ].clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( (event.touches[ 0 ].clientY) / window.innerHeight ) * 2 + 1;

	if(load) return;

	var hit = false;
	try{
		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObject( myobject, true );
		if ( intersects.length > 0 ) {
			if(!custom)customStart();
			hit = true;
			
			load = true;
			INTERSECTED = [];

			var select = intersects[0].object;
			//console.log(select);
			while(select.parent.name != "Dummy018"){
				select = select.parent;
			}
			//console.log(select);
			// console.log(select.name);
			// console.log(camera.position.x+","+camera.position.y+","+camera.position.z)
			// console.log(camera.quaternion.w+","+camera.quaternion.x+","+camera.quaternion.y+","+camera.quaternion.z)
			// console.log(camera.rotation.x+","+camera.rotation.y+","+camera.rotation.z)
			// rotateCamera(select.name);
			checkLayer(select.name);

			myTarget = select;	
			setTimeout(blink, 50);					
		}
	}
	catch(error){
		console.log(error);
	}

	if(hit) 
	{
		$('.custom_wrp').fadeIn(200);
		idleAction.loop = THREE.LoopOnce;
	}
	else {
		$('.custom_wrp').fadeOut(200);
		idleAction.loop = THREE.LoopRepeat;
		idleAction.paused = false;
	}
}

function onTouchStart( event ) {
	event.preventDefault();
	mouse.x = ( event.touches[ 0 ].clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( (event.touches[ 0 ].clientY) / window.innerHeight ) * 2 + 1;

	if(load) return;

	var hit = false;
	try{
		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObject( myobject, true );
		if ( intersects.length > 0 ) {
			if(!custom)customStart();
			hit = true;
			
			load = true;
			INTERSECTED = [];

			var select = intersects[0].object;
			//console.log(select);
			while(select.parent.name != "Dummy018"){
				select = select.parent;
			}
			//console.log(select);
			// console.log(select.name);
			// console.log(camera.position.x+","+camera.position.y+","+camera.position.z)
			// console.log(camera.quaternion.w+","+camera.quaternion.x+","+camera.quaternion.y+","+camera.quaternion.z)
			// console.log(camera.rotation.x+","+camera.rotation.y+","+camera.rotation.z)
			// rotateCamera(select.name);
			checkLayer(select.name);

			myTarget = select;	
			setTimeout(blink, 50);					
		}
	}
	catch(error){
		console.log(error);
	}

	if(hit) 
	{
		$('.custom_wrp').fadeIn(200);
		idleAction.loop = THREE.LoopOnce;
	}
	else {
		$('.custom_wrp').fadeOut(200);
		idleAction.loop = THREE.LoopRepeat;
		idleAction.paused = false;
	}
}

var ttt = false;
var tposition = new THREE.Vector3( );
var tquaternion = new THREE.Quaternion( );
var trotation = new THREE.Vector3( );
function rotateCamera(name){
	switch (name) {
	case 'Dummy013':
		tposition.set(-79.58493163496983,-2.493478942500018,71.93948261144479);
		tquaternion.set(0.9431409660420844,0.009259562271525816,-0.3322480073894141,0.0032619419840526505);
		trotation.set(0.025196728058367427,-0.6772508737148152,0.015791634864055392);
		break;
	case 'Dummy017':
		tposition.set(-103.99552384166898,146.03726023774988,173.50604936168133);
		tquaternion.set(0.9170543748393578,-0.2964381530574816,-0.25378312426336797,-0.08203548524259371);
		trotation.set(-0.6996463237942917,-0.4299539600736784,-0.33742139266974364);
		break;
	case 'Dummy012':
		tposition.set(50.2682030347803,49.60572994625911,140.49021589174868);
		tquaternion.set(0.9726178736482102,-0.15743730324019287,0.16876521050224558,0.027317963551888414);
		trotation.set(-0.3394251974659116,0.32539848737521554,0.11240237714901583);
		break;
	case 'Dummy016':
		tposition.set(4.3109469781737175,0.7462647333984092,109.72092739101463);
		tquaternion.set(0.9998014681741684,-0.0033974044708842705,0.019633579107060303,0.00006671645477736665);
		trotation.set(-0.006801375489860283,0.03926900081922716,0.0002670186931454501);
		break;
	case 'Dummy014':
		tposition.set(47.69628937937468,58.39565625659012,-64.60072271227527);
		tquaternion.set(0.40480969211966505,-0.16304029719999863,0.8345992520470172,0.3361414332352939);
		trotation.set(-2.1428684531743283,0.6017652713354249,2.4204017385772736);
		break;
	case 'Group004':
		tposition.set(76.93095359874903,16.3800875519132,-236.76912939006135);
		tquaternion.set(0.15635006410049435,-0.005138025709830491,0.9871554540340288,0.03244021760788133);
		trotation.set(-3.072521022060334,0.3134583198129042,3.120263696321346);
		break;
	case 'Group003':
		tposition.set(196.6705917856788,90.15353927605229,-148.87574242321094);
		tquaternion.set(0.43840543941930527,-0.07760605460130122,0.8817125757863541,0.15607980227107687);
		trotation.set(-2.59709325021052,0.8463548823073156,2.715842497451339);
		break;
	case 'Group002':
		tposition.set(192.0213265714171,-6.268032717032046,-18.912449928523685);
		tquaternion.set(0.6714704330541995,0.010903548469384324,0.7408534566074382,-0.012030211868134612);
		trotation.set(2.821561820053641,1.4674065726511478,-2.8231572942476277);
		break;
	case 'Dummy004':
		tposition.set(9.789849022429419,-8.100526147986287,249.16829624611867);
		tquaternion.set(0.999675450519678,0.0162330449589806,0.01963110443817281,-0.00031877605954376694);
		trotation.set(0.0324988139224689,0.03924919338352168,-0.001275673210118349);
		break;
	case 'Dummy005':
		tposition.set(94.98404457264583,-0.716110486582379,217.15156868176723);
		tquaternion.set(0.9788216344482117,0.0014786800529116662,0.2047093691223181,-0.0003092490501969169);
		trotation.set(0.003297732984463052,0.4123320393365421,-0.0013215606347580862);
		break;
	case 'Dummy008':
		tposition.set(321.7906194830564,-7.304501065995186,18.97698586739375);
		tquaternion.set(0.7275764316480511,0.008242447202255272,0.6859330977780203,-0.007770685108516021);
		trotation.set(0.3674336447649137,1.5076892999351719,-0.36676614013703357);
		break;
	case 'Dummy009':
		tposition.set(92.79841389671294,-264.6322600454247,77.69477219440289);
		tquaternion.set(0.7623749552059498,0.4896531721086638,0.3560076349936872,-0.2286542423504337);
		trotation.set(1.2852257661600486,0.32456872636040096,-0.826688987389048);
		break;
	}
	//ttt = true;
	//tttcount = 0;
	//controls.update();
}

function checkLayer(name){
	//console.log(name);
	$('.menu2').addClass('disabled');
	$('.menu3').addClass('disabled');
	$('.menu4').addClass('disabled');

	switch (name) {
	case 'Dummy004':
		$('.menu2').removeClass('disabled');
		$('.menu3').removeClass('disabled');
		break;
	case 'Dummy005':
		$('.menu2').removeClass('disabled');
		$('.menu3').removeClass('disabled');
		break;
	case 'Group002':
		$('.menu2').removeClass('disabled');
		break;
	case 'Group003':
		$('.menu2').removeClass('disabled');
		break;
	case 'Group004':
		$('.menu2').removeClass('disabled');
		$('.menu3').removeClass('disabled');
		$('.menu4').removeClass('disabled');
		break;
	}
}

function blink(){
	if(up)red += 20;
	else red -= 20;

	if(red >= 255) {
		red = 255;
		up = false;
		count += 1;
	}
	if(red <= 0) red = 0;
	blinking(myTarget)

	if(red <= 0 && count < 2){
		up = true;
		setTimeout(blink, 10);
	}
	else if(red <= 0)
	{
		count = 0;
		up = true;
		load = false;
	}
	else
	{
		setTimeout(blink, 10);
	}
}

function blinking(target){
	if(target.material)
	{
		//if(!(INTERSECTED[target.name]))INTERSECTED[target.name] = target.material[0].emissive.getHex();
		var hex = red.toString(16);
    	if(hex.length == 1) hex = "0" + hex;
		for ( var i = 0; i < target.material.length; i ++ ) {
			target.material[i].emissive.setHex( "0x" + hex + "0000" );
			target.material[i].emissiveIntensity = 1;
		}
	}

	target.children.forEach(function(element) { 
		blinking(element);
	});
}

// function restore(target){
// 	if(target.material)
// 	{
// 		target.material[0].emissive.setHex( INTERSECTED[target.name] );
// 	}

// 	target.children.forEach(function(element) { 
// 		restore(element);
// 	});
// }
}

function updateMyText( text ) {
	var loader = new THREE.FontLoader();
	loader.load( '<?=$url?>font/Superstar_M54_Regular.json', function ( font ) {
		var geometry = new THREE.TextBufferGeometry( text, {
			font: font,
			size: 3,
			height: 2,
			curveSegments: 12,
			bevelEnabled: false,
			bevelThickness: 0.6,
			bevelSize: 0.78,
			bevelSegments: 8
		} );

		mytext.geometry.dispose()
		mytext.geometry = geometry;
	});
}

function changeColor(){
	if(!myTarget) return;
	if(load) return;

	coloring(myTarget);
}

function changePattern(src, select=2){
	if(!myTarget) return;
	if(load) return;

	pattern(myTarget, src, select);
}

function coloring(target){
	if(target.name == "Object001")
		return;

	if(target.material)
	{
		var color = $("#colorpic").val();
		var hex = color.replace("#", "0x");
		target.material[0].color.setHex(hex);
		//target.material[0].emissive.setHex(hex);
	}

	target.children.forEach(function(element) { 
		coloring(element);
	});
}

function pattern(target, src, select=2){
	if(target.name == "Object001")
		return;

	if(target.material)
	{
		//console.log(target);
		if(src == '' || src.indexOf('btn_none') != -1){
			target.material[target.material.length-select].map = null;
			target.material[target.material.length-select].visible = false;
		}
		else {
			var map = new THREE.TextureLoader().load( src );
			target.material[target.material.length-select].map = map;
			target.material[target.material.length-select].visible = true;
		}
		target.material[target.material.length-select].needsUpdate = true;
	}

	target.children.forEach(function(element) { 
		pattern(element, src, select);
	});
}

</script>

</body>
</html>