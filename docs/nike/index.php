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

<script type="text/javascript" src="<?=$url?>js/three.min.js"></script>
<script type="text/javascript" src="<?=$url?>js/libs/inflate.min.js"></script>
<script type="text/javascript" src="<?=$url?>js/loaders/TGALoader.js"></script>
<script type="text/javascript" src="<?=$url?>js/loaders/FBXLoader.js"></script>
<script type="text/javascript" src="<?=$url?>js/controls/OrbitControls.js"></script>
<script type="text/javascript" src="<?=$url?>js/Detector.js"></script>
<script type="text/javascript" src="<?=$url?>js/libs/stats.min.js"></script>
<script type="text/javascript" src="<?=$url?>js/ui/three-ui.min.js"></script>
<script type="text/javascript" src="<?=$url?>js/ui/asset-loader.min.js"></script>

<script type="text/javascript" src="js/detectmobilebrowser.js"></script>

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
		<a href="javascript:popOpen('.pop-kit');" class="btn_infomation">소개</a>
	</div>
	<!-- //Header -->

	<!-- Container -->
	<div id="container">
		<h2 class="blind">본문 내용</h2>

		<div class="main">

			<!-- Canvas -->
			<div class="canvas-wrp">
			</div>
			<!-- //Canvas -->

			<div class="section">
				<div class="top-txt">
					<img src="<?=$url?>images/img_main_top.png" alt="BRING YOUR FORCE">
				</div>
				<a href="./admin.php" class="btn">
					<img src="<?=$url?>images/btn_start.png" alt="start">
					<img src="<?=$url?>images/btn_start_on.png" class="btn-hover" alt="start"><!-- 수정 -->
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

</body>

<script>

var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if(!jQuery.browser.mobile) location.href = './pc.html';

var container, stats, controls, ui, mytext;
var camera, scene, renderer, light;

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

var skin = 0;

window.onload = function () {

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

init();
animate();

}

function init() {
	loadStart();

	container = document.getElementsByClassName('canvas-wrp')[0];

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.set( 0, 0, 100 );

	scene = new THREE.Scene();

	light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
	light.position.set( 0, 200, 0 );
	scene.add( light );

	light = new THREE.DirectionalLight( 0xffffff, 0.3 );
	light.position.set( 0, 200, 0 );
	//light.castShadow = true;
	light.shadow.camera.top = 180;
	light.shadow.camera.bottom = -100;
	light.shadow.camera.left = -120;
	light.shadow.camera.right = 120;
	scene.add( light );

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
			var loadingClip = THREE.AnimationUtils.subclip( action.getClip() , 'intro', 560, 785 );
			loadingAction = object.mixer.clipAction( loadingClip );
			loadingAction.play();

			object.mixer.addEventListener( 'loop', function( e ) {
				clear(myobject);
				maincount = 0;

				skin = (skin+1)%3;
				//skin = 3;

				if(skin == 0)
				{
					updateMyText('AF1BYME');

					patterning(myobject, 'Group004', 'images/pattern_model/pattern3.png', 2, false);
					patterning(myobject, 'Group004', 'images/graphic_model/graphic2.png', 1, false);

					coloring(myobject, 'Group004', '0x6F24CE', false);
					coloring(myobject, 'Dummy009', '0x6F24CE', false);
					coloring(myobject, 'Dummy004', '0xBD1C1F', false);
					coloring(myobject, 'Dummy016', '0xBD1C1F', false);
					coloring(myobject, 'Group003', '0x5E5E5E', false);
					coloring(myobject, 'Dummy017', '0x929292', false);
					coloring(myobject, 'Dummy014', '0x3C3C3C', false);
					coloring(myobject, 'Dummy013', '0x3C3C3C', false);
				}
				else if(skin == 1)
				{
					updateMyText('MYFLOOR');

					patterning(myobject, 'Dummy005', 'images/pattern_model/pattern6.png', 2, false);
					patterning(myobject, 'Group002', 'images/pattern_model/pattern6.png', 2, false);
					patterning(myobject, 'Dummy004', 'images/graphic_model/graphic10.png', 1, false);

					coloring(myobject, 'Group004', '0x7D7D7D', false);
					coloring(myobject, 'Group003', '0x000000', false);
					coloring(myobject, 'Dummy009', '0xe93225', false);
					coloring(myobject, 'Dummy016', '0xe93225', false);
				}
				else if(skin == 2)
				{
					updateMyText('MYFORCE');

					patterning(myobject, 'Group002', 'images/pattern_model/pattern14.png', 2, false);
					patterning(myobject, 'Group004', 'images/graphic_model/graphic3.png', 1, false);

					coloring(myobject, 'Dummy017', '0xDC2217', false);
					coloring(myobject, 'Dummy014', '0xDC2217', false);
					coloring(myobject, 'Dummy005', '0x9C9DA1', false);
					coloring(myobject, 'Dummy013', '0x9C9DA1', false);
					coloring(myobject, 'Dummy009', '0xE28722', false);
					coloring(myobject, 'Dummy016', '0xE28722', false);
					coloring(myobject, 'Group003', '0x147FD0', false);
					coloring(myobject, 'Dummy004', '0x147FD0', false);
					coloring(myobject, 'Group004', '0xB4B4B4', false);
				}
			});			
		}
		catch(error){
			console.log(error);
		}

		object.traverse( function ( child ) {
			if(child.name == "Dummy011"){
				left = child;
			}

			if ( child.isMesh ) {
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
				}
			}
			catch(error){
				console.log(error);
			}
		} );
		//object.position.y = -50;

		myobject = object;
		scene.add( object );

	}, function(data){if(data.loaded == data.total){loadEnd();}}, function(data){console.log(data);} );

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
	controls.target.set( 0, 0, -27 );
	//controls.enabled = false;
	controls.update();
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
}

var maincount = 0;
var load = false;
function render() {
	if(!load &&  left && mytext){
		mytext.parent = left;
		updateMyText('AF1BYME');

		patterning(myobject, 'Group004', '<?=$url?>images/pattern_model/pattern3.png', 2, false);
		patterning(myobject, 'Group004', '<?=$url?>images/graphic_model/graphic2.png', 1, false);

		coloring(myobject, 'Group004', '0x6F24CE', false);
		coloring(myobject, 'Dummy009', '0x6F24CE', false);
		coloring(myobject, 'Dummy004', '0xBD1C1F', false);
		coloring(myobject, 'Dummy016', '0xBD1C1F', false);
		coloring(myobject, 'Group003', '0x5E5E5E', false);
		coloring(myobject, 'Dummy017', '0x929292', false);
		coloring(myobject, 'Dummy014', '0x3C3C3C', false);
		coloring(myobject, 'Dummy013', '0x3C3C3C', false);

		load = true;
	}
	if(loadingAction)
	{
		if(maincount == 0 && loadingAction.time >= 0.8)
		{
			camera.position.set(-46.82746776992939,49.75034637819831,80.0564864802945);
			camera.quaternion.set(-0.19566898854173362,-0.20057770734973152,-0.04092193489752637,0.9590660172697305);
			camera.rotation.set(-0.43502017581427,-0.3776318547706114,-0.16970039870784284);
			controls.update();
			maincount += 1;
		}

		if(maincount == 1 && loadingAction.time >= 1.1)
		{
			camera.position.set(121.15678182105871,36.86615401131696,-36.53524552269979);
			camera.quaternion.set(-0.09960075545270067,0.7263745770721837,0.1077474902127528,0.6714537524277531);
			camera.rotation.set(-1.8238947427036545,1.26627440786958,1.8355508843763793);
			controls.update();
			maincount += 1;
		}

		if(maincount == 2 && loadingAction.time >= 1.4)
		{
			camera.position.set(78.86173963999248,-25.998119544090844,69.09330778532458);
			camera.quaternion.set(0.09688586485080683,0.33510150671262084,-0.03466631675812648,0.9365459710411804);
			camera.rotation.set(0.26422512124502445,0.6699650343749235,-0.16644650000943872);
			controls.update();
			maincount += 1;
		}

		else if(maincount == 3 && loadingAction.time >= 1.7)
		{
			controls.reset();
			camera.position.set(0,0,100);
			controls.target.set( 0, 0, -27 );
			controls.update();
			maincount += 1;
		}
	}

	renderer.render( scene, camera );
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

function coloring(target, name, hex, pass){
	if(target.name == "Object001")
		return;

	if(target.name == name)
		pass = true;

	if(target.material && pass)
	{
		target.material[0].color.setHex(hex);
	}

	target.children.forEach(function(element) { 
		coloring(element, name, hex, pass);
	});
}

function patterning(target, name, src, select, pass){
	if(target.name == "Object001")
		return;
	
	if(target.name == name)
		pass = true;


	if(target.material && pass)
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
		patterning(element, name, src, select, pass);
	});
}

function clear(target){
	if(target.name == "Object001")
		return;

	if(target.material)
	{
		target.material[target.material.length-1].map = null;
		target.material[target.material.length-1].visible = false;
		target.material[target.material.length-1].needsUpdate = true;

		target.material[target.material.length-2].map = null;
		target.material[target.material.length-2].visible = false;
		target.material[target.material.length-2].needsUpdate = true;

		target.material[0].color.setHex('0xffffff');
	}

	target.children.forEach(function(element) { 
		clear(element);
	});
}

</script>
</html>