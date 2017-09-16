/// <reference path="../../scripts/typings/three/index.d.ts" />
class BoxFace3D extends THREE.Object3D {
    constructor() {
        super();
        // 기준선
        this.isBackFace = false;
        this.helper = new THREE.BoundingBoxHelper(this, 0xff0000);
        this.add(this.helper);
        this.frustumCulled = false;
    }
    update() {
        //var list: THREE.Object3D[] = this.children;
        //for (var i: number = 0; i < list.length; i++) {
        //    if (list[i] instanceof THREE.Mesh) {
        //        (<THREE.Mesh>list[i]).geometry.computeVertexNormals();
        //    }
        //this.helper.update();
    }
    updateMaterial(material) {
        var list = this.children;
        for (var i = 0; i < list.length; i++) {
            if (list[i] instanceof THREE.Mesh) {
                list[i].material = material;
            }
        }
    }
    updateMaterialBox(bumpScale, diffuseColor, specularColor, reflectivity, specularShininess) {
        var list = this.children;
        for (var i = 0; i < list.length; i++) {
            if (list[i] instanceof THREE.Mesh) {
                var material = (list[i].material);
                material.bumpScale = bumpScale;
                material.color = new THREE.Color(diffuseColor);
                material.specular = new THREE.Color(specularColor);
                material.reflectivity = reflectivity;
                material.shininess = specularShininess;
            }
        }
    }
    updateTexture(map) {
        var list = this.children;
        for (var i = 0; i < list.length; i++) {
            if (list[i] instanceof THREE.Mesh) {
                if (this.isBackFace == false) {
                    list[i].material.map = map;
                    list[i].material.bumpMap = map;
                }
            }
        }
    }
    updatePos(px, py) {
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
    }
}
// 면 
//# sourceMappingURL=BoxFace3D.js.map