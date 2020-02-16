import * as THREE from '../../build/three.module.js';
import { OrbitControls } from '../jsm/controls/OrbitControls.js';
import { FBXLoader } from '../jsm/loaders/FBXLoader.js';
import { DecalGeometry2 } from '../jsm/geometries/DecalGeometry2.js';
import { VertexShader } from './VertexShader.js';
import { FragmentShader } from './FragmentShader.js';
import { SceneManager } from './SceneManager.js';
import { VIEW } from './SceneManager.js';
//import { AlwaysStencilFunc } from '../../src/Three.js';
export class ModelManager {
    constructor() {
        this.textureLoader = new THREE.TextureLoader();
        this.scene = null;
        this.intersection = {
            intersects: false,
            point: new THREE.Vector3(),
            normal: new THREE.Vector3()
        };
        this.decals = [];
        this.time = 0;
        this.position = new THREE.Vector3();
        this.orientation = new THREE.Euler();
        this.size = new THREE.Vector3(10, 10, 10);
        this.moved = false;
        this.IsTouchLock = false;
        this.start_mouse = new THREE.Vector2();
        this.pos_mouse = new THREE.Vector2();
        this.windowHeight = 0;
        this.ratio = 1;
        this.type = 0;
        this.loadCount = 0;
    }
    static get Instance() {
        if (!ModelManager._Instance) {
            ModelManager._Instance = new ModelManager();
        }
        return ModelManager._Instance;
    }
    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
        this.renderer.clearDepth();
        if (this.IsTouchLock == false) {
            this.renderer.render(this.scene2D, this.camera2D);
        }
        SceneManager.Instance.Update();
        //console.log("a:"+this.controls.getAzimuthalAngle() +":" +this.controls.getPolarAngle() +":"+this.controls.getScale());
    }
    SetPos(target, source) {
        target.position.set(source.position.x, source.position.y, source.position.z);
    }
    ClearButton() {
        this.check1_button.visible = false;
        this.check2_button.visible = false;
        this.badge_a_button.visible = false;
        this.badge_b_button.visible = false;
        this.label_a_button.visible = false;
        this.label_b_button.visible = false;
        this.label_c_button.visible = false;
        this.bg_prev_button.visible = false;
        this.bg_next_button.visible = false;
        this.line_a_button.visible = false;
        this.line_b_button.visible = false;
        this.line_c_button.visible = false;
        this.line_d_button.visible = false;
    }
    GetMaterialAlpha(diffuse, normal) {
        var phongMaterial = new THREE.MeshPhongMaterial({
            map: diffuse,
            bumpMap: normal,
            alphaMap: this.white,
            bumpScale: 0.2,
            shininess: 10,
            emissive: 0x0,
            opacity: 1,
            transparent: true
        });
        phongMaterial.onBeforeCompile = function (shader) {
            shader.vertexShader = VertexShader.shader;
            shader.fragmentShader = FragmentShader.shader;
        };
        return phongMaterial;
    }
    //public GetMaterialEffect(diffuse:THREE.Texture, alphaMap:THREE.Texture ):THREE.MeshPhongMaterial
    GetMaterialEffect(diffuse) {
        var phongMaterial = new THREE.MeshPhongMaterial({
            map: diffuse,
            //alphaMap : alphaMap,
            bumpScale: 0.2,
            shininess: 10,
            emissive: 0x0,
            opacity: 1,
            transparent: true,
            depthTest: true,
            depthWrite: false,
        });
        //    phongMaterial.onBeforeCompile = function(shader:any) {
        // 	   shader.vertexShader = VertexShader.shader;
        // 	   shader.fragmentShader = FragmentShader.shader;
        //    }
        return phongMaterial;
    }
    GetMaterial(diffuse, normal) {
        var phongMaterial = new THREE.MeshPhongMaterial({
            map: diffuse,
            bumpMap: normal,
            bumpScale: 0.2,
            alphaMap: this.white,
            shininess: 10,
            emissive: 0x0,
            opacity: 1,
            transparent: false
        });
        phongMaterial.onBeforeCompile = function (shader) {
            shader.vertexShader = VertexShader.shader;
            shader.fragmentShader = FragmentShader.shader;
        };
        return phongMaterial;
    }
    GetMaterialLogo(diffuse, normal) {
        var phongMaterial = new THREE.MeshPhongMaterial({
            map: diffuse,
            bumpMap: normal,
            bumpScale: 0.2,
            color: 0xffffff,
            alphaMap: this.white,
            shininess: 10,
            emissive: 0x0,
            opacity: 1,
            transparent: false,
            depthTest: true,
            depthWrite: true,
            polygonOffset: true,
            polygonOffsetFactor: -4.0,
        });
        phongMaterial.onBeforeCompile = function (shader) {
            shader.vertexShader = VertexShader.shader;
            shader.fragmentShader = FragmentShader.shader;
        };
        return phongMaterial;
    }
    loadShoe() {
        var loader = new FBXLoader();
        var THIS = this;
        //loader.load('models/nike3/nike_ar.FBX', function (object) {
        loader.load('models/nike/nike_AR_FBX.FBX', function (object) {
            THIS.mixer = new THREE.AnimationMixer(object);
            //var action = mixer.clipAction(object.animations[0]);
            //action.play();
            object.traverse(function (child) {
                if (child.isMesh) {
                    console.log(child.name);
                    if (child.name == "nike_ar") {
                        child.material = THIS.GetMaterial(THIS.nike_ar_diffuse_BK, THIS.nike_ar_Normal);
                        THIS.mesh = child;
                        child.visible = true;
                    }
                    else if (child.name == "nike_logo") {
                        child.material = THIS.GetMaterialLogo(THIS.nike_logo_diffuse, THIS.nike_logo_Normal);
                        THIS.nike_logo = child;
                        child.visible = true;
                    }
                    else if (child.name == "nike_botton_1") {
                        child.material = THIS.GetMaterialAlpha(THIS.nike_badge_A_diffuse, THIS.nike_badge_A_Normal);
                        THIS.nike_botton_1 = child;
                        child.visible = true;
                    }
                    else if (child.name == "nike_botton_2") {
                        child.material = THIS.GetMaterialAlpha(THIS.nike_badge_A_diffuse, THIS.nike_badge_A_Normal);
                        THIS.nike_botton_2 = child;
                        child.visible = true;
                    }
                    else if (child.name == "nike_tag_1") {
                        child.material = THIS.GetMaterial(THIS.nike_tag_A_diffuse, THIS.nike_tag_A_Normal);
                        THIS.nike_tag_1 = child;
                        child.visible = true;
                    }
                    else if (child.name == "nike_tag_2") {
                        child.material = THIS.GetMaterial(THIS.nike_tag_B_diffuse, THIS.nike_tag_B_Normal);
                        THIS.nike_tag_2 = child;
                        child.visible = true;
                    }
                    else if (child.name == "nike_tag_3") {
                        child.material = THIS.GetMaterial(THIS.nike_tag_C_diffuse, THIS.nike_tag_C_Normal);
                        THIS.nike_tag_3 = child;
                        child.visible = true;
                    }
                    else if (child.name == "shoelace_down") {
                        child.material = THIS.GetMaterial(THIS.nike_shoelace_BC_BK, THIS.nike_shoelace_N);
                        THIS.shoelace_DOWN = child;
                        child.visible = true;
                    }
                    else if (child.name == "shoelace_up") {
                        child.material = THIS.GetMaterial(THIS.nike_shoelace_BC_BK, THIS.nike_shoelace_N);
                        THIS.shoelace_UP = child;
                        child.visible = true;
                    }
                    else if (child.name == "effect_1") {
                        //child.material = THIS.GetMaterialAlpha( THIS.effect_1_diffuse, null );
                        child.material = THIS.GetMaterialEffect(THIS.effect_1_diffuse);
                        THIS.effect_1 = child;
                        child.visible = false;
                    }
                    else if (child.name == "effect_002") {
                        child.material = THIS.GetMaterialEffect(THIS.effect_002_diffuse);
                        THIS.effect_002 = child;
                        child.visible = false;
                    }
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            object.scale.set(1.0, 1.0, 1.0);
            object.position.x = 2.1;
            object.position.y = -15.0; // 높이 /?
            object.position.z = 0; //
            //object.rotation.x = -Math.PI / 4.0;
            //object.rotation.y = Math.PI / 4.0;
            //object.rotation.z = Math.PI / 4.0;
            THIS.modelGroup.add(object);
            //THIS.nikeModel = object;
            SceneManager.Instance.SetView(VIEW.CUSTOM_VIEW);
        });
    }
    shoot() {
        this.position.copy(this.intersection.point);
        this.orientation.copy(this.mouseHelper.rotation);
        this.orientation.z = Math.random() * 2 * Math.PI;
        //var scale = params.minScale + Math.random() * (params.maxScale - params.minScale) ;
        var scale = 10.0 * this.controls.getScale() / 100.0;
        this.size.set(scale, scale, scale);
        var ratio = Math.random();
        var m; // = new THREE.Mesh(new DecalGeometry2(this.mesh, this.position, this.orientation, this.size), (Math.random() > 0.5) ?  this.decalMaterial:this.decalMaterial2 );
        if (ratio > 0.8) {
            m = new THREE.Mesh(new DecalGeometry2(this.mesh, this.position, this.orientation, this.size), this.decalMaterial);
        }
        else if (ratio > 0.6) {
            m = new THREE.Mesh(new DecalGeometry2(this.mesh, this.position, this.orientation, this.size), this.decalMaterial2);
        }
        else if (ratio > 0.4) {
            m = new THREE.Mesh(new DecalGeometry2(this.mesh, this.position, this.orientation, this.size), this.decalMaterial3);
        }
        else if (ratio > 0.2) {
            m = new THREE.Mesh(new DecalGeometry2(this.mesh, this.position, this.orientation, this.size), this.decalMaterial4);
        }
        else {
            m = new THREE.Mesh(new DecalGeometry2(this.mesh, this.position, this.orientation, this.size), this.decalMaterial5);
        }
        this.decals.push(m);
        //this.scene.add(m);
        this.modelGroup.add(m);
    }
    removeDecals() {
        var THIS = this;
        this.decals.forEach(function (d) {
            THIS.modelGroup.remove(d);
        });
        this.decals = [];
    }
    onWindowResize() {
        if (this.windowHeight > window.innerHeight)
            return;
        this.windowHeight = window.innerHeight;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera2D.aspect = window.innerWidth / window.innerHeight;
        this.camera2D.updateProjectionMatrix();
        var r = window.innerHeight / window.innerWidth;
        if (r < (16 / 10 + 16 / 9) / 2) {
            this.ratio = 1;
        }
        else if (r < (18.5 / 9 + 16 / 9) / 2) {
            this.ratio = 2;
        }
        else if (r < (19.5 / 9 + 18.5 / 9) / 2) {
            this.ratio = 3;
        }
        else {
            this.ratio = 4;
        }
        if (this.scene != null) {
            this.SetBackground(this.type);
        }
    }
    SetBackground(type) {
        this.type = type;
        this.scene.background = this.textureLoader.load('textures/select/' + this.type + '_' + this.ratio + '.jpg');
    }
    // public load1():void{var THIS =this;this.nike_ar_diffuse_BK = this.textureLoader.load('models/nike/nike_AR_BK1_BC.jpg', function(texture){THIS.load2();});}
    // public load2():void{var THIS =this;this.nike_ar_diffuse_wh = this.textureLoader.load('models/nike/nike_AR_WH_BC.jpg' , function(texture){THIS.load3();});}
    // public load3():void{var THIS =this;this.nike_ar_Normal=this.textureLoader.load('models/nike/nike_AR_nike_N.jpg' , function(texture){THIS.load4();});}
    // public load4():void{var THIS =this;this.nike_logo_diffuse=this.textureLoader.load('models/nike/logo_BC.jpg' , function(texture){THIS.load5();});}
    // public load5():void{var THIS =this;this.nike_logo_Normal=this.textureLoader.load('models/nike/logo_N.jpg' , function(texture){THIS.load6();});}
    // public load6():void{var THIS =this;this.nike_badge_A_diffuse=this.textureLoader.load('models/nike/badge_a_bc.jpg' , function(texture){THIS.load7();});}
    // public load7():void{var THIS =this;this.nike_badge_A_Normal=this.textureLoader.load('models/nike/badge_N.jpg' , function(texture){THIS.load8();});}
    // public load8():void{var THIS =this;this.nike_badge_B_diffuse=this.textureLoader.load('models/nike/badge_b_bc.jpg' , function(texture){THIS.load9();});}
    // public load9():void{var THIS =this;this.nike_badge_B_Normal=this.textureLoader.load('models/nike/badge_N.jpg' , function(texture){THIS.load10();});}
    // public load10():void{var THIS =this;this.nike_tag_A_diffuse=this.textureLoader.load('models/nike/tag_a_BC.jpg' , function(texture){THIS.load11();});}
    // public load11():void{var THIS =this; this.nike_tag_A_Normal=this.textureLoader.load('models/nike/tag_N.jpg', function(texture){THIS.load12();});}
    // public load12():void{var THIS =this; this.nike_tag_B_diffuse=this.textureLoader.load('models/nike/tag_b_BC.jpg', function(texture){THIS.load13();});}
    // public load13():void{var THIS =this;this.nike_tag_B_Normal=this.textureLoader.load('models/nike/tag_N.jpg' , function(texture){THIS.load14();});}
    // public load14():void{var THIS =this;this.nike_tag_C_diffuse=this.textureLoader.load('models/nike/tag_c_BC.jpg' , function(texture){THIS.load15();});}
    // public load15():void{var THIS =this; this.nike_tag_C_Normal=this.textureLoader.load('models/nike/tag_N.jpg', function(texture){THIS.load16();});}
    // public load16():void{var THIS =this; this.nike_shoelace_BC_BK=this.textureLoader.load('models/nike/shoelace_BK_BC.jpg', function(texture){THIS.load17();});}
    // public load17():void{var THIS =this;this.nike_shoelace_BC_WH=this.textureLoader.load('models/nike/shoelace_WH_BC.jpg' , function(texture){THIS.load18();});}
    // public load18():void{var THIS =this;this.nike_shoelace_N=this.textureLoader.load('models/nike/shoelace_N.jpg' , function(texture){THIS.load19();});}
    // public load19():void{var THIS =this;this.effect_1_diffuse=this.textureLoader.load('models/nike/effect_bc.png' , function(texture){THIS.load20();});}
    // public load20():void{var THIS =this;this.effect_002_diffuse=this.textureLoader.load('models/nike/effect_bc.png' , function(texture){THIS.load21();});}
    // public load21():void{var THIS =this;this.decal_diffuse =this.textureLoader.load('textures/decal/decal-diffuse.png' , function(texture){THIS.load22();});}
    // public load22():void{var THIS =this;this.decal_diffuse2 =this.textureLoader.load('textures/decal/decal-diffuse2.png' , function(texture){THIS.load23();});}
    // public load23():void{var THIS =this;this.decal_diffuse3 =this.textureLoader.load('textures/decal/decal-diffuse3.png' , function(texture){THIS.load24();});}
    // public load24():void{var THIS =this;this.decal_diffuse4 =this.textureLoader.load('textures/decal/decal-diffuse4.png' , function(texture){THIS.load25();});}
    // public load25():void{var THIS =this;this.decal_diffuse5 =this.textureLoader.load('textures/decal/decal-diffuse5.png' , function(texture){THIS.load26();});}
    // public load26():void{var THIS =this;this.white = this.textureLoader.load('textures/decal/white.png' , function(texture){THIS.load27();});}
    // public load27():void{var THIS =this; this.check1_texture=this.textureLoader.load('textures/select/img_check1.png', function(texture){THIS.load28();});}
    // public load28():void{var THIS =this;this.check2_texture=this.textureLoader.load('textures/select/img_check2.png' , function(texture){THIS.load29();});}
    // public load29():void{var THIS =this;this.badge_a_button_texture=this.textureLoader.load('textures/select/img_badge2.png' , function(texture){THIS.load30();});}
    // public load30():void{var THIS =this; this.badge_b_button_texture=this.textureLoader.load('textures/select/img_badge1.png', function(texture){THIS.load31();});}
    // public load31():void{var THIS =this; this.label_a_button_texture=this.textureLoader.load('textures/select/img_label3.png', function(texture){THIS.load32();});}
    // public load32():void{var THIS =this; this.label_b_button_texture=this.textureLoader.load('textures/select/img_label2.png', function(texture){THIS.load33();});}
    // public load33():void{var THIS =this; this.label_c_button_texture=this.textureLoader.load('textures/select/img_label1.png', function(texture){THIS.load34();});}
    // public load34():void{var THIS =this; this.bg_prev_button_texture=this.textureLoader.load('textures/select/btn_left2.png', function(texture){THIS.load35();});}
    // public load35():void{var THIS =this; this.bg_next_button_texture=this.textureLoader.load('textures/select/btn_right2.png', function(texture){THIS.load36();});}
    // public load36():void{var THIS =this; this.line_a_button_texture=this.textureLoader.load('textures/select/img_lace1.png', function(texture){THIS.load37();});}
    // public load37():void{var THIS =this; this.line_b_button_texture=this.textureLoader.load('textures/select/img_lace2.png', function(texture){THIS.load38();});}
    // public load38():void{var THIS =this; this.line_c_button_texture=this.textureLoader.load('textures/select/img_lace3.png', function(texture){THIS.load39();});}
    // public load39():void{var THIS =this; this.line_d_button_texture=this.textureLoader.load('textures/select/img_lace4.png', function(texture){THIS.InitScene();});}
    load1() { var THIS = this; this.nike_ar_diffuse_BK = this.textureLoader.load('models/nike/nike_AR_BK1_BC.jpg', function (texture) { THIS.load2(); }); }
    load2() { var THIS = this; this.nike_ar_diffuse_wh = this.textureLoader.load('models/nike/nike_AR_WH_BC.jpg', function (texture) { THIS.load3(); }); }
    load3() { var THIS = this; this.nike_ar_Normal = this.textureLoader.load('models/nike/nike_AR_nike_N.jpg', function (texture) { THIS.load4(); }); }
    load4() { var THIS = this; this.nike_logo_diffuse = this.textureLoader.load('models/nike/logo_BC.jpg', function (texture) { THIS.load5(); }); }
    load5() { var THIS = this; this.nike_logo_Normal = this.textureLoader.load('models/nike/logo_N.jpg', function (texture) { THIS.load6(); }); }
    load6() { var THIS = this; this.nike_badge_A_diffuse = this.textureLoader.load('models/nike/badge_a_bc.jpg', function (texture) { THIS.load7(); }); }
    load7() { var THIS = this; this.nike_badge_A_Normal = this.textureLoader.load('models/nike/badge_N.jpg', function (texture) { THIS.load8(); }); }
    load8() { var THIS = this; this.nike_badge_B_diffuse = this.textureLoader.load('models/nike/badge_b_bc.jpg', function (texture) { THIS.load9(); }); }
    load9() { var THIS = this; this.nike_badge_B_Normal = this.textureLoader.load('models/nike/badge_N.jpg', function (texture) { THIS.load10(); }); }
    load10() { var THIS = this; this.nike_tag_A_diffuse = this.textureLoader.load('models/nike/tag_a_BC.jpg', function (texture) { THIS.InitScene(); }); }
    load11() { var THIS = this; this.nike_tag_A_Normal = this.textureLoader.load('models/nike/tag_N.jpg', function (texture) { THIS.load12(); }); }
    load12() { var THIS = this; this.nike_tag_B_diffuse = this.textureLoader.load('models/nike/tag_b_BC.jpg', function (texture) { THIS.load13(); }); }
    load13() { var THIS = this; this.nike_tag_B_Normal = this.textureLoader.load('models/nike/tag_N.jpg', function (texture) { THIS.load14(); }); }
    load14() { var THIS = this; this.nike_tag_C_diffuse = this.textureLoader.load('models/nike/tag_c_BC.jpg', function (texture) { THIS.load15(); }); }
    load15() { var THIS = this; this.nike_tag_C_Normal = this.textureLoader.load('models/nike/tag_N.jpg', function (texture) { THIS.load16(); }); }
    load16() { var THIS = this; this.nike_shoelace_BC_BK = this.textureLoader.load('models/nike/shoelace_BK_BC.jpg', function (texture) { THIS.load17(); }); }
    load17() { var THIS = this; this.nike_shoelace_BC_WH = this.textureLoader.load('models/nike/shoelace_WH_BC.jpg', function (texture) { THIS.load18(); }); }
    load18() { var THIS = this; this.nike_shoelace_N = this.textureLoader.load('models/nike/shoelace_N.jpg', function (texture) { THIS.load19(); }); }
    load19() { var THIS = this; this.effect_1_diffuse = this.textureLoader.load('models/nike/effect_bc.png', function (texture) { THIS.load20(); }); }
    load20() { var THIS = this; this.effect_002_diffuse = this.textureLoader.load('models/nike/effect_bc.png', function (texture) { THIS.InitScene(); }); }
    load21() { var THIS = this; this.decal_diffuse = this.textureLoader.load('textures/decal/decal-diffuse.png', function (texture) { THIS.load22(); }); }
    load22() { var THIS = this; this.decal_diffuse2 = this.textureLoader.load('textures/decal/decal-diffuse2.png', function (texture) { THIS.load23(); }); }
    load23() { var THIS = this; this.decal_diffuse3 = this.textureLoader.load('textures/decal/decal-diffuse3.png', function (texture) { THIS.load24(); }); }
    load24() { var THIS = this; this.decal_diffuse4 = this.textureLoader.load('textures/decal/decal-diffuse4.png', function (texture) { THIS.load25(); }); }
    load25() { var THIS = this; this.decal_diffuse5 = this.textureLoader.load('textures/decal/decal-diffuse5.png', function (texture) { THIS.load26(); }); }
    load26() { var THIS = this; this.white = this.textureLoader.load('textures/decal/white.png', function (texture) { THIS.load27(); }); }
    load27() { var THIS = this; this.check1_texture = this.textureLoader.load('textures/select/img_check1.png', function (texture) { THIS.load28(); }); }
    load28() { var THIS = this; this.check2_texture = this.textureLoader.load('textures/select/img_check2.png', function (texture) { THIS.load29(); }); }
    load29() { var THIS = this; this.badge_a_button_texture = this.textureLoader.load('textures/select/img_badge2.png', function (texture) { THIS.load30(); }); }
    load30() { var THIS = this; this.badge_b_button_texture = this.textureLoader.load('textures/select/img_badge1.png', function (texture) { THIS.InitScene(); }); }
    load31() { var THIS = this; this.label_a_button_texture = this.textureLoader.load('textures/select/img_label3.png', function (texture) { THIS.load32(); }); }
    load32() { var THIS = this; this.label_b_button_texture = this.textureLoader.load('textures/select/img_label2.png', function (texture) { THIS.load33(); }); }
    load33() { var THIS = this; this.label_c_button_texture = this.textureLoader.load('textures/select/img_label1.png', function (texture) { THIS.load34(); }); }
    load34() { var THIS = this; this.bg_prev_button_texture = this.textureLoader.load('textures/select/btn_left2.png', function (texture) { THIS.load35(); }); }
    load35() { var THIS = this; this.bg_next_button_texture = this.textureLoader.load('textures/select/btn_right2.png', function (texture) { THIS.load36(); }); }
    load36() { var THIS = this; this.line_a_button_texture = this.textureLoader.load('textures/select/img_lace1.png', function (texture) { THIS.load37(); }); }
    load37() { var THIS = this; this.line_b_button_texture = this.textureLoader.load('textures/select/img_lace2.png', function (texture) { THIS.load38(); }); }
    load38() { var THIS = this; this.line_c_button_texture = this.textureLoader.load('textures/select/img_lace3.png', function (texture) { THIS.load39(); }); }
    load39() { var THIS = this; this.line_d_button_texture = this.textureLoader.load('textures/select/img_lace4.png', function (texture) { THIS.InitScene(); }); }
    Init() {
        this.load1();
        this.load11();
        this.load21();
        this.load31();
    }
    InitScene() {
        this.loadCount++;
        if (this.loadCount < 4)
            return;
        this.start_mouse = new THREE.Vector2();
        this.pos_mouse = new THREE.Vector2();
        this.container = document.getElementById('container3d');
        this.clock = new THREE.Clock();
        // decal
        this.decalMaterial = new THREE.MeshPhongMaterial({
            map: this.nike_ar_diffuse_wh,
            bumpMap: this.nike_ar_Normal,
            bumpScale: 0.2,
            alphaMap: this.decal_diffuse,
            emissive: 0x0,
            shininess: 10,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -4.0,
            wireframe: false
        });
        this.decalMaterial.onBeforeCompile = function (shader) {
            shader.vertexShader = VertexShader.shader;
            shader.fragmentShader = FragmentShader.shader;
        };
        this.decalMaterial2 = new THREE.MeshPhongMaterial({
            map: this.nike_ar_diffuse_wh,
            bumpMap: this.nike_ar_Normal,
            bumpScale: 0.2,
            alphaMap: this.decal_diffuse2,
            emissive: 0x0,
            shininess: 10,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -4.0,
            wireframe: false
        });
        this.decalMaterial2.onBeforeCompile = function (shader) {
            shader.vertexShader = VertexShader.shader;
            shader.fragmentShader = FragmentShader.shader;
        };
        this.decalMaterial3 = new THREE.MeshPhongMaterial({
            map: this.nike_ar_diffuse_wh,
            bumpMap: this.nike_ar_Normal,
            bumpScale: 0.2,
            alphaMap: this.decal_diffuse3,
            emissive: 0x0,
            shininess: 10,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -4.0,
            wireframe: false
        });
        this.decalMaterial3.onBeforeCompile = function (shader) {
            shader.vertexShader = VertexShader.shader;
            shader.fragmentShader = FragmentShader.shader;
        };
        this.decalMaterial4 = new THREE.MeshPhongMaterial({
            map: this.nike_ar_diffuse_wh,
            bumpMap: this.nike_ar_Normal,
            bumpScale: 0.2,
            alphaMap: this.decal_diffuse4,
            emissive: 0x0,
            shininess: 10,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -4.0,
            wireframe: false
        });
        this.decalMaterial4.onBeforeCompile = function (shader) {
            shader.vertexShader = VertexShader.shader;
            shader.fragmentShader = FragmentShader.shader;
        };
        this.decalMaterial5 = new THREE.MeshPhongMaterial({
            map: this.nike_ar_diffuse_wh,
            bumpMap: this.nike_ar_Normal,
            bumpScale: 0.2,
            alphaMap: this.decal_diffuse5,
            emissive: 0x0,
            shininess: 10,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -4.0,
            wireframe: false
        });
        this.decalMaterial5.onBeforeCompile = function (shader) {
            shader.vertexShader = VertexShader.shader;
            shader.fragmentShader = FragmentShader.shader;
        };
        this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.autoClear = false;
        this.container.appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        //this.scene.background =this.bgdefault;
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        //camera.position.z = 120;
        // z 거리
        //this.camera.position.set(-10, 80, 40);
        this.camera.position.set(0, 100, 0);
        this.camera.target = new THREE.Vector3(0, 0, 0);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.minDistance = 50;
        this.controls.maxDistance = 300;
        this.controls.target.set(0, 0, 0);
        this.controls.enableKeys = false;
        this.controls.update();
        this.InitUI();
        this.scene.add(new THREE.AmbientLight(0x443333));
        var light = new THREE.DirectionalLight(0xffddcc, 1.2);
        light.position.set(1, 0.75, 0.5);
        this.scene.add(light);
        var light = new THREE.DirectionalLight(0xccccff, 1.2);
        light.position.set(-1, 0.75, -0.5);
        this.scene.add(light);
        var geometry = new THREE.BufferGeometry();
        geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
        this.modelGroup = new THREE.Group();
        this.scene.add(this.modelGroup);
        this.loadShoe();
        this.raycaster = new THREE.Raycaster();
        this.mouseHelper = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 10), new THREE.MeshNormalMaterial());
        this.mouseHelper.visible = false;
        this.scene.add(this.mouseHelper);
        window.addEventListener('resize', () => ModelManager.Instance.onWindowResize(), false);
        this.controls.addEventListener('change', function () {
        });
        window.addEventListener('mousedown', function (event) {
            ModelManager.Instance.onTouchMove(event);
            ModelManager.Instance.onTouchStart();
        }, false);
        window.addEventListener('touchstart', function (event) {
            ModelManager.Instance.onTouchMove(event);
            ModelManager.Instance.onTouchStart();
        }, false);
        window.addEventListener('mouseup', function (event) {
            ModelManager.Instance.onTouchMove(event);
            ModelManager.Instance.onMouseUp();
        });
        window.addEventListener('mousemove', (event) => ModelManager.Instance.onTouchMove(event));
        window.addEventListener('touchmove', (event) => ModelManager.Instance.onTouchMove(event));
        window.addEventListener('touchend', function (event) {
            ModelManager.Instance.onTouchMove(event);
            ModelManager.Instance.onTouchEnd();
        });
        this.onWindowResize();
        this.animate();
    }
    // public Init():void
    // {
    // 	this.nike_ar_diffuse_BK = this.textureLoader.load('models/nike/nike_AR_BK1_BC.jpg') ;
    // 	this.nike_ar_diffuse_wh = this.textureLoader.load('models/nike/nike_AR_WH_BC.jpg') ;
    // 	this.nike_ar_Normal=this.textureLoader.load('models/nike/nike_AR_nike_N.jpg') ;
    // 	this.nike_logo_diffuse=this.textureLoader.load('models/nike/logo_BC.jpg') ;
    // 	this.nike_logo_Normal=this.textureLoader.load('models/nike/logo_N.jpg') ;
    // 	this.nike_badge_A_diffuse=this.textureLoader.load('models/nike/badge_a_bc.jpg') ;
    // 	this.nike_badge_A_Normal=this.textureLoader.load('models/nike/badge_N.jpg') ;
    // 	this.nike_badge_B_diffuse=this.textureLoader.load('models/nike/badge_b_bc.jpg' );
    // 	this.nike_badge_B_Normal=this.textureLoader.load('models/nike/badge_N.jpg') ;
    // 	this.nike_tag_A_diffuse=this.textureLoader.load('models/nike/tag_a_BC.jpg') ;
    // 	this.nike_tag_A_Normal=this.textureLoader.load('models/nike/tag_N.jpg') ;
    // 	this.nike_tag_B_diffuse=this.textureLoader.load('models/nike/tag_b_BC.jpg' );
    // 	this.nike_tag_B_Normal=this.textureLoader.load('models/nike/tag_N.jpg') ;
    // 	this.nike_tag_C_diffuse=this.textureLoader.load('models/nike/tag_c_BC.jpg' );
    // 	this.nike_tag_C_Normal=this.textureLoader.load('models/nike/tag_N.jpg') ;
    // 	this.nike_shoelace_BC_BK=this.textureLoader.load('models/nike/shoelace_BK_BC.jpg') ;
    // 	this.nike_shoelace_BC_WH=this.textureLoader.load('models/nike/shoelace_WH_BC.jpg') ;
    // 	this.nike_shoelace_N=this.textureLoader.load('models/nike/shoelace_N.jpg') ;
    // 	this.effect_1_diffuse=this.textureLoader.load('models/nike/effect_bc.png') ;
    // 	this.effect_002_diffuse=this.textureLoader.load('models/nike/effect_bc.png') ;
    // 	this.decal_diffuse =this.textureLoader.load('textures/decal/decal-diffuse.png') ;
    // 	this.decal_diffuse2 =this.textureLoader.load('textures/decal/decal-diffuse2.png') ;
    // 	this.decal_diffuse3 =this.textureLoader.load('textures/decal/decal-diffuse3.png') ;
    // 	this.decal_diffuse4 =this.textureLoader.load('textures/decal/decal-diffuse4.png') ;
    // 	this.decal_diffuse5 =this.textureLoader.load('textures/decal/decal-diffuse5.png') ;
    // 	this.white = this.textureLoader.load('textures/decal/white.png') ;
    // 	this.check1_texture=this.textureLoader.load('textures/select/img_check1.png') ; // 125 125
    // 	this.check2_texture=this.textureLoader.load('textures/select/img_check2.png') ; // 134 183
    // 	this.badge_a_button_texture=this.textureLoader.load('textures/select/img_badge2.png') ; // 125 125
    // 	this.badge_b_button_texture=this.textureLoader.load('textures/select/img_badge1.png') ;
    // 	this.label_a_button_texture=this.textureLoader.load('textures/select/img_label3.png') ; // 134 183
    // 	this.label_b_button_texture=this.textureLoader.load('textures/select/img_label2.png') ; // 134 183
    // 	this.label_c_button_texture=this.textureLoader.load('textures/select/img_label1.png') ; // 134 183
    // 	this.bg_prev_button_texture=this.textureLoader.load('textures/select/btn_left2.png') ; // 35 x 78
    // 	this.bg_next_button_texture=this.textureLoader.load('textures/select/btn_right2.png') ; // 35 x 78
    // 	this.line_a_button_texture=this.textureLoader.load('textures/select/img_lace1.png') ; // 125
    // 	this.line_b_button_texture=this.textureLoader.load('textures/select/img_lace2.png') ; // 125
    // 	this.line_c_button_texture=this.textureLoader.load('textures/select/img_lace3.png') ; // 125
    // 	this.line_d_button_texture=this.textureLoader.load('textures/select/img_lace4.png') ; // 125
    // 	this.start_mouse= new THREE.Vector2();
    // 	this.pos_mouse = new THREE.Vector2();
    // 	this.container = document.getElementById('container3d');
    // 	this.clock = new THREE.Clock();
    // 	// decal
    // 	this.decalMaterial = new THREE.MeshPhongMaterial( {
    // 		map: this.nike_ar_diffuse_wh,
    // 		bumpMap : this.nike_ar_Normal,
    // 		bumpScale : 0.2,
    // 		alphaMap: this.decal_diffuse,
    // 		emissive: 0x0,
    // 		shininess: 10,
    // 		transparent: true,
    // 		depthTest: true,
    // 		depthWrite: false,
    // 		polygonOffset: true,
    // 		polygonOffsetFactor: -4.0,
    // 		wireframe: false
    // 	} );
    // 	this.decalMaterial.onBeforeCompile = function(shader:any) {
    // 		shader.vertexShader = VertexShader.shader;
    // 		shader.fragmentShader = FragmentShader.shader;        
    // 	}
    // 	this.decalMaterial2 = new THREE.MeshPhongMaterial( {
    // 		map: this.nike_ar_diffuse_wh,
    // 		bumpMap : this.nike_ar_Normal,
    // 		bumpScale : 0.2,
    // 		alphaMap: this.decal_diffuse2,
    // 		emissive: 0x0,
    // 		shininess: 10,
    // 		transparent: true,
    // 		depthTest: true,
    // 		depthWrite: false,
    // 		polygonOffset: true,
    // 		polygonOffsetFactor: -4.0,
    // 		wireframe: false
    // 	} );
    // 	this.decalMaterial2.onBeforeCompile = function(shader:any) {
    // 		shader.vertexShader = VertexShader.shader;
    // 		shader.fragmentShader = FragmentShader.shader;        
    // 	}
    // 	this.decalMaterial3 = new THREE.MeshPhongMaterial( {
    // 		map: this.nike_ar_diffuse_wh,
    // 		bumpMap : this.nike_ar_Normal,
    // 		bumpScale : 0.2,
    // 		alphaMap: this.decal_diffuse3,
    // 		emissive: 0x0,
    // 		shininess: 10,
    // 		transparent: true,
    // 		depthTest: true,
    // 		depthWrite: false,
    // 		polygonOffset: true,
    // 		polygonOffsetFactor: -4.0,
    // 		wireframe: false
    // 	} );
    // 	this.decalMaterial3.onBeforeCompile = function(shader:any) {
    // 		shader.vertexShader = VertexShader.shader;
    // 		shader.fragmentShader = FragmentShader.shader;        
    // 	}
    // 	this.decalMaterial4 = new THREE.MeshPhongMaterial( {
    // 		map: this.nike_ar_diffuse_wh,
    // 		bumpMap : this.nike_ar_Normal,
    // 		bumpScale : 0.2,
    // 		alphaMap: this.decal_diffuse4,
    // 		emissive: 0x0,
    // 		shininess: 10,
    // 		transparent: true,
    // 		depthTest: true,
    // 		depthWrite: false,
    // 		polygonOffset: true,
    // 		polygonOffsetFactor: -4.0,
    // 		wireframe: false
    // 	} );
    // 	this.decalMaterial4.onBeforeCompile = function(shader:any) {
    // 		shader.vertexShader = VertexShader.shader;
    // 		shader.fragmentShader = FragmentShader.shader;        
    // 	}
    // 	this.decalMaterial5 = new THREE.MeshPhongMaterial( {
    // 		map: this.nike_ar_diffuse_wh,
    // 		bumpMap : this.nike_ar_Normal,
    // 		bumpScale : 0.2,
    // 		alphaMap: this.decal_diffuse5,
    // 		emissive: 0x0,
    // 		shininess: 10,
    // 		transparent: true,
    // 		depthTest: true,
    // 		depthWrite: false,
    // 		polygonOffset: true,
    // 		polygonOffsetFactor: -4.0,
    // 		wireframe: false
    // 	} );
    // 	this.decalMaterial5.onBeforeCompile = function(shader:any) {
    // 		shader.vertexShader = VertexShader.shader;
    // 		shader.fragmentShader = FragmentShader.shader;        
    // 	}
    // 	this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    // 	this.renderer.setPixelRatio(window.devicePixelRatio);
    // 	this.renderer.setSize(window.innerWidth, window.innerHeight);
    // 	this.renderer.autoClear=false;
    // 	this.container.appendChild(this.renderer.domElement);
    // 	this.scene = new THREE.Scene();
    // 	//this.scene.background =this.bgdefault;
    // 	this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    // 	//camera.position.z = 120;
    // 	// z 거리
    // 	//this.camera.position.set(-10, 80, 40);
    // 	this.camera.position.set(0, 100, 0);
    // 	this.camera.target = new THREE.Vector3(0,0,0);
    // 	this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // 	this.controls.minDistance = 50;
    // 	this.controls.maxDistance = 300;
    // 	this.controls.target.set(0, 0, 0);
    // 	this.controls.enableKeys =false;
    // 	this.controls.update();
    // 	this.InitUI();
    // 	this.scene.add( new THREE.AmbientLight( 0x443333 ) );
    // 	var light = new THREE.DirectionalLight( 0xffddcc, 1.2 );
    // 	light.position.set( 1, 0.75, 0.5 );
    // 	this.scene.add( light );
    // 	var light = new THREE.DirectionalLight( 0xccccff, 1.2 );
    // 	light.position.set( - 1, 0.75, - 0.5 );
    // 	this.scene.add( light );
    // 	var geometry = new THREE.BufferGeometry();
    // 	geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    // 	this.modelGroup = new THREE.Group();	
    // 	this.scene.add(this.modelGroup);
    // 	this.loadShoe();
    // 	this.raycaster = new THREE.Raycaster();
    // 	this.mouseHelper = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 10), new THREE.MeshNormalMaterial());
    // 	this.mouseHelper.visible = false;
    // 	this.scene.add(this.mouseHelper);
    // 	window.addEventListener('resize', ()=>ModelManager.Instance.onWindowResize(), false);
    // 	this.controls.addEventListener('change', function () {
    // 	});
    // 	window.addEventListener('mousedown', function (event) {
    // 		ModelManager.Instance.onTouchMove(event);
    // 		ModelManager.Instance.onTouchStart();
    // 	}, false);
    // 	window.addEventListener('touchstart', function (event) {
    // 		ModelManager.Instance.onTouchMove(event);
    // 		ModelManager.Instance.onTouchStart();
    // 	}, false);
    // 	window.addEventListener('mouseup', function (event) {
    // 		ModelManager.Instance.onTouchMove(event);
    // 		ModelManager.Instance.onMouseUp();
    // 	});
    // 	window.addEventListener('mousemove', (event)=>ModelManager.Instance.onTouchMove(event) );
    // 	window.addEventListener('touchmove', (event)=>ModelManager.Instance.onTouchMove(event));
    // 	window.addEventListener('touchend', function (event) {
    // 		ModelManager.Instance.onTouchMove(event);
    // 		ModelManager.Instance.onTouchEnd();
    // 	});
    // 	this.onWindowResize();
    // 	this.animate();
    // }
    Lock() {
        this.IsTouchLock = true;
        this.controls.enabled = false;
    }
    UnLock() {
        this.IsTouchLock = false;
        this.controls.enabled = true;
    }
    GetW(w) {
        return window.innerWidth * w / 750;
    }
    GetH(h) {
        return window.innerHeight * h / 1107;
    }
    InitUI() {
        this.scene2D = new THREE.Scene();
        this.camera2D = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 0, 10);
        this.camera2D.position.z = 10;
        /// // 750  1107
        let w = window.innerWidth;
        let h = window.innerHeight;
        let bw = w / 4;
        var spriteMaterial = new THREE.SpriteMaterial({ map: this.badge_a_button_texture, color: 0xffffff });
        this.badge_a_button = new THREE.Sprite(spriteMaterial);
        this.badge_a_button.name = "badge_a_button";
        this.badge_a_button.position.set(-this.GetW(70), -h / 2 + this.GetH(125 + 125 / 2), 0);
        this.badge_a_button.scale.set(this.GetW(125), this.GetW(125), 1);
        this.badge_a_button.visible = false;
        this.scene2D.add(this.badge_a_button);
        var spriteMaterial = new THREE.SpriteMaterial({ map: this.badge_b_button_texture, color: 0xffffff });
        this.badge_b_button = new THREE.Sprite(spriteMaterial);
        this.badge_b_button.name = "badge_b_button";
        this.badge_b_button.position.set(this.GetW(70), -h / 2 + this.GetH(125 + 125 / 2), 0);
        this.badge_b_button.scale.set(this.GetW(125), this.GetW(125), 1);
        this.badge_b_button.visible = false;
        this.scene2D.add(this.badge_b_button);
        //////////////////////////////////
        // var spriteMaterial = new THREE.SpriteMaterial( { map: this.label_no_button_texture , color: 0xffffff } );
        // this.label_no_button = new THREE.Sprite( spriteMaterial );
        // this.label_no_button.name = "label_no_button";
        // this.label_no_button.position.set(-w/2 + w/8, -h / 2 +  this.GetH(125+183/2) , 0);
        // this.label_no_button.scale.set( this.GetW(125),this.GetH(125), 1 );
        // this.label_no_button.visible = false;
        // this.scene2D.add( this.label_no_button );
        var spriteMaterial = new THREE.SpriteMaterial({ map: this.label_a_button_texture, color: 0xffffff });
        this.label_a_button = new THREE.Sprite(spriteMaterial);
        this.label_a_button.name = "label_a_button";
        this.label_a_button.position.set(-w / 4, -h / 2 + this.GetH(125 + 183 / 2), 0);
        this.label_a_button.scale.set(this.GetW(134), this.GetW(183), 1);
        this.label_a_button.visible = false;
        this.scene2D.add(this.label_a_button);
        var spriteMaterial = new THREE.SpriteMaterial({ map: this.label_b_button_texture, color: 0xffffff });
        this.label_b_button = new THREE.Sprite(spriteMaterial);
        this.label_b_button.name = "label_b_button";
        this.label_b_button.position.set(0, -h / 2 + this.GetH(125 + 183 / 2), 0);
        this.label_b_button.scale.set(this.GetW(134), this.GetW(183), 1);
        this.label_b_button.visible = false;
        this.scene2D.add(this.label_b_button);
        var spriteMaterial = new THREE.SpriteMaterial({ map: this.label_c_button_texture, color: 0xffffff });
        this.label_c_button = new THREE.Sprite(spriteMaterial);
        this.label_c_button.name = "label_c_button";
        this.label_c_button.position.set(w / 4, -h / 2 + this.GetH(125 + 183 / 2), 0);
        this.label_c_button.scale.set(this.GetW(134), this.GetW(183), 1);
        this.label_c_button.visible = false;
        this.scene2D.add(this.label_c_button);
        ////////////
        var spriteMaterial = new THREE.SpriteMaterial({ map: this.bg_prev_button_texture, color: 0xffffff });
        this.bg_prev_button = new THREE.Sprite(spriteMaterial);
        this.bg_prev_button.name = "bg_prev_button";
        this.bg_prev_button.position.set(-w / 2 + this.GetW(60), 0, 0);
        this.bg_prev_button.scale.set(this.GetW(50), this.GetH(90), 1);
        this.bg_prev_button.visible = false;
        this.scene2D.add(this.bg_prev_button);
        var spriteMaterial = new THREE.SpriteMaterial({ map: this.bg_next_button_texture, color: 0xffffff });
        this.bg_next_button = new THREE.Sprite(spriteMaterial);
        this.bg_next_button.name = "bg_next_button";
        this.bg_next_button.position.set(w / 2 - this.GetW(60), 0, 0);
        this.bg_next_button.scale.set(this.GetW(50), this.GetH(90), 1);
        this.bg_next_button.visible = false;
        this.scene2D.add(this.bg_next_button);
        /////////////////
        var spriteMaterial = new THREE.SpriteMaterial({ map: this.line_a_button_texture, color: 0xffffff });
        this.line_a_button = new THREE.Sprite(spriteMaterial);
        this.line_a_button.name = "line_a_button";
        this.line_a_button.position.set(-w / 2 + w / 8, -h / 2 + this.GetH(125 + 186 / 2), 0);
        this.line_a_button.scale.set(this.GetW(125), this.GetW(186), 1);
        this.line_a_button.visible = false;
        this.scene2D.add(this.line_a_button);
        var spriteMaterial = new THREE.SpriteMaterial({ map: this.line_b_button_texture, color: 0xffffff });
        this.line_b_button = new THREE.Sprite(spriteMaterial);
        this.line_b_button.name = "line_b_button";
        this.line_b_button.position.set(-w / 2 + w / 8 + w / 4, -h / 2 + this.GetH(125 + 186 / 2), 0);
        this.line_b_button.scale.set(this.GetW(125), this.GetW(186), 1);
        this.line_b_button.visible = false;
        this.scene2D.add(this.line_b_button);
        var spriteMaterial = new THREE.SpriteMaterial({ map: this.line_c_button_texture, color: 0xffffff });
        this.line_c_button = new THREE.Sprite(spriteMaterial);
        this.line_c_button.name = "line_c_button";
        this.line_c_button.position.set(-w / 2 + w / 8 + w / 4 * 2, -h / 2 + this.GetH(125 + 186 / 2), 0);
        this.line_c_button.scale.set(this.GetW(125), this.GetW(186), 1);
        this.line_c_button.visible = false;
        this.scene2D.add(this.line_c_button);
        var spriteMaterial = new THREE.SpriteMaterial({ map: this.line_d_button_texture, color: 0xffffff });
        this.line_d_button = new THREE.Sprite(spriteMaterial);
        this.line_d_button.name = "line_d_button";
        this.line_d_button.position.set(-w / 2 + w / 8 + w / 4 * 3, -h / 2 + this.GetH(125 + 186 / 2), 0);
        this.line_d_button.scale.set(this.GetW(125), this.GetW(186), 1);
        this.line_d_button.visible = false;
        this.scene2D.add(this.line_d_button);
        var spriteMaterial = new THREE.SpriteMaterial({ map: this.check1_texture, color: 0xffffff });
        this.check1_button = new THREE.Sprite(spriteMaterial);
        this.check1_button.name = "check1_button";
        this.check1_button.position.set(-w / 4, -h / 2 + this.GetH(125 + 125 / 2), 0);
        this.check1_button.scale.set(this.GetW(125), this.GetW(125), 1);
        this.check1_button.visible = false;
        this.scene2D.add(this.check1_button);
        var spriteMaterial = new THREE.SpriteMaterial({ map: this.check2_texture, color: 0xffffff });
        this.check2_button = new THREE.Sprite(spriteMaterial);
        this.check2_button.name = "check2_button";
        this.check2_button.position.set(-w / 4, -h / 2 + this.GetH(125 + 183 / 2), 0);
        this.check2_button.scale.set(this.GetW(134), this.GetW(183), 1);
        this.check2_button.visible = false;
        this.scene2D.add(this.check2_button);
        var spriteMaterial = new THREE.SpriteMaterial({ map: this.redline_texture, color: 0xffffff });
        this.redline = new THREE.Sprite(spriteMaterial);
        this.redline.name = "redline";
        this.redline.position.set(0, -h / 1116 * 50, 0);
        //this.redline.scale.set(  w/2 , w/2, 1 );
        this.redline.scale.set(w / 752 * 507, h / 1116 * 596, 1);
        this.redline.visible = false;
        this.scene2D.add(this.redline);
    }
    InitCamera(degreeX, degreeY, degreeZ) {
        this.controls.reset();
        // this.modelGroup.rotation.x = -degreeX * Math.PI/ 180 ;
        //this.modelGroup.rotation.y = -degreeY * Math.PI/ 180 ;
        //this.modelGroup.rotation.z = -degreeZ * Math.PI/ 180 ;
        this.camera.position.x = degreeX;
        this.camera.position.y = degreeY;
        this.camera.position.z = degreeZ;
        this.controls.update();
    }
    onTouchStart() {
        this.start_mouse.x = this.pos_mouse.x;
        this.start_mouse.y = this.pos_mouse.y;
        this.moved = false;
    }
    onMouseUp() {
        if (this.IsTouchLock == true)
            return;
        //SceneManager.Instance.CheckIntersection();
        var d = ((this.pos_mouse.x - this.start_mouse.x)
            * (this.pos_mouse.x - this.start_mouse.x)
            + (this.pos_mouse.y - this.start_mouse.y) * (this.pos_mouse.y - this.start_mouse.y));
        if (d > 0.02) {
            this.moved = true;
        }
        else {
            this.moved = false;
        }
        if (!this.moved && this.intersection.intersects)
            SceneManager.Instance.OnClick();
    }
    onTouchEnd() {
        if (this.IsTouchLock == true)
            return;
        if (((this.pos_mouse.x - this.start_mouse.x)
            * (this.pos_mouse.x - this.start_mouse.x)
            + (this.pos_mouse.y - this.start_mouse.y) * (this.pos_mouse.y - this.start_mouse.y)) > 0.02) {
            this.moved = true;
        }
        else {
            this.moved = false;
        }
        if (!this.moved && this.intersection.intersects)
            SceneManager.Instance.OnClick();
    }
    onTouchMove(event) {
        if (this.IsTouchLock == true) {
            return;
        }
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
        //this.pos_mouse =new THREE.Vector2();
        this.pos_mouse.x = (x / window.innerWidth) * 2 - 1;
        this.pos_mouse.y = -(y / window.innerHeight) * 2 + 1;
        if (((this.pos_mouse.x - this.start_mouse.x)
            * (this.pos_mouse.x - this.start_mouse.x)
            + (this.pos_mouse.y - this.start_mouse.y) * (this.pos_mouse.y - this.start_mouse.y)) > 0.02) {
            this.moved = true;
        }
        else {
            this.moved = false;
        }
        SceneManager.Instance.CheckIntersection();
    }
    SetFunction(f) {
        this.function1 = f;
    }
    GoFuncton(target) {
        if (this.function1 != null) {
            //this.function1('.step1');
            this.function1(target);
        }
    }
    SaveImageAll() {
        try {
            var strMime = "image/jpeg";
            return this.renderer.domElement.toDataURL(strMime);
        }
        catch (e) {
            console.log(e);
        }
        return "";
    }
    SaveImage() {
        try {
            // var left:number = window.innerWidth/4*window.devicePixelRatio;
            // var top:number =window.innerHeight/2*window.devicePixelRatio-window.innerWidth/4*window.devicePixelRatio;
            // var width:number = window.innerWidth/2*window.devicePixelRatio;
            // var height:number = window.innerWidth/2*window.devicePixelRatio;
            // var left:number = window.innerWidth*window.devicePixelRatio / 752 * 124;
            // var width:number = window.innerWidth*window.devicePixelRatio / 752 * 507;
            // var height:number = width / 920 * 1080;
            // var top:number = window.innerHeight/2*window.devicePixelRatio - height/2;
            var left = window.innerWidth * window.devicePixelRatio / 342 * 25;
            var w = window.innerWidth * window.devicePixelRatio / 342 * 292;
            var h = w / 920 * 1080;
            //var top:number = window.innerHeight/2*window.devicePixelRatio - h/2;
            var top = window.innerHeight / 2 * window.devicePixelRatio - h / 2 * 0.9;
            let destCanvas = document.createElement('canvas');
            destCanvas.width = w;
            destCanvas.height = h;
            destCanvas.getContext("2d").drawImage(ModelManager.Instance.renderer.domElement, left, top, w, h, // source rect with content to crop
            0, 0, w, h); // newCanvas, same size as source rect
            var strMime = "image/jpeg";
            return destCanvas.toDataURL(strMime);
        }
        catch (e) {
            console.log(e);
        }
        return "";
    }
    UpdateRotateCustom(dt) {
        // x: 신발앞 관통라인
        // y: 신발위 관통라인
        // z: 신발옆 관통라인
        // x,y,z, 
        // ModelManager.Instance.InitCamera(-35.66,50.9,78.33);
        //this.modelGroup.rotateOnAxis(new THREE.Vector3(0.0, 1 ,-0.5).normalize() , -dt);
        //this.modelGroup.rotateOnAxis(new THREE.Vector3(35.66, 78.33 ,-50.9).normalize() , -dt);
        //this.modelGroup.rotateOnAxis(new THREE.Vector3(35.66, 178.33 ,-50.9).normalize() , -dt);
        this.modelGroup.rotateOnAxis(new THREE.Vector3(35.66, 178.33, -30).normalize(), -dt);
    }
    UpdateRotateBadge(dt) {
        ///this.modelGroup.rotateOnAxis(new THREE.Vector3(1, 0 ,0.2).normalize() , -dt);
        //ModelManager.Instance.InitCamera(-41.9,88.5,20.06);
        this.UpdateCamera(-93 * 0.9, 21 * 0.9, 30 * 0.9, -54 * 0.8, 81 * 0.8, 18 * 0.8, dt); //-41.9,88.5,20.06     ,dt);
        //	this.modelGroup.rotateOnAxis(new THREE.Vector3(88.,41.9,-20.06).normalize() , -dt);
    }
    UpdateRotateLine(dt) {
        //this.modelGroup.rotateOnAxis(new THREE.Vector3(0.0, 1 ,-0.5).normalize() , -dt);
        //ModelManager.Instance.InitCamera(-45,74,49);
        // -45,74,49
        this.UpdateCamera(-28 * 0.9, 10 * 0.9, 95 * 0.9, -52 * 0.8, 73 * 0.8, 43 * 0.8, dt);
        //this.modelGroup.rotateOnAxis(new THREE.Vector3(45, 49, -74).normalize() , -dt);
    }
    UpdateRotateLabel(dt) {
        //this.modelGroup.rotateOnAxis(new THREE.Vector3(0.0, 1 ,-0.5).normalize() , -dt);
        this.UpdateCamera(-94 * 1.1, 19 * 1.1, 26 * 1.1, -56 * 0.8, 76 * 0.8, 67 * 0.8, dt);
        //ModelManager.Instance.InitCamera(-45,74,49);
        //this.modelGroup.rotateOnAxis(new THREE.Vector3(45, 49, -74).normalize() , -dt);
    }
    UpdateCamera(sx, sy, sz, ex, ey, ez, t) {
        var dx = (ex - sx) * t + sx;
        var dy = (ey - sy) * t + sy;
        var dz = (ez - sz) * t + sz;
        this.camera.position.x = dx;
        this.camera.position.y = dy;
        this.camera.position.z = dz;
        this.controls.update();
    }
}
