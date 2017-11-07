/// <reference path="../scripts/typings/three/index.d.ts" />
/// <reference path="../scripts/typings/three/detector.d.ts" />
/// <reference path="../scripts/typings/stats.js/index.d.ts" />
/// <reference path="../scripts/typings/dat-gui/index.d.ts" />
var SceneManager = (function () {
    function SceneManager() {
        this.lastTime = 0;
        if (SceneManager._instance) {
            throw new Error("Error: Config instead of new.");
        }
        SceneManager._instance = this;
    }
    SceneManager.instance = function () {
        if (SceneManager._instance === null) {
            SceneManager._instance = new SceneManager();
        }
        return SceneManager._instance;
    };
    SceneManager.prototype.init = function () {
        this.autorotate = false;
        this.autorotateSpeed = 1;
        this.autorotateAxis = "x";
        if (!Detector.webgl)
            Detector.addGetWebGLMessage();
        this.selectPack = new BoxPack();
        var menu = new Menu();
        menu.init();
        this.canvas = document.getElementById('sceneCanvas');
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 100, 100000);
        this.camera.position.z = -10000;
        this.camera.position.y = 1000;
        this.createScene();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        // x,y 평면폄연 핼퍼
        this.helperXY = new THREE.GridHelper(10000, 50, 0xFF4444, 0x404040);
        this.helperXY.rotateX(Math.PI / 2.0);
        this.helperXY.position.z = -1;
        this.scene.add(this.helperXY);
        window.addEventListener('resize', onWindowResize, false);
        var THIS = this;
        function onWindowResize() {
            THIS.camera.aspect = window.innerWidth / window.innerHeight;
            THIS.camera.updateProjectionMatrix();
            THIS.renderer.setSize(window.innerWidth, window.innerHeight);
            //THIS.controls.handleResize();
        }
        this.animate();
        this.raycaster = new THREE.Raycaster();
        //document.addEventListener('mousedown', onDocumentMouseDown, false);
        this.renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        function onDocumentMouseDown(e) {
            SceneManager.instance().click(e);
        }
    };
    SceneManager.prototype.createScene = function () {
        this.scene = new THREE.Scene();
        this.scene.rotateX(-Math.PI / 2);
        //this.scene.rotateY(Math.PI);
        ////////////////////////////////////////
        var object;
        this.scene.add(new THREE.AmbientLight(0x777777));
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
        if (this.helperXY) {
            this.scene.add(this.helperXY);
        }
    };
    SceneManager.prototype.reset = function () {
        this.selectPack = new BoxPack();
        this.createScene();
        this.selectPack.refresh();
    };
    SceneManager.prototype.visibleMenu = function (flag) {
        this.helperXY.visible = flag;
    };
    SceneManager.prototype.visibleBound = function (flag) {
        //var list: THREE.Mesh[] = SceneManager.instance().selectPack.getNode();
        var list = SceneManager.instance().selectPack.getNode();
        for (var i = 0; i < list.length; i++) {
            list[i].material.opacity = (flag == true) ? 0.2 : 0;
        }
    };
    SceneManager.prototype.click = function (e) {
        if (e.button != 0)
            return;
        e.preventDefault();
        //e.stopPropagation();
        var diffTime = Date.now() - this.lastTime;
        this.lastTime = Date.now();
        if (diffTime < 500) {
            this.clickDouble(e);
        }
    };
    SceneManager.prototype.clickDouble = function (e) {
        var mouseVector = new THREE.Vector3();
        mouseVector.x = 2 * (e.clientX / window.innerWidth) - 1;
        mouseVector.y = 1 - 2 * (e.clientY / window.innerHeight);
        this.raycaster.setFromCamera(mouseVector, this.camera);
        AnimationManager.instance().update();
        var intersects = this.raycaster.intersectObjects(SceneManager.instance().selectPack.getNode2(), true);
        if (intersects.length > 0) {
            var target = intersects[0];
            for (var i = 1; i < intersects.length; i++) {
                if (intersects[i].distance < target.distance) {
                    target = intersects[i];
                }
            }
            console.log("down intersects.length" + intersects.length + ":" + window.innerWidth + ":" + window.innerHeight + ":" + e.clientX + ":" + e.clientY);
            var v = target.point;
            v = v.sub(this.controls.target);
            v = v.divideScalar(30);
            var r = this.controls.doGetRange();
            var dr = Math.pow(r / 300, 1 / 30);
            if (r <= 300) {
                dr = 1;
            }
            var THIS = this;
            // 1.02337389
            //this.controls.doPan(window.innerWidth  - e.clientX * 2.0, window.innerHeight - e.clientY * 2.0);
            this.controls.lock = true;
            for (var i = 1; i < 30; i++) {
                setTimeout(function () {
                    THIS.controls.target.add(v);
                    if (dr != 1) {
                        THIS.controls.doDollyIn(1.02337389);
                    }
                }, 500 * i / 30);
            }
            setTimeout(function () {
                THIS.controls.lock = false;
            }, 500);
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
    };
    //
    SceneManager.prototype.animate = function () {
        requestAnimationFrame(SceneManager.instance().animate);
        SceneManager.instance().render();
    };
    SceneManager.prototype.render = function () {
        if (this.autorotate == true) {
            switch (this.autorotateAxis) {
                case "x":
                    this.scene.rotateX(0.001 * this.autorotateSpeed);
                    break;
                case "y":
                    this.scene.rotateY(0.001 * this.autorotateSpeed);
                    break;
                case "z":
                    this.scene.rotateZ(0.001 * this.autorotateSpeed);
                    break;
            }
        }
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        AnimationManager.instance().update();
    };
    SceneManager.prototype.setAutoRotate = function (flag) {
        this.autorotate = flag;
    };
    SceneManager.prototype.setAutoRotateSpeed = function (speed) {
        this.autorotateSpeed = speed;
    };
    SceneManager.prototype.setAutoRotateAxis = function (axis) {
        this.autorotateAxis = axis;
        this.scene.rotation.x = -Math.PI / 2;
        this.scene.rotation.y = 0;
        this.scene.rotation.z = 0;
    };
    SceneManager.prototype.changeMaterial = function () {
        this.updateMaterialParams(Menu.instance().materialParams);
    };
    SceneManager.prototype.updateMaterialParams = function (params) {
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
    };
    SceneManager.prototype.addBox3D = function (box3D) {
        // 전체 보이기 하기 위핼서
        box3D.traverse(function (child) {
            if (child instanceof THREE.Object3D) {
                child.frustumCulled = false;
            }
        });
        this.changeMaterial();
        AnimationManager.instance().addAnimate(box3D);
    };
    return SceneManager;
}());
SceneManager._instance = null;
//# sourceMappingURL=SceneManager.js.map