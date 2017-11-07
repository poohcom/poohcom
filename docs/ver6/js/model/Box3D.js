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
// 같은 텍스처를 사용하는 박스들
var Box3D = (function (_super) {
    __extends(Box3D, _super);
    function Box3D() {
        var _this = _super.call(this) || this;
        _this.isVBOX = false;
        _this.childList = new Array();
        //this.helper = new THREE.BoundingBoxHelper(this, 0xff0000);
        _this.root = new THREE.Object3D();
        _this.add(_this.root);
        return _this;
        //this.root.add(this.helper);
    }
    Box3D.prototype.updateMaterial = function (frontMaterial, backMaterial) {
        for (var i = 0; i < this.childList.length; i++) {
            this.childList[i].updateMaterial(frontMaterial, backMaterial);
        }
    };
    Box3D.prototype.update = function (time) {
        for (var i = 0; i < this.childList.length; i++) {
            this.childList[i].update(time);
        }
    };
    Box3D.prototype.updateMaterialBox = function (bumpScale, diffuseColor, specularColor, reflectivity, specularShininess) {
        for (var i = 0; i < this.childList.length; i++) {
            this.childList[i].updateMaterialBox(bumpScale, diffuseColor, specularColor, reflectivity, specularShininess);
        }
    };
    Box3D.prototype.getMeshes = function (array) {
        this.root.updateMatrixWorld(true);
        for (var i = 0; i < this.childList.length; i++) {
            this.childList[i].getMeshes(array);
        }
    };
    return Box3D;
}(THREE.Object3D));
// 면 
//# sourceMappingURL=Box3D.js.map