/// <reference path="../scripts/typings/three/index.d.ts" />
/// <reference path="../scripts/typings/three/detector.d.ts" />
/// <reference path="../scripts/typings/stats.js/index.d.ts" />
/// <reference path="../scripts/typings/dat-gui/index.d.ts" />
class SceneManager {
    constructor() {
        if (SceneManager._instance) {
            throw new Error("Error: Config instead of new.");
        }
        SceneManager._instance = this;
    }
    static instance() {
        if (SceneManager._instance === null) {
            SceneManager._instance = new SceneManager();
        }
        return SceneManager._instance;
    }
    init() {
        if (!Detector.webgl)
            Detector.addGetWebGLMessage();
        this.selectPack = new BoxPack();
        var menu = new Menu();
        menu.init();
        this.canvas = document.getElementById('sceneCanvas');
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 100, 100000);
        //this.camera.up = new THREE.Vector3(0, 0, -1);
        this.camera.position.z = -10000;
        this.camera.position.y = -1000;
        this.scene = new THREE.Scene();
        this.scene.rotateX(Math.PI);
        //this.scene.rotateY(Math.PI);
        //this.camera.position.z = 5000;
        //this.camera.position.y = 1000;
        ////////////////////////////////////////
        var object;
        this.scene.add(new THREE.AmbientLight(0x777777));
        //this.scene.add(new THREE.AmbientLight(0xcccccc));
        this.light = new THREE.DirectionalLight(0xffffff);
        this.light.position.set(100, 50, 100);
        this.scene.add(this.light);
        object = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 100);
        //object.position.set(400, 0, -200).normalize();
        this.scene.add(object);
        object = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 50);
        this.scene.add(object);
        object = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 150);
        this.scene.add(object);
        //
        this.renderer = new THREE.WebGLRenderer({
            //canvas: this.canvas,
            antialias: true
        });
        //this.renderer.setClearColor(0xffffff);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        //this.container.appendChild(this.renderer.domElement);
        document.body.appendChild(this.renderer.domElement);
        this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = false;
        this.controls.noPan = false;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
        // x,y 폄연 핼퍼
        var helperXY = new THREE.GridHelper(10000, 50, 0xFF4444, 0x404040);
        helperXY.rotateX(Math.PI / 2.0);
        helperXY.position.z = -1;
        this.scene.add(helperXY);
        //this.stats = new Stats();
        //this.container.appendChild(this.stats.dom);
        //
        window.addEventListener('resize', onWindowResize, false);
        var THIS = this;
        function onWindowResize() {
            THIS.camera.aspect = window.innerWidth / window.innerHeight;
            //this.camera.lookAt(this.cameraTarget);
            THIS.camera.updateProjectionMatrix();
            THIS.renderer.setSize(window.innerWidth, window.innerHeight);
            THIS.controls.handleResize();
        }
        this.animate();
        this.raycaster = new THREE.Raycaster();
        //document.addEventListener('mousedown', onDocumentMouseDown, false);
        this.renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        function onDocumentMouseDown(e) {
            SceneManager.instance().click(e);
        }
    }
    click(e) {
        e.preventDefault();
        var mouseVector = new THREE.Vector3();
        mouseVector.x = 2 * (e.clientX / window.innerWidth) - 1;
        mouseVector.y = 1 - 2 * (e.clientY / window.innerHeight);
        this.raycaster.setFromCamera(mouseVector, this.camera);
        var intersects = this.raycaster.intersectObjects(SceneManager.instance().selectPack.getNode());
        if (intersects.length > 0) {
            console.log("down intersects.length" + intersects.length);
            SceneManager.instance().selectPack.selectItem(intersects[0].object);
        }
        else {
            SceneManager.instance().selectPack.selectItem(null);
        }
        //if (intersects.length > 0) {
        //    if (INTERSECTED != intersects[0].object) {
        //        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        //        INTERSECTED = intersects[0].object;
        //        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        //        INTERSECTED.material.emissive.setHex(0xff0000);
        //    }
        //} else {
        //    if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        //    INTERSECTED = null;
        //}
    }
    //
    animate() {
        requestAnimationFrame(SceneManager.instance().animate);
        SceneManager.instance().render();
    }
    render() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        AnimationManager.instance().update();
    }
    changeMaterial() {
        this.updateMaterialParams(Menu.instance().materialParams);
    }
    updateMaterialParams(params) {
        var colorValue = params.lightColor.replace('#', '');
        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }
        var rgba = hexToRgb(colorValue);
        this.light.color.r = rgba.r / 255.0;
        this.light.color.g = rgba.g / 255.0;
        this.light.color.b = rgba.b / 255.0;
        var alpha = params.specularShininess;
        var reflectivity = params.reflectivity;
        var gamma = params.gamma;
        var specularShininess = Math.pow(2, alpha * 10);
        var specularColor = new THREE.Color(reflectivity, reflectivity, reflectivity);
        var diffuseColor = new THREE.Color().setHSL(alpha, 0.5, gamma * 0.5).multiplyScalar(1 - reflectivity * 0.2);
        var bumpScale = params.bumpScale;
        this.selectPack.updateMaterialBox(bumpScale, diffuseColor.getHex(), specularColor.getHex(), reflectivity, specularShininess);
    }
    addBox3D(box3D) {
        this.changeMaterial();
        AnimationManager.instance().addAnimate(box3D);
    }
}
SceneManager._instance = null;
//# sourceMappingURL=SceneManager.js.map