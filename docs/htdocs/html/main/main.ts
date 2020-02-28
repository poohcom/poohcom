import * as THREE from '../../build/three.module.js';
import { DeviceOrientationControls } from '../jsm/controls/DeviceOrientationControls.js';

var camera, scene, renderer, controls,video,texture;
var camera2d, scene2d;
var bubble_button:THREE.Sprite;

//var camera_width = 640;
//var camera_height = 480;

var camera_width = 1280;
var camera_height = 720;
var icon_visible = true;

var ratio = camera_height/camera_width;
var startButton:HTMLElement = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', function () {

	init();
	//animate();

}, false );

var captureButton:HTMLElement = document.getElementById( 'captureButton' );
captureButton.addEventListener( 'click', function () {

	OnCapture();

}, false );


video = document.getElementById( 'video' );


function GetW(w:number):number{
	return window.innerWidth* w /  camera_height;
}

function GetH(h:number):number{
	return window.innerHeight* h / camera_width;
}

function init() {

	var overlay = document.getElementById( 'overlay' );
	overlay.remove();

	camera = new THREE.PerspectiveCamera( 75, ratio, 1, 1100 );

	controls = new DeviceOrientationControls( camera );

	scene = new THREE.Scene();
	var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
	// invert the geometry on the x-axis so that all of the faces point inward
	geometry.scale( - 1, 1, 1 );

	var BubbleMaterial = new THREE.SpriteMaterial( {
		map: new THREE.TextureLoader().load( 'textures/bubble.png' ),
		color: 0xffffff 
	} );
	
	var material = new THREE.MeshBasicMaterial( {
		map: new THREE.TextureLoader().load( 'textures/sky.png' ),
		transparent : true,
		opacity: 1,
		side: THREE.DoubleSide
	} );

	///////////
	scene2d = new THREE.Scene();

	camera2d = new THREE.OrthographicCamera(
	 		- window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -  window.innerHeight / 2
	 		, 1, 10);
	camera2d.position.z = 10;
	
	let w:number = window.innerWidth;
	let h:number = window.innerHeight;
	
	bubble_button = new THREE.Sprite( BubbleMaterial );
	bubble_button.name = "bubble_button";
	bubble_button.position.set( GetW(0), -h / 2 - GetH( 512 ) , 0);
	bubble_button.scale.set( GetW(256),GetH(256), 1 );
	bubble_button.visible = true;
	scene2d.add( bubble_button );
///////

	var mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );


	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.autoClear=false;
	
	var r = window.innerWidth / camera_height * camera_width;
	renderer.setSize( window.innerWidth, r);
	
	document.body.appendChild( renderer.domElement );
	//

	window.addEventListener( 'resize', onWindowResize, false );

	window.setTimeout(checkWebcam, 500);
}

function checkWebcam() {

	if ( controls.is_check == 1 )
	{
		if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) 
		{
			var constraints = { video: { width: camera_width, height: camera_height, facingMode: 'environment' } };

				navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {
				// apply the stream to the video element used in the texture

				video.srcObject = stream;
				video.play();
				texture = new THREE.VideoTexture( video );
				scene.background = texture;
				animate();

			} ).catch( function ( error ) {

			console.error( 'Unable to access the camera/webcam.', error );

			} );

		} else {

			console.error( 'MediaDevices interface not available.' );
		}
	
	}else
	{
		window.setTimeout(checkWebcam, 500);
	}
}

function animate() {

	window.requestAnimationFrame( animate );

	controls.update();
	//renderer.render( scene, camera );
	
	renderer.clear();
	renderer.render(scene, camera);
	renderer.clearDepth();
	renderer.render(scene2d, camera2d);
	
	 //if (controls.beta_data > 1.0 || controls.beta_data <-1.0)
	 
	 
	 {
	 	let r:number = controls.beta_data > 1.0 ? 1.0 : controls.beta_data;
		 r = r < 0.0 ? 0.0 : r;
		 
		if ( r>0.5 && icon_visible==true)
		{
			icon_visible = false;
			$('.layer-move').hide();
		}

		if ( r<0.5 && icon_visible==false)
		{
			icon_visible = true;
			$('.layer-move').show();
		}

	 	let h:number = window.innerHeight;

	 	bubble_button.position.set( GetW(0), (-h / 2 - GetH( 512 ) ) * (1-r)  , 0);
	 }
	
}

function onWindowResize() {

	camera.aspect = ratio;
	camera.updateProjectionMatrix();

	camera2d.aspect = ratio;
	camera2d.updateProjectionMatrix();

	var r = window.innerWidth / camera_height * camera_width;
	renderer.setSize( window.innerWidth, r);
}

function OnCapture()
{
		var w = window.open('', '');
		w.document.title = "Screenshot";
		var img = new Image();
		renderer.clear();
		renderer.render(scene, camera);
		renderer.clearDepth();
		renderer.render(scene2d, camera2d);
		img.src = renderer.domElement.toDataURL();
		w.document.body.appendChild(img);  
}

function GetCapture()
{
	var img = new Image();
	renderer.clear();
	renderer.render(scene, camera);
	renderer.clearDepth();
	renderer.render(scene2d, camera2d);
	return renderer.domElement.toDataURL();
}



