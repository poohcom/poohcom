import * as THREE from '../../build/three.module.js';
import { DeviceOrientationControls } from '../jsm/controls/DeviceOrientationControls.js';
function SaveImage() {
    var fname = '';
    $.ajax({
        method: 'POST',
        async: false,
        url: 'photo_upload.php',
        data: {
            photo: GetCapture()
        },
        success: function (data) {
            fname = data.result;
            sessionStorage.setItem("my_image", fname); //이미지명 저장
            //console.log('save image name to session : ' + sessionStorage.getItem("my_image"));
        }
    });
    return fname;
}
//window.addEventListener('load', () => {SceneManager.Instance.OnClickStart();SceneManager.Instance.Init()});
var camera2d, scene2d;
var camera, scene, renderer, controls, video, texture;
var bubble_button;
var ratio = 480.0 / 640.0;
var startButton = document.getElementById('startButton');
startButton.addEventListener('click', function () {
    init();
    animate();
}, false);
var captureButton = document.getElementById('captureButton');
captureButton.addEventListener('click', function () {
    OnCapture();
}, false);
video = document.getElementById('video');
function GetW(w) {
    return window.innerWidth * w / 480;
}
function GetH(h) {
    return window.innerHeight * h / 640;
}
function init() {
    var overlay = document.getElementById('overlay');
    overlay.remove();
    camera = new THREE.PerspectiveCamera(75, ratio, 1, 1100);
    controls = new DeviceOrientationControls(camera);
    scene = new THREE.Scene();
    var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(-1, 1, 1);
    var BubbleMaterial = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load('textures/bubble.png'),
        color: 0xffffff
    });
    var material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('textures/sky.png'),
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide
    });
    ///////////
    scene2d = new THREE.Scene();
    camera2d = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 1, 10);
    camera2d.position.z = 10;
    let w = window.innerWidth;
    let h = window.innerHeight;
    var spriteMaterial = new THREE.SpriteMaterial({ map: BubbleMaterial, color: 0xffffff });
    bubble_button = new THREE.Sprite(spriteMaterial);
    bubble_button.name = "bubble_button";
    bubble_button.position.set(0, 0, 0);
    //bubble_button.position.set( GetW(0), -h / 2 - GetH( 512 ) , 0);
    bubble_button.scale.set(GetW(256), GetW(256), 1);
    bubble_button.visible = true;
    scene2d.add(bubble_button);
    ///////
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    //var helperGeometry = new THREE.BoxBufferGeometry( 100, 100, 100, 4, 4, 4 );
    //var helperMaterial = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true } );
    //var helper = new THREE.Mesh( helperGeometry, helperMaterial );
    //scene.add( helper );
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false;
    var r = window.innerWidth / 480 * 640;
    renderer.setSize(window.innerWidth, r);
    //renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(renderer.domElement);
    //
    window.addEventListener('resize', onWindowResize, false);
    window.setTimeout(checkWebcam, 1000);
}
function checkWebcam() {
    if (controls.is_check == 1) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            var constraints = { video: { width: 640, height: 480, facingMode: 'environment' } };
            navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                // apply the stream to the video element used in the texture
                video.srcObject = stream;
                video.play();
                texture = new THREE.VideoTexture(video);
                scene.background = texture;
            }).catch(function (error) {
                console.error('Unable to access the camera/webcam.', error);
            });
        }
        else {
            console.error('MediaDevices interface not available.');
        }
    }
    else {
        window.setTimeout(checkWebcam, 1000);
    }
}
function animate() {
    window.requestAnimationFrame(animate);
    controls.update();
    //renderer.render( scene, camera );
    renderer.clear();
    renderer.render(scene, camera);
    renderer.clearDepth();
    renderer.render(scene2d, camera2d);
    // if (controls.beta_data >1.0 || controls.beta_data <-1.0)
    // {
    // 	let r:number = controls.beta_data > 1.0 ? 1.0 : controls.beta_data;
    // 	r = r < 0.0 ? 0.0 : r;
    // 	let h:number = window.innerHeight;
    // 	bubble_button.position.set( GetW(0), (-h / 2 - GetH( 512 ) ) * (1-r)  , 0);
    // }
}
function onWindowResize() {
    camera.aspect = ratio;
    camera.updateProjectionMatrix();
    camera2d.aspect = ratio;
    camera2d.updateProjectionMatrix();
    var r = window.innerWidth / 480 * 640;
    renderer.setSize(window.innerWidth, r);
    //renderer.setSize( window.innerWidth, window.innerHeight );
}
function OnCapture() {
    var w = window.open('', '');
    w.document.title = "Screenshot";
    var img = new Image();
    renderer.render(scene, camera);
    img.src = renderer.domElement.toDataURL();
    w.document.body.appendChild(img);
}
function GetCapture() {
    var img = new Image();
    renderer.render(scene, camera);
    return renderer.domElement.toDataURL();
}
