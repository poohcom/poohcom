/// <reference path="../scripts/typings/three/index.d.ts" />
/// <reference path="../scripts/typings/three/detector.d.ts" />
/// <reference path="../scripts/typings/stats.js/index.d.ts" />
/// <reference path="../scripts/typings/dat-gui/index.d.ts" />

class SceneManager
{

    private static _instance: SceneManager = null;

    public static instance(): SceneManager {
        if (SceneManager._instance === null) {
            SceneManager._instance = new SceneManager();
        }
        return SceneManager._instance;
    }

    constructor() {
        if (SceneManager._instance) {
            throw new Error("Error: Config instead of new.");
        }
        SceneManager._instance = this;
    }


    public container: any;
    public stats: any;
    public camera: any;
    public scene: THREE.Scene;
    public renderer: any;
    //public pivot: THREE.Object3D;
    public canvas: any;
    public controls:THREE.TrackballControls

    private svgmap: THREE.Texture;
    private light: THREE.DirectionalLight;
    public init(): void
    {
        
        if (!Detector.webgl) Detector.addGetWebGLMessage();


        var menu: Menu = new Menu();
        menu.init();

        this.canvas = document.getElementById('sceneCanvas');
        
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100000);
        this.camera.position.z = 5000;
        this.camera.position.y = 1000;

        this.scene = new THREE.Scene();
        
        var object;
        //this.scene.add(new THREE.AmbientLight(0x777777));
        this.scene.add(new THREE.AmbientLight(0xffffff));
        this.light = new THREE.DirectionalLight(0xffffff);
        this.light.position.set(-100, -50, 100);

        this.scene.add(this.light);

        object = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 50);
        object.position.set(400, 0, -200).normalize();
        this.scene.add(object);
        //

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
            
        }
        );
        //this.renderer.setClearColor(0xffffff);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        //this.container.appendChild(this.renderer.domElement);


        this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement );
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = false;
        this.controls.noPan = false;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;


        var helper = new THREE.GridHelper(10000, 50, 0xFF4444, 0x404040);
        this.scene.add(helper);

        //this.stats = new Stats();
        //this.container.appendChild(this.stats.dom);
        //
        window.addEventListener('resize', onWindowResize, false);

        var THIS = this;
        function onWindowResize(): void {

            THIS.camera.aspect = window.innerWidth / window.innerHeight;
            //this.camera.lookAt(this.cameraTarget);
            THIS.camera.updateProjectionMatrix();
            THIS.renderer.setSize(window.innerWidth, window.innerHeight);
            THIS.controls.handleResize();
        }





        this.animate();

    }

    public addTexture(map: THREE.Texture): void
    {
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 16;
        this.svgmap = map;
        this.changeMaterialMap();
    }
    //
    public animate():void {
        requestAnimationFrame(SceneManager.instance().animate);
        SceneManager.instance().render();
        //SceneManager.instance().stats.update();

    }
    public render(): void {

        this.controls.update();
        this.renderer.render(this.scene, this.camera);


        //this.light.position.set(-100, -50, 100);

        //var timer = Date.now() * 0.00025;

        //this.light.position.x = Math.sin(timer * 7) * 300;
        //this.light.position.y = Math.cos(timer * 5) * 400;
        //this.light.position.z = Math.cos(timer * 3) * 300;

    }


    public addSVG(svgDoc: Document): void
    {
        var list: THREE.Object3D[] = this.scene.children;
        for (var i: number = list.length-1; i >=0; i--) {
            if (list[i] instanceof THREE.Mesh) {
                this.scene.remove(list[i]);
            }
        }
        var svg: SVGBox = new SVGBox();
        svg.init(svgDoc);
    }

    

    public addFace(faceMap: Map<string, BoxFace>, w: number, h: number): void
    {
        var map = new THREE.TextureLoader().load('textures/UV_Grid_Sm2.jpg');
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 16;
        this.svgmap = map;

        var count: number = 0;
        for (var key of faceMap.keys()) {

            var list: string[] = faceMap.get(key).list.split(",");

            var shape: THREE.Shape = new THREE.Shape();

            for (var i: number = 0; i < list.length / 2 - 1; i++) {
                if (i == 0) {
                    shape.moveTo(parseFloat(list[0]) / w, -parseFloat(list[1]) / h);
                } else {
                    shape.lineTo(parseFloat(list[i * 2]) / w, -parseFloat(list[i * 2 + 1]) / h);
                }
            }
            var geometry = new THREE.ShapeGeometry(shape);
            var mesh = new THREE.Mesh(geometry);
            mesh.position.set(0, h, 0);
            mesh.scale.set(w, h, 100);
            this.scene.add(mesh);
        }

        this.changeMaterial();
    }

    
    public changeMaterial():void
    {

        var list: THREE.Object3D[] = this.scene.children;

        var alpha: number = 0.5;
        var beta: number = 1;
        var gamma: number = 0.5;

        var specularShininess = Math.pow(2, alpha * 10);
        var specularColor = new THREE.Color(beta * 0.2, beta * 0.2, beta * 0.2);
        var diffuseColor = new THREE.Color().setHSL(alpha, 0.5, gamma * 0.5).multiplyScalar(1 - beta * 0.2);
        var bumpScale = 10;


        var material = new THREE.MeshPhongMaterial({
            map: this.svgmap,
            bumpMap: this.svgmap,
            bumpScale: bumpScale,
            color: diffuseColor.getHex(),
            specular: specularColor.getHex(),
            reflectivity: beta,
            shininess: specularShininess,
            shading: THREE.SmoothShading,
            side: THREE.DoubleSide
        });

        for (var i: number = 0; i < list.length; i++) {
            if (list[i] instanceof THREE.Mesh) {
                (<THREE.Mesh>list[i]).material = material;
            }
        }
    }

    public changeMaterialMap(): void {

        var list: THREE.Object3D[] = this.scene.children;

        for (var i: number = 0; i < list.length; i++) {
            if (list[i] instanceof THREE.Mesh) {
                (<THREE.MeshPhongMaterial>(<THREE.Mesh>list[i]).material).map = this.svgmap;
                (<THREE.MeshPhongMaterial>(<THREE.Mesh>list[i]).material).bumpMap = this.svgmap;
            }
        }
    }

    public updateParams(params: any):void
    {
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

        var alpha: number = params.specularShininess;
        var reflectivity: number = params.reflectivity;
        var gamma: number = params.gamma;

        var specularShininess = Math.pow(2, alpha * 10);
        //var specularColor = new THREE.Color(reflectivity * 0.2, reflectivity * 0.2, reflectivity * 0.2);
        var specularColor = new THREE.Color(reflectivity , reflectivity , reflectivity );
        var diffuseColor = new THREE.Color().setHSL(alpha, 0.5, gamma * 0.5).multiplyScalar(1 - reflectivity * 0.2);
        var bumpScale = params.bumpScale;

        var list: THREE.Object3D[] = this.scene.children;

        var material = new THREE.MeshPhongMaterial({
            map: this.svgmap,
            bumpMap: this.svgmap,
            bumpScale: bumpScale,
            color: diffuseColor.getHex(),
            specular: specularColor.getHex(),
            reflectivity: reflectivity,
            shininess: specularShininess,
            shading: THREE.SmoothShading,
            side: THREE.DoubleSide
        });

        for (var i: number = 0; i < list.length; i++) {
            if (list[i] instanceof THREE.Mesh) {
                (<THREE.Mesh>list[i]).material = material;
            }
        }

    }
} 

