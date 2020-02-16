import * as THREE from '../../build/three.module.js';
import { GeometryUtils } from '../jsm/utils/GeometryUtils.js';
export class Font3D {
    constructor() {
        this.materials = [];
        this.mirror = false;
        this.height = 1;
        this.fontsize = 20;
        this.hover = 1;
        this.curveSegments = 4;
        this.bevelThickness = 2;
        this.bevelSize = 1.5;
        this.bevelEnabled = false;
        this.text = "All for 장원준나이키\nAll for one";
    }
    loadFont() {
        this.materials = [
            new THREE.MeshPhongMaterial({ color: 0x777777, flatShading: true }),
            new THREE.MeshPhongMaterial({ color: 0x444444 }) // side
        ];
        this.group = new THREE.Group();
        this.group.position.y = 60;
        //this.scene.add( this.group );
        var loader = new THREE.FontLoader();
        var THIS = this;
        loader.load('fonts/Yoon YGO 550_TT_Regular.json', function (response) {
            //	loader.load( 'fonts/Do Hyeon_Regular.json', function ( response ) {
            THIS.font = response;
            THIS.refreshText();
        });
        return this.group;
    }
    refreshText() {
        //this.updatePermalink();
        this.group.remove(this.textMesh1);
        if (this.mirror)
            this.group.remove(this.textMesh2);
        if (!this.text)
            return;
        this.createText();
    }
    createText() {
        this.textGeo = new THREE.TextGeometry(this.text, {
            font: this.font,
            size: this.fontsize,
            height: this.height,
            curveSegments: this.curveSegments,
            bevelThickness: this.bevelThickness,
            bevelSize: this.bevelSize,
            bevelEnabled: this.bevelEnabled
        });
        this.textGeo.computeBoundingBox();
        this.textGeo.computeVertexNormals();
        // "fix" side normals by removing z-component of normals for side faces
        // (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)
        if (!this.bevelEnabled) {
            var triangleAreaHeuristics = 0.1 * (this.height * this.fontsize);
            for (var i = 0; i < this.textGeo.faces.length; i++) {
                var face = this.textGeo.faces[i];
                if (face.materialIndex == 1) {
                    for (var j = 0; j < face.vertexNormals.length; j++) {
                        face.vertexNormals[j].z = 0;
                        face.vertexNormals[j].normalize();
                    }
                    var va = this.textGeo.vertices[face.a];
                    var vb = this.textGeo.vertices[face.b];
                    var vc = this.textGeo.vertices[face.c];
                    var s = GeometryUtils.triangleArea(va, vb, vc);
                    if (s > triangleAreaHeuristics) {
                        for (var j = 0; j < face.vertexNormals.length; j++) {
                            face.vertexNormals[j].copy(face.normal);
                        }
                    }
                }
            }
        }
        var centerOffset = -0.5 * (this.textGeo.boundingBox.max.x - this.textGeo.boundingBox.min.x);
        this.textGeo = new THREE.BufferGeometry().fromGeometry(this.textGeo);
        this.textMesh1 = new THREE.Mesh(this.textGeo, this.materials);
        this.textMesh1.position.x = centerOffset;
        this.textMesh1.position.y = this.hover;
        this.textMesh1.position.z = 0;
        this.textMesh1.rotation.x = 0;
        this.textMesh1.rotation.y = Math.PI * 2;
        this.group.add(this.textMesh1);
        if (this.mirror) {
            this.textMesh2 = new THREE.Mesh(this.textGeo, this.materials);
            this.textMesh2.position.x = centerOffset;
            this.textMesh2.position.y = -this.hover;
            this.textMesh2.position.z = this.height;
            this.textMesh2.rotation.x = Math.PI;
            this.textMesh2.rotation.y = Math.PI * 2;
            this.group.add(this.textMesh2);
        }
    }
}
