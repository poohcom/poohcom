/// <reference path="../../scripts/typings/three/index.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BoxFace3D = (function (_super) {
    __extends(BoxFace3D, _super);
    function BoxFace3D() {
        var _this = _super.call(this) || this;
        //private helper: THREE.BoundingBoxHelper;
        // 기준선
        _this.isBackFace = false;
        return _this;
        //this.helper = new THREE.BoundingBoxHelper(this, 0xff0000);
        //this.add(this.helper);
    }
    BoxFace3D.prototype.updateMaterial = function (material) {
        var list = this.children;
        for (var i = 0; i < list.length; i++) {
            if (list[i] instanceof THREE.Mesh) {
                list[i].material = material;
            }
        }
    };
    BoxFace3D.prototype.updateMaterialBox = function (bumpScale, diffuseColor, specularColor, reflectivity, specularShininess) {
        var list = this.children;
        for (var i = 0; i < list.length; i++) {
            if (list[i] instanceof THREE.Mesh) {
                var material = (list[i].material);
                material.bumpScale = bumpScale;
                // material.color = new THREE.Color(diffuseColor);
                material.specular = new THREE.Color(specularColor);
                material.reflectivity = reflectivity;
                material.shininess = specularShininess;
            }
        }
    };
    BoxFace3D.prototype.updateTexture = function (map) {
        var list = this.children;
        for (var i = 0; i < list.length; i++) {
            if (list[i] instanceof THREE.Mesh) {
                if (this.isBackFace == false) {
                    list[i].material.map = map;
                    list[i].material.bumpMap = map;
                }
            }
        }
    };
    BoxFace3D.prototype.updatePos = function (px, py) {
        var list = this.children;
        var list2 = new Array();
        for (var i = 0; i < list.length; i++) {
            if (list[i] instanceof THREE.Mesh) {
                var geometry = list[i].geometry;
                for (var j = 0; j < geometry.vertices.length; j++) {
                    geometry.vertices[j].x = geometry.vertices[j].x - px;
                    geometry.vertices[j].y = geometry.vertices[j].y - py;
                }
                geometry.computeBoundingBox();
                list[i].updateMatrixWorld(true);
                var geometry2 = new THREE.BufferGeometry();
                geometry2 = geometry2.fromGeometry(geometry);
                geometry2.computeBoundingBox();
                var mesh = new THREE.Mesh(geometry2, new THREE.MeshLambertMaterial());
                mesh.position.set(0, 0, 0);
                mesh.material.transparent = true;
                mesh.material.opacity = 0.0;
                list2.push(mesh);
            }
        }
        for (var i = 0; i < list2.length; i++) {
            list2[i].updateMatrixWorld(true);
            this.add(list2[i]);
        }
    };
    BoxFace3D.prototype.updatePosBack = function () {
        var list = this.children;
        var list2 = new Array();
        for (var i = 0; i < list.length; i++) {
            if (list[i] instanceof THREE.Mesh) {
                var geometry = list[i].geometry;
                geometry.computeBoundingBox();
                list[i].updateMatrixWorld(true);
                var geometry2 = new THREE.BufferGeometry();
                geometry2 = geometry2.fromGeometry(geometry);
                geometry2.computeBoundingBox();
                var mesh = new THREE.Mesh(geometry2, new THREE.MeshLambertMaterial());
                mesh.position.set(0, 0, 0);
                mesh.material.transparent = true;
                mesh.material.opacity = 0.0;
                //mesh.scale.z = -1;
                list2.push(mesh);
            }
        }
        for (var i = 0; i < list2.length; i++) {
            list2[i].updateMatrixWorld(true);
            this.add(list2[i]);
        }
    };
    BoxFace3D.prototype.getMeshes = function (array) {
        var list = this.children;
        for (var i = 0; i < list.length; i++) {
            if (list[i] instanceof THREE.Mesh) {
                list[i].updateMatrixWorld(true);
                //var geometry: THREE.Geometry | THREE.BufferGeometry = (<THREE.Mesh>list[i]).geometry;
                //geometry.computeBoundingBox();
                //var min: THREE.Vector3 = geometry.boundingBox.min;
                //var max: THREE.Vector3 = geometry.boundingBox.max;
                //max.z = 10;
                //geometry.boundingBox.set(min, max);
                //var a: THREE.Vector3 = geometry.boundingBox.getSize();
                //console.log("a:" + a.x + ":" + a.y + ":" + a.z);
                //var c: THREE.Vector3 = geometry.boundingBox.getCenter();
                //console.log("c:" + c.x + ":" + c.y + ":" + c.z);
                //var w: THREE.Vector3 = list[i].getWorldPosition();
                //console.log("w:" + w.x + ":" + w.y + ":" + w.z);
                array.push(list[i]);
                ///
                //var geometry2: THREE.BoxBufferGeometry = new THREE.BoxBufferGeometry(
                //    geometry.boundingBox.getSize().x,
                //    geometry.boundingBox.getSize().y,
                //    geometry.boundingBox.getSize().z
                //);
                ////var object: THREE.Mesh = new THREE.Mesh(geometry2, new THREE.MeshLambertMaterial());
                //var object: THREE.Mesh = new THREE.Mesh(<THREE.Geometry>geometry.clone(), new THREE.MeshLambertMaterial());
                ////object.material.transparent = ;
                ////object.material.opacity = 0.0;
                //object.position.x = geometry.boundingBox.getCenter().x;
                //object.position.y = geometry.boundingBox.getCenter().y;
                //object.position.z = geometry.boundingBox.getCenter().z;
                ////this.add(object);
                //array.push(object);
                //array2.push(object);
            }
        }
        //for (var i: number = 0; i < array2.length; i++)
        //{
        //    this.add(array2[i] );
        //}
        //this.helper.updateMatrixWorld(true);
        //array.push(this.helper);
    };
    return BoxFace3D;
}(THREE.Object3D));
// 면 
//# sourceMappingURL=BoxFace3D.js.map