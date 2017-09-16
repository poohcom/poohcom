/// <reference path="../../scripts/typings/three/index.d.ts" />
// 개별
class BoxFace {
    constructor() {
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
    isAnimation() {
        return (this.dir != null);
    }
    setCreaeLineID(lineID) {
        this.rootCreaseLineID = lineID;
        for (var i = 0; i < this.creaselineList.length; i++) {
            if (this.creaselineList[i].id == lineID) {
                this.creaseline = this.creaselineList[i];
                this.animation = new Animation();
                this.animation.setRotate(this, lineID);
                return;
            }
        }
    }
    showLineIDList() {
        var ret = "";
        for (var i = 0; i < this.lineIDList.length; i++) {
            ret += this.lineIDList[i] + ",";
        }
        return ret;
    }
    // 기준면
    isBaseline() {
        return this.baselineKey != "";
    }
    // 접는선이 있는지
    hasCreaseline() {
        return (this.creaselineIDList.length > 0);
    }
    pushLineID(lineID) {
        this.lineIDList.push(lineID);
        if (lineID.indexOf("CREASE") == 0) {
            this.creaselineIDList.push(lineID);
        }
    }
    pushLine(line) {
        if (line.id.indexOf("CREASE") == 0) {
            this.creaselineList.push(line);
        }
    }
    // face 리스트 box3d에 추가
    addLink(box3d) {
        box3d.childList.push(this);
        for (var i = 0; i < this.childList.length; i++) {
            this.childList[i].addLink(box3d);
        }
    }
    repos(r = 0) {
        this.rootBone = new THREE.Object3D();
        this.rootBone.frustumCulled = false;
        this.rootNegativeBone = new THREE.Object3D();
        this.rootNegativeBone.frustumCulled = false;
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
            //this.faceBack.updatePos(this.creaseline.p1.x, this.creaseline.p1.y);
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
    }
    //public rotateAroundObjectAxis(object: THREE.Object3D, axis: THREE.Vector3, radians:number) :void{
    //    var rotObjectMatrix: THREE.Matrix4 = new THREE.Matrix4();
    //    rotObjectMatrix.makeRotationAxis(axis, radians);
    //    object.matrix.multiply(rotObjectMatrix);
    //    object.rotation.setFromRotationMatrix(object.matrix);
    //}
    rotateAroundObjectAxis(object, axis, radians) {
        var rotObjectMatrix = new THREE.Matrix4();
        rotObjectMatrix.makeRotationAxis(axis, radians);
        object.matrix = this.boneMatrix.clone();
        object.matrix.multiply(rotObjectMatrix);
        object.rotation.setFromRotationMatrix(object.matrix);
    }
    setRootBonePosition(line) {
        if (line == null) {
            this.rootBone.position.set(this.creaseline.p1.x, this.creaseline.p1.y, this.rootBone.position.z);
        }
        else {
            this.rootBone.position.set(this.creaseline.p1.x - line.p1.x, this.creaseline.p1.y - line.p1.y, this.rootBone.position.z);
        }
    }
    updateMaterial(frontMaterial, backMaterial) {
        this.faceFront.updateMaterial(frontMaterial);
        this.faceBack.updateMaterial(backMaterial);
        for (var i = 0; i < this.childList.length; i++) {
            this.childList[i].updateMaterial(frontMaterial, backMaterial);
        }
    }
    updateMaterialBox(bumpScale, diffuseColor, specularColor, reflectivity, specularShininess) {
        this.faceFront.updateMaterialBox(bumpScale, diffuseColor, specularColor, reflectivity, specularShininess);
        this.faceBack.updateMaterialBox(bumpScale, diffuseColor, specularColor, reflectivity, specularShininess);
        for (var i = 0; i < this.childList.length; i++) {
            this.childList[i].updateMaterialBox(bumpScale, diffuseColor, specularColor, reflectivity, specularShininess);
        }
    }
    update(time) {
        this.faceFront.update();
        this.faceBack.update();
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
    }
    getAnimation() {
        return this.animation;
    }
}
// 면 
//# sourceMappingURL=BoxFace.js.map