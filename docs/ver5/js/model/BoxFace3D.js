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
        // 기준선
        _this.isBackFace = false;
        _this.helper = new THREE.BoundingBoxHelper(_this, 0xff0000);
        _this.add(_this.helper);
        return _this;
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
        for (var i = 0; i < list.length; i++) {
            if (list[i] instanceof THREE.Mesh) {
                //list[i].position.set(list[i].position.x - px, list[i].position.y - py,0);
                var geometry = list[i].geometry;
                for (var i = 0; i < geometry.vertices.length; i++) {
                    geometry.vertices[i].x = geometry.vertices[i].x - px;
                    geometry.vertices[i].y = geometry.vertices[i].y - py;
                }
                // geometry.computeBoundingBox();
            }
        }
    };
    return BoxFace3D;
}(THREE.Object3D));
// 면 
//# sourceMappingURL=BoxFace3D.js.map