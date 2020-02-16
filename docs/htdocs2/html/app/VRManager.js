import * as THREE from '../../build/three.module.js';
import { FBXLoader } from '../jsm/loaders/FBXLoader.js';
import { Particle } from './Particle.js';
import { Ball } from './Ball.js';
export class VRManager {
    constructor() {
        this.IsTouching = false;
        this.textureLoader = new THREE.TextureLoader();
        this.IsTouchLock = false;
        this.screenIndex = 1;
        this.IsIOS13Permission = false;
        //public list: number[] = [-70, -7, 41, 72];
        this.list = [-71.8, -7, 41, 75.6];
        this.IsSwift = false;
        this.intersection = {
            intersects: false,
            point: new THREE.Vector3(),
            normal: new THREE.Vector3()
        };
        this.particleList = [];
        this.time = 0;
        this.position = new THREE.Vector3();
        this.orientation = new THREE.Euler();
        this.moved = false;
        this.IsInitPos = true;
        this.move_mouse = new THREE.Vector2();
        this.start_mouse = new THREE.Vector2();
        this.pos_mouse = new THREE.Vector2();
        this.shoesStartY = 0;
        this.IsZoom = false;
        this.loadCount = 0;
        // 	public Init():void
        // 	{
        // 		this.backboard_texture=this.textureLoader.load('models/vr2/backboard.png') ;
        // 		this.backlight_texture=this.textureLoader.load('models/vr2/backlight.png') ;
        // 		this.backwall1_texture=this.textureLoader.load('models/vr2/backwall1.png') ;
        // 		this.backwall2_texture=this.textureLoader.load('models/vr2/backwall2.png') ;
        // 		this.ball_texture=this.textureLoader.load('models/vr2/ball.png') ;
        // 		this.door_texture=this.textureLoader.load('models/vr2/door.png') ;
        // 		this.doorLighting_texture=this.textureLoader.load('models/vr2/doorLighting.png') ;
        // 		this.effect1_texture=this.textureLoader.load('models/vr2/effect1.png') ;
        // 		this.effect2_texture=this.textureLoader.load('models/vr2/effect2.png') ;
        // 		this.effect3_texture=this.textureLoader.load('models/vr2/effect3.png') ;
        // 		this.front_texture=this.textureLoader.load('models/vr2/front.png') ;
        // 		this.shoes_texture=this.textureLoader.load('models/vr2/shoesOnly.png') ;
        // 		this.shoesPillar_texture=this.textureLoader.load('models/vr2/shoespillar.png') ;
        // 		this.plant_texture=this.textureLoader.load('models/vr2/plant.png') ;
        // 		this.Spot_texture=this.textureLoader.load('models/vr2/Spot.png') ;
        // 		this.tv_texture=this.textureLoader.load('models/vr2/tv.png') ;
        // 		this.wall_3_texture=this.textureLoader.load('models/vr2/wall.jpg') ;
        // 	    this.weed_texture=this.textureLoader.load('models/vr2/weed.png') ;
        // 		this.weed1_texture=this.textureLoader.load('models/vr2/weed1.png') ;
        // 		this.weed02_texture=this.textureLoader.load('models/vr2/weed02.png') ;
        // 		this.frame70 = this.textureLoader.load('textures/vr/frame70.png', function ( texture ) {
        //             VRManager.Instance.Init2();
        //         });
        // 		//////////////////////////
        // 		this.move_mouse = new THREE.Vector2();
        // 		this.start_mouse= new THREE.Vector2();
        // 		this.pos_mouse = new THREE.Vector2();
        // 		this.container = document.getElementById('container3d');
        // 		this.clock = new THREE.Clock();
        // 		this.renderer = new THREE.WebGLRenderer({ antialias: true});
        // 		this.renderer.setPixelRatio(window.devicePixelRatio);
        // 		this.renderer.setSize(window.innerWidth, window.innerHeight);
        // 		this.container.appendChild(this.renderer.domElement);
        // 		this.scene = new THREE.Scene();
        // 		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 300);
        // 		// z 거리
        // 		//this.camera.position.set(0, 0, 70);
        // 		this.camera.target = new THREE.Vector3(this.list[this.screenIndex],0,0);
        // 		this.camera.position.set(this.list[this.screenIndex], 0, 70);
        // 		this.raycaster = new THREE.Raycaster();
        // 		window.addEventListener('resize', ()=>VRManager.Instance.onWindowResize(), false);
        // ////////////////////////
        // 		if ( false )
        // 		{
        // 			window.addEventListener('mousedown', function (event) {
        // 				VRManager.Instance.IsTouching =false;
        // 				VRManager.Instance.onTouchMove(event);
        // 				VRManager.Instance.onTouchStart();
        // 			}, false);
        // 			window.addEventListener('mouseup',function (event){
        // 				VRManager.Instance.onTouchMove(event);
        // 				VRManager.Instance.onMouseUp();
        // 			});
        // 			window.addEventListener('mousemove', (event)=>VRManager.Instance.onTouchMove(event) );
        // 		}
        // 		/////////////////////////
        // 		window.addEventListener('touchstart', function (event) {
        // 			VRManager.Instance.IsTouching =false;
        // 			VRManager.Instance.onTouchMove(event);
        // 			VRManager.Instance.onTouchStart();
        // 			/*
        // 			if ( VRManager.Instance.IsIOS13Permission==false)
        // 			{
        // 				if (window.DeviceOrientationEvent== undefined) 
        // 				{
        // 					VRManager.Instance.IsIOS13Permission = true;
        // 					console.log("not supprrt");
        // 				} else {
        // 					if (typeof DeviceOrientationEvent.requestPermission === 'function') { 
        // 						// iOS 13+ IsIOS13Permission
        // 						DeviceOrientationEvent.requestPermission() 
        // 						.then(response => { 
        // 							VRManager.Instance.IsIOS13Permission =true;
        // 						if (response == 'granted') { 
        // 							window.addEventListener('deviceorientation', (event)=>VRManager.Instance.handleOrientation(event), false);
        // 						} 
        // 						}) 
        // 						.catch ( console.error)
        // 					  } else { 
        // 						// iOS가 아닌 13 이상 
        // 						VRManager.Instance.IsIOS13Permission = true;
        // 						window.addEventListener('deviceorientation', (event)=>VRManager.Instance.handleOrientation(event), false);
        // 					  }
        // 				}
        // 			}
        // 			*/
        // 		}, false);
        // 		window.addEventListener('touchmove', (event)=>VRManager.Instance.onTouchMove(event));
        // 		window.addEventListener('touchend', function (event) {
        // 			VRManager.Instance.onTouchMove(event);
        // 			VRManager.Instance.onTouchEnd();
        // 		});
        // 		this.onWindowResize();
        // 		this.animate();
        // 		this.loadVR();
        // 		if (window.DeviceOrientationEvent== undefined) 
        // 		{
        // 			this.IsIOS13Permission = true;
        // 			console.log("not supprrt");
        //         } else {
        // 			if (typeof DeviceOrientationEvent.requestPermission === 'function') { 
        // 				// iOS 13+ IsIOS13Permission
        // 				DeviceOrientationEvent.requestPermission() 
        // 				.then(response => { 
        // 					VRManager.Instance.IsIOS13Permission =true;
        // 				if (response == 'granted') { 
        // 					window.addEventListener('deviceorientation', (event)=>VRManager.Instance.handleOrientation(event), false);
        // 				} 
        // 				}) 
        // 				.catch ( console.error)
        // 			  } else { 
        // 				// iOS가 아닌 13 이상 
        // 				this.IsIOS13Permission = true;
        // 				window.addEventListener('deviceorientation', (event)=>VRManager.Instance.handleOrientation(event), false);
        // 			  }
        // 		}
        // 	}
        this.rx = 0;
        this.ry = 0;
        this.sx = 0;
        this.sy = 0;
        this.IsFirstMove = false;
        this.IsFirstInit = false;
        this.ox = 0;
        this.oy = 0;
    }
    static get Instance() {
        if (!VRManager._Instance) {
            VRManager._Instance = new VRManager();
        }
        return VRManager._Instance;
    }
    animate() {
        requestAnimationFrame(() => this.animate());
        var dt = this.clock.getDelta();
        this.time += dt;
        var delta = dt * 1000;
        if (this.screenIndex == 2) {
            if (this.BallAni) {
                this.BallAni.update(delta);
            }
        }
        if (this.screenIndex == 1) {
            if (this.shoes) {
                this.shoes.position.y = this.shoesStartY + Math.sin(this.time) * 0.3;
            }
            if (this.Spot) {
                this.Spot.material.opacity = Math.sin(this.time * Math.PI) * 0.5 + 0.5;
            }
        }
        if (this.screenIndex == 3) {
            if (this.doorLighting) {
                this.doorLighting.material.opacity = Math.sin(this.time * Math.PI * 2.0) * 0.5 + 0.5;
            }
        }
        if (this.IsSwift == true) {
            var dx = (this.list[this.screenIndex] - this.camera.position.x) * 0.05;
            this.camera.position.x += dx;
            if (Math.abs(dx) < 0.01) {
                this.camera.position.x = this.list[this.screenIndex];
                this.IsSwift = false;
            }
        }
        if (this.IsZoom == true) {
            this.camera.position.z = this.camera.position.z - delta / 5.0;
            if (this.camera.position.z < 40) {
                this.camera.position.z = 40;
            }
        }
        this.particleList.forEach(function (element) {
            if (element.update(delta) == false) {
                element.reset();
            }
        });
        this.renderer.render(this.scene, this.camera);
    }
    StartZoom() {
        this.IsZoom = true;
    }
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    load1() {
        var THIS = this;
        this.backboard_texture = this.textureLoader.load('models/vr2/backboard.png', function (texture) {
            THIS.load2();
        });
    }
    load2() {
        var THIS = this;
        this.backlight_texture = THIS.textureLoader.load('models/vr2/backlight.png', function (texture) {
            THIS.load3();
        });
    }
    load3() {
        var THIS = this;
        this.backwall1_texture = this.textureLoader.load('models/vr2/backwall1.png', function (texture) {
            THIS.load4();
        });
    }
    load4() {
        var THIS = this;
        this.backwall2_texture = this.textureLoader.load('models/vr2/backwall2.png', function (texture) {
            THIS.load5();
        });
    }
    load5() {
        var THIS = this;
        this.ball_texture = this.textureLoader.load('models/vr2/ball.png', function (texture) {
            THIS.load6();
        });
    }
    load6() {
        var THIS = this;
        this.door_texture = this.textureLoader.load('models/vr2/door.png', function (texture) {
            THIS.load7();
        });
    }
    load7() {
        var THIS = this;
        this.doorLighting_texture = this.textureLoader.load('models/vr2/doorLighting.png', function (texture) {
            THIS.load8();
        });
    }
    load8() {
        var THIS = this;
        this.effect1_texture = this.textureLoader.load('models/vr2/effect1.png', function (texture) {
            THIS.load9();
        });
    }
    load9() {
        var THIS = this;
        this.effect2_texture = this.textureLoader.load('models/vr2/effect2.png', function (texture) {
            THIS.load10();
        });
    }
    load10() {
        var THIS = this;
        this.effect3_texture = this.textureLoader.load('models/vr2/effect3.png', function (texture) { THIS.InitScene(); });
    }
    load11() {
        var THIS = this;
        this.front_texture = this.textureLoader.load('models/vr2/front.png', function (texture) {
            THIS.load12();
        });
    }
    load12() {
        var THIS = this;
        this.shoes_texture = this.textureLoader.load('models/vr2/shoesOnly.png', function (texture) {
            THIS.load13();
        });
    }
    load13() {
        var THIS = this;
        this.shoesPillar_texture = this.textureLoader.load('models/vr2/shoespillar.png', function (texture) {
            THIS.load14();
        });
    }
    load14() {
        var THIS = this;
        this.plant_texture = this.textureLoader.load('models/vr2/plant.png', function (texture) {
            THIS.load15();
        });
    }
    load15() {
        var THIS = this;
        this.Spot_texture = this.textureLoader.load('models/vr2/Spot.png', function (texture) {
            THIS.load16();
        });
    }
    load16() {
        var THIS = this;
        this.tv_texture = this.textureLoader.load('models/vr2/tv.png', function (texture) {
            THIS.load17();
        });
    }
    load17() {
        var THIS = this;
        this.wall_3_texture = this.textureLoader.load('models/vr2/wall.jpg', function (texture) {
            THIS.load18();
        });
    }
    load18() {
        var THIS = this;
        this.weed_texture = this.textureLoader.load('models/vr2/weed.png', function (texture) {
            THIS.load19();
        });
    }
    load19() {
        var THIS = this;
        this.weed1_texture = this.textureLoader.load('models/vr2/weed1.png', function (texture) {
            THIS.load20();
        });
    }
    load20() {
        var THIS = this;
        this.weed02_texture = this.textureLoader.load('models/vr2/weed02.png', function (texture) { THIS.InitScene(); });
    }
    Init() {
        this.load1();
        this.load11();
    }
    InitScene() {
        this.loadCount++;
        if (this.loadCount < 2)
            return;
        this.frame70 = this.textureLoader.load('textures/vr/frame70.png', function (texture) {
            VRManager.Instance.Init2();
        });
        //////////////////////////
        this.move_mouse = new THREE.Vector2();
        this.start_mouse = new THREE.Vector2();
        this.pos_mouse = new THREE.Vector2();
        this.container = document.getElementById('container3d');
        this.clock = new THREE.Clock();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 300);
        // z 거리
        //this.camera.position.set(0, 0, 70);
        this.camera.target = new THREE.Vector3(this.list[this.screenIndex], 0, 0);
        this.camera.position.set(this.list[this.screenIndex], 0, 70);
        this.raycaster = new THREE.Raycaster();
        window.addEventListener('resize', () => VRManager.Instance.onWindowResize(), false);
        ////////////////////////
        if (false) {
            window.addEventListener('mousedown', function (event) {
                VRManager.Instance.IsTouching = false;
                VRManager.Instance.onTouchMove(event);
                VRManager.Instance.onTouchStart();
            }, false);
            window.addEventListener('mouseup', function (event) {
                VRManager.Instance.onTouchMove(event);
                VRManager.Instance.onMouseUp();
            });
            window.addEventListener('mousemove', (event) => VRManager.Instance.onTouchMove(event));
        }
        /////////////////////////
        window.addEventListener('touchstart', function (event) {
            VRManager.Instance.IsTouching = false;
            VRManager.Instance.onTouchMove(event);
            VRManager.Instance.onTouchStart();
            /*
            if ( VRManager.Instance.IsIOS13Permission==false)
            {
                if (window.DeviceOrientationEvent== undefined)
                {
                    VRManager.Instance.IsIOS13Permission = true;
                    console.log("not supprrt");
                } else {
                    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                        // iOS 13+ IsIOS13Permission
        
                        DeviceOrientationEvent.requestPermission()
                        .then(response => {
                            VRManager.Instance.IsIOS13Permission =true;
                        if (response == 'granted') {
                            window.addEventListener('deviceorientation', (event)=>VRManager.Instance.handleOrientation(event), false);
                        }
                        })
                        .catch ( console.error)
        
                      } else {
                        // iOS가 아닌 13 이상
                        VRManager.Instance.IsIOS13Permission = true;
                        window.addEventListener('deviceorientation', (event)=>VRManager.Instance.handleOrientation(event), false);
                      }
                }
                
            }
            */
        }, false);
        window.addEventListener('touchmove', (event) => VRManager.Instance.onTouchMove(event));
        window.addEventListener('touchend', function (event) {
            VRManager.Instance.onTouchMove(event);
            VRManager.Instance.onTouchEnd();
        });
        this.onWindowResize();
        this.animate();
        this.loadVR();
        if (window.DeviceOrientationEvent == undefined) {
            this.IsIOS13Permission = true;
            console.log("not supprrt");
        }
        else {
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                // iOS 13+ IsIOS13Permission
                DeviceOrientationEvent.requestPermission()
                    .then(response => {
                    VRManager.Instance.IsIOS13Permission = true;
                    if (response == 'granted') {
                        window.addEventListener('deviceorientation', (event) => VRManager.Instance.handleOrientation(event), false);
                    }
                })
                    .catch(console.error);
            }
            else {
                // iOS가 아닌 13 이상 
                this.IsIOS13Permission = true;
                window.addEventListener('deviceorientation', (event) => VRManager.Instance.handleOrientation(event), false);
            }
        }
    }
    handleOrientation(event) {
        console.log("handleOrientation");
        if (this.IsSwift == true)
            return;
        if (this.screenIndex != 1) {
            this.camera.lookAt(this.camera.position.x, this.camera.position.y, 0);
            return;
        }
        if (this.IsFirstMove == true) {
            this.camera.lookAt(this.camera.position.x, this.camera.position.y, 0);
            return;
        }
        var dx = 0;
        var dy = 0;
        if (this.IsFirstInit == false) {
            this.IsFirstInit = true;
            this.sy = (event.gamma ? event.gamma : 0);
            this.sx = (event.beta ? (event.beta - 45) : 0);
            this.ry = 0;
            this.rx = 0;
        }
        else {
            this.ry = (event.gamma ? event.gamma : 0);
            this.rx = (event.beta ? (event.beta - 45) : 0);
            dy = (this.ry - this.sy);
            dx = (this.rx - this.sx);
            dy = Math.min(dy, 1.0);
            dy = Math.max(dy, -1.0);
            dx = Math.min(dx, 1.0);
            dx = Math.max(dx, -1.0);
            dy = dy / 20;
            dx = dx / 20;
        }
        this.sy = this.ry;
        this.sx = this.rx;
        this.ox += dx;
        this.oy += dy;
        this.oy = Math.min(this.oy, 1.0);
        this.oy = Math.max(this.oy, -1.0);
        this.ox = Math.min(this.ox, 1.0);
        this.ox = Math.max(this.ox, -1.0);
        //console.log("d:"+this.ox+":"+this.oy);
        this.camera.lookAt(this.list[this.screenIndex] + this.oy * 4, this.ox * 1, 0);
        this.camera.position.x = this.list[this.screenIndex] - this.oy * 8;
        this.camera.position.y = -this.ox * 2;
    }
    loadVR() {
        var loader = new FBXLoader();
        var THIS = this;
        loader.load('models/vr2/studio1105.fbx', function (object) {
            object.traverse(function (child) {
                if (child.isMesh) {
                    console.log(child.name);
                    //child.visible =false;
                    if (child.name == "back_board") {
                        child.material = THIS.GetMaterial(THIS.backboard_texture);
                        THIS.backboard = child; // 농구대
                    }
                    else if (child.name == "backlight") {
                        child.material = THIS.GetMaterial(THIS.backlight_texture);
                        THIS.backlight = child;
                    }
                    else if (child.name == "door") {
                        child.material = THIS.GetMaterial(THIS.door_texture);
                        THIS.door = child;
                    }
                    else if (child.name == "doorLighting") {
                        child.material = THIS.GetMaterial(THIS.doorLighting_texture);
                        THIS.doorLighting = child;
                        //child.visible =true;
                    }
                    else if (child.name == "ball") {
                        child.material = THIS.GetMaterial(THIS.ball_texture);
                        THIS.ball = child;
                    }
                    else if (child.name == "effect1") {
                        child.material = THIS.GetMaterial(THIS.effect1_texture);
                        THIS.effect1 = child;
                    }
                    else if (child.name == "effect2") {
                        child.material = THIS.GetMaterial(THIS.effect2_texture);
                        THIS.effect2 = child;
                    }
                    else if (child.name == "effect3") {
                        child.material = THIS.GetMaterial(THIS.effect3_texture);
                        THIS.effect3 = child;
                    }
                    else if (child.name == "front") {
                        child.material = THIS.GetMaterial(THIS.front_texture);
                        THIS.front = child;
                        //child.visible =false;
                    }
                    else if (child.name == "Plant") {
                        child.material = THIS.GetMaterial(THIS.plant_texture);
                        THIS.plant = child;
                    }
                    else if (child.name == "polySurface2") {
                        child.material = THIS.GetMaterialNoAlpha(THIS.backwall1_texture);
                        THIS.backwall1 = child;
                    }
                    else if (child.name == "polySurface3") {
                        child.material = THIS.GetMaterialNoAlpha(THIS.backwall2_texture);
                        THIS.backwall2 = child;
                    }
                    else if (child.name == "Shoes") {
                        child.material = THIS.GetMaterial(THIS.shoes_texture);
                        THIS.shoes = child;
                        THIS.shoesStartY = THIS.shoes.position.y;
                    }
                    else if (child.name == "shoesPillar") {
                        child.material = THIS.GetMaterial(THIS.shoesPillar_texture);
                        THIS.shoesPillar = child;
                    }
                    else if (child.name == "Spot") {
                        child.material = THIS.GetMaterial(THIS.Spot_texture);
                        THIS.Spot = child;
                    }
                    else if (child.name == "Tv") {
                        child.material = THIS.GetMaterial(THIS.tv_texture);
                        THIS.tv = child;
                    }
                    else if (child.name == "wall") {
                        child.material = THIS.GetMaterialNoAlpha(THIS.wall_3_texture);
                        THIS.wall_3 = child;
                        //child.visible =false;
                    }
                    else if (child.name == "weed") {
                        child.material = THIS.GetMaterial(THIS.weed_texture);
                        THIS.weed = child;
                    }
                    else if (child.name == "weed1") {
                        child.material = THIS.GetMaterial(THIS.weed1_texture);
                        THIS.weed1 = child;
                    }
                    else if (child.name == "weed2") {
                        child.material = THIS.GetMaterial(THIS.weed02_texture);
                        THIS.weed02 = child;
                    }
                    //child.castShadow = true;
                    //child.receiveShadow = true;
                }
            });
            THIS.backwall2.position.z = 0.0;
            THIS.backwall1.position.z = 0.01;
            THIS.wall_3.position.z = 0.02;
            THIS.weed02.position.z = 0.03;
            THIS.weed1.position.z = 0.04;
            THIS.weed.position.z = 0.05;
            THIS.backboard.position.z = 0.06;
            THIS.tv.position.z = 0.07;
            THIS.doorLighting.position.z = 0.08;
            THIS.doorLighting.position.y -= 0.3;
            THIS.door.position.z = 0.09;
            THIS.plant.position.z = 0.10;
            THIS.backlight.position.z = 0.11;
            THIS.ball.position.z = 0.12;
            THIS.shoes.position.z = 0.63;
            THIS.shoesPillar.position.z = 0.63;
            THIS.effect3.position.z = 1.14;
            THIS.effect2.position.z = 1.15;
            THIS.effect1.position.z = 1.16;
            THIS.Spot.position.z = 1.17;
            THIS.front.position.z = 1.18;
            THIS.door.rotation.x = Math.PI / 2.0;
            THIS.doorLighting.rotation.x = Math.PI / 2.0;
            THIS.backlight.rotation.x = Math.PI / 2.0;
            THIS.effect1.rotation.x = Math.PI / 2.0;
            THIS.effect2.rotation.x = Math.PI / 2.0;
            THIS.effect3.rotation.x = Math.PI / 2.0;
            THIS.shoes.rotation.x = Math.PI / 2.0;
            THIS.plant.rotation.x = Math.PI / 2.0;
            THIS.Spot.rotation.x = Math.PI / 2.0;
            object.scale.set(2.0, 2.0, 1.0);
            object.position.x = 0;
            object.position.y = 0;
            object.position.z = 0;
            THIS.BallAni = new Ball(THIS.ball);
            THIS.scene.add(object);
            THIS.mesh = object;
        });
    }
    GetMaterial(diffuse) {
        var phongMaterial = new THREE.MeshBasicMaterial({
            map: diffuse,
            transparent: true,
            depthTest: false,
            depthWrite: true,
            opacity: 1.0,
            color: 0xffffff,
            side: THREE.DoubleSide
        });
        return phongMaterial;
    }
    GetMaterialNoAlpha(diffuse) {
        var phongMaterial = new THREE.MeshBasicMaterial({
            map: diffuse,
            transparent: false,
            depthTest: true,
            depthWrite: true,
            opacity: 1.0,
            color: 0xffffff,
            side: THREE.DoubleSide
        });
        return phongMaterial;
    }
    GetParticle() {
        var particle = new Particle(this.frame70);
        return particle;
    }
    Init2() {
        for (var i = 0; i < 500; i++) {
            var p = this.GetParticle();
            p.Init();
            this.particleList.push(p);
            this.scene.add(p.runner);
        }
    }
    OnIOS13Click() {
        if (VRManager.Instance.IsIOS13Permission == false) {
            if (window.DeviceOrientationEvent == undefined) {
                VRManager.Instance.IsIOS13Permission = true;
                console.log("not supprrt");
            }
            else {
                console.log("OnIOS13Click3");
                if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                    // iOS 13+ IsIOS13Permission
                    DeviceOrientationEvent.requestPermission()
                        .then(response => {
                        VRManager.Instance.IsIOS13Permission = true;
                        if (response == 'granted') {
                            window.addEventListener('deviceorientation', (event) => VRManager.Instance.handleOrientation(event), false);
                        }
                    })
                        .catch(console.error);
                }
                else {
                    // iOS가 아닌 13 이상 
                    VRManager.Instance.IsIOS13Permission = true;
                    window.addEventListener('deviceorientation', (event) => VRManager.Instance.handleOrientation(event), false);
                }
            }
        }
    }
    onTouchStart() {
        if (this.IsTouchLock == true)
            return;
        this.IsFirstMove = true;
        this.IsTouching = true;
        this.start_mouse.x = this.pos_mouse.x;
        this.start_mouse.y = this.pos_mouse.y;
        this.move_mouse.x = this.pos_mouse.x;
        this.move_mouse.y = this.pos_mouse.y;
        this.moved = false;
    }
    onMouseUp() {
        if (this.IsTouchLock == true)
            return;
        this.IsTouching = false;
        if (((this.pos_mouse.x - this.start_mouse.x) * (this.pos_mouse.x - this.start_mouse.x)) > 0.04) {
            this.moved = true;
            if (this.pos_mouse.x > this.start_mouse.x) {
                this.SwiftLeft();
            }
            else {
                this.SwiftRight();
            }
        }
        else {
            this.moved = false;
        }
    }
    onTouchEnd() {
        if (this.IsTouchLock == true)
            return;
        this.IsTouching = false;
        if (((this.pos_mouse.x - this.start_mouse.x) * (this.pos_mouse.x - this.start_mouse.x) * window.innerWidth * window.innerWidth) > window.innerWidth * window.innerWidth * 0.04) {
            this.moved = true;
            if (this.pos_mouse.x > this.start_mouse.x) {
                this.SwiftLeft();
            }
            else {
                this.SwiftRight();
            }
        }
        else {
            this.moved = false;
        }
        this.IsFirstMove = false;
    }
    SwiftLeft() {
        if (this.IsSwift == true)
            return;
        if (this.screenIndex <= 0) {
            this.screenIndex = 0;
        }
        else {
            this.IsSwift = true;
            this.screenIndex = this.screenIndex - 1;
            this.function1(this.screenIndex);
        }
        if (this.screenIndex == 2) {
            this.BallAni.reset();
        }
        if (this.screenIndex == 1) {
            this.IsFirstMove = false;
        }
    }
    SwiftRight() {
        if (this.IsSwift == true)
            return;
        if (this.screenIndex >= 3) {
            this.screenIndex = 3;
        }
        else {
            this.IsSwift = true;
            this.screenIndex = this.screenIndex + 1;
            this.function1(this.screenIndex);
        }
        if (this.screenIndex == 2) {
            this.BallAni.reset();
        }
        if (this.screenIndex == 1) {
            this.IsFirstMove = false;
        }
    }
    onTouchMove(event) {
        if (this.IsTouchLock == true)
            return;
        var x;
        var y;
        if (event.changedTouches) {
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
        }
        else {
            x = event.clientX;
            y = event.clientY;
        }
        this.pos_mouse.x = (x / window.innerWidth) * 2 - 1;
        this.pos_mouse.y = -(y / window.innerHeight) * 2 + 1;
    }
    SetFunction(f) {
        this.function1 = f;
    }
    CheckIntersection() {
        if (!this.mesh)
            return;
    }
    OnClick() {
        this.StartZoom();
    }
    Lock() {
        this.IsTouchLock = true;
    }
    UnLock() {
        this.IsTouchLock = false;
    }
}
