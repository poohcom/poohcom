/// <reference path="../../scripts/typings/three/index.d.ts" />
// 같은 텍스처를 사용하는 박스들
class Box3D extends THREE.Object3D {
    constructor() {
        super();
        this.isVBOX = false;
        this.childList = new Array();
        //this.frustumCulled = false;
        //this.helper = new THREE.BoundingBoxHelper(this, 0xff0000);
        //this.add(this.helper);
    }
    updateMaterial(frontMaterial, backMaterial) {
        for (var i = 0; i < this.childList.length; i++) {
            this.childList[i].updateMaterial(frontMaterial, backMaterial);
        }
    }
    update(time) {
        for (var i = 0; i < this.childList.length; i++) {
            this.childList[i].update(time);
        }
    }
    updateMaterialBox(bumpScale, diffuseColor, specularColor, reflectivity, specularShininess) {
        for (var i = 0; i < this.childList.length; i++) {
            this.childList[i].updateMaterialBox(bumpScale, diffuseColor, specularColor, reflectivity, specularShininess);
        }
    }
}
// 면 
//# sourceMappingURL=Box3D.js.map