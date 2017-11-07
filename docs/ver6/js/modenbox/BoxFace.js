/// <reference path="../../scripts/typings/three/index.d.ts" />
// 개별
var BoxFace = (function () {
    function BoxFace() {
        //super();
        this.centerX = 0;
        this.centerY = 0;
        this.lineIDList = new Array();
        this.creaselineIDList = new Array();
        this.creaselineList = new Array();
        this.creaseline = null;
        this.posXYList = "";
        //
        this.baselineKey = "";
        this.faceFront = null;
        this.faceBack = null;
        this.rootCreaseLineID = "";
        this.childList = new Array();
        this.dir = null;
    }
    // 에니있는 것인지
    BoxFace.prototype.isAnimation = function () {
        return (this.dir != null);
    };
    BoxFace.prototype.setCreaeLineID = function (lineID) {
        this.rootCreaseLineID = lineID;
        for (var i = 0; i < this.creaselineList.length; i++) {
            if (this.creaselineList[i].id == lineID) {
                this.creaseline = this.creaselineList[i];
                this.animation = new Animation();
                this.animation.setRotate(this, lineID);
                return;
            }
        }
    };
    BoxFace.prototype.showLineIDList = function () {
        var ret = "";
        for (var i = 0; i < this.lineIDList.length; i++) {
            ret += this.lineIDList[i] + ",";
        }
        return ret;
    };
    // 기준면
    BoxFace.prototype.isBaseline = function () {
        return this.baselineKey != "";
    };
    // 접는선이 있는지
    BoxFace.prototype.hasCreaseline = function () {
        return (this.creaselineIDList.length > 0);
    };
    BoxFace.prototype.pushLineID = function (lineID) {
        this.lineIDList.push(lineID);
        if (lineID.indexOf("CREASE") == 0) {
            this.creaselineIDList.push(lineID);
        }
    };
    BoxFace.prototype.pushLine = function (line) {
        if (line.id.indexOf("CREASE") == 0) {
            this.creaselineList.push(line);
        }
    };
    // face 리스트 box3d에 추가
    BoxFace.prototype.addLink = function (box3d) {
        box3d.childList.push(this);
        for (var i = 0; i < this.childList.length; i++) {
            this.childList[i].addLink(box3d);
        }
    };
    BoxFace.prototype.repos = function (r) {
        if (r === void 0) { r = 0; }
        this.rootBone = new THREE.Object3D();
        this.rootNegativeBone = new THREE.Object3D();
        this.rootBone.add(this.rootNegativeBone);
        this.rootNegativeBone.add(this.faceFront);
        this.rootNegativeBone.add(this.faceBack);
        // 메인 먼일경우
        if (this.isBaseline() == true) {
            //this.faceFront.updatePos(778, 970);
            //this.rootBone.position.set(-778, -970, 0);wafawfkp
            //this.rootBone.position.set();
            this.rootBone.position.set(this.centerX, this.centerY, 0);
        }
        else {
            this.faceFront.updatePos(this.creaseline.p1.x, this.creaseline.p1.y);
            this.faceBack.updatePosBack();
            this.dir = new THREE.Vector3();
            this.dir.x = this.creaseline.p2.x - this.creaseline.p1.x;
            this.dir.y = this.creaseline.p2.y - this.creaseline.p1.y;
            this.dir.z = 0;
            this.dir.normalize();
            this.boneMatrix = this.rootBone.matrix.clone();
            //this.rotateAroundObjectAxis(this.rootBone, this.dir, r);
        }
        for (var i = 0; i < this.childList.length; i++) {
            this.childList[i].repos(r + 0.156);
            this.childList[i].setRootBonePosition(this.creaseline);
            this.rootNegativeBone.add(this.childList[i].rootBone);
        }
    };
    //public rotateAroundObjectAxis(object: THREE.Object3D, axis: THREE.Vector3, radians:number) :void{
    //    var rotObjectMatrix: THREE.Matrix4 = new THREE.Matrix4();
    //    rotObjectMatrix.makeRotationAxis(axis, radians);
    //    object.matrix.multiply(rotObjectMatrix);
    //    object.rotation.setFromRotationMatrix(object.matrix);
    //}
    BoxFace.prototype.rotateAroundObjectAxis = function (object, axis, radians) {
        var rotObjectMatrix = new THREE.Matrix4();
        rotObjectMatrix.makeRotationAxis(axis, radians);
        object.matrix = this.boneMatrix.clone();
        object.matrix.multiply(rotObjectMatrix);
        object.rotation.setFromRotationMatrix(object.matrix);
    };
    BoxFace.prototype.setRootBonePosition = function (line) {
        if (line == null) {
            this.rootBone.position.set(this.creaseline.p1.x, this.creaseline.p1.y, this.rootBone.position.z);
        }
        else {
            this.rootBone.position.set(this.creaseline.p1.x - line.p1.x, this.creaseline.p1.y - line.p1.y, this.rootBone.position.z);
        }
    };
    BoxFace.prototype.updateMaterial = function (frontMaterial, backMaterial) {
        this.faceFront.updateMaterial(frontMaterial);
        this.faceBack.updateMaterial(backMaterial);
        for (var i = 0; i < this.childList.length; i++) {
            this.childList[i].updateMaterial(frontMaterial, backMaterial);
        }
    };
    BoxFace.prototype.updateMaterialBox = function (bumpScale, diffuseColor, specularColor, reflectivity, specularShininess) {
        this.faceFront.updateMaterialBox(bumpScale, diffuseColor, specularColor, reflectivity, specularShininess);
        this.faceBack.updateMaterialBox(bumpScale, diffuseColor, specularColor, reflectivity, specularShininess);
        for (var i = 0; i < this.childList.length; i++) {
            this.childList[i].updateMaterialBox(bumpScale, diffuseColor, specularColor, reflectivity, specularShininess);
        }
    };
    BoxFace.prototype.update = function (time) {
        if (this.rootBone == null)
            return;
        if (this.dir == null)
            return;
        //this.animation.
        if (time < this.animation.startTime) {
            this.rotateAroundObjectAxis(this.rootBone, this.dir, 0);
        }
        else if (time > this.animation.endTime) {
            this.rotateAroundObjectAxis(this.rootBone, this.dir, this.animation.data);
        }
        else {
            if (this.animation.durationTime < 0.1) {
            }
            else {
                var r = (time - this.animation.startTime) / this.animation.durationTime * this.animation.data;
                this.rotateAroundObjectAxis(this.rootBone, this.dir, r);
            }
        }
    };
    BoxFace.prototype.getAnimation = function () {
        return this.animation;
    };
    BoxFace.prototype.getMeshes = function (array) {
        this.rootBone.updateMatrixWorld(true);
        this.rootNegativeBone.updateMatrixWorld(true);
        this.faceFront.updateMatrixWorld(true);
        this.faceBack.updateMatrixWorld(true);
        this.faceFront.getMeshes(array);
        this.faceBack.getMeshes(array);
    };
    return BoxFace;
}());
// 면 
//# sourceMappingURL=BoxFace.js.map