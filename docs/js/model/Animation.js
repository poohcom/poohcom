/// <reference path="../../scripts/typings/three/index.d.ts" />
// 
var AnimationType;
(function (AnimationType) {
    AnimationType[AnimationType["ROTATE"] = 1] = "ROTATE";
    AnimationType[AnimationType["VIEW"] = 2] = "VIEW";
    AnimationType[AnimationType["TRANSFORM"] = 3] = "TRANSFORM"; // 박스, 오브젝트, 이동, 회전
})(AnimationType || (AnimationType = {}));
;
// 에니메이션
class Animation {
    constructor() {
        this.index = 0;
        this.durationTime = 3.0;
        this.target = null;
        this.oldPos = new THREE.Vector3();
        this.xmlnode = null;
        this.rx = 0;
        this.ry = 0;
        this.rz = 0;
    }
    toXMLString() {
        switch (this.type) {
            case AnimationType.VIEW:
                break;
            case AnimationType.TRANSFORM:
                break;
            default:
                return "";
        }
        return "";
    }
    setRotate(boxFace, data) {
        this.type = AnimationType.ROTATE;
        this.target = boxFace;
        var dataList = data.split("-");
        // CREASE - 106 - OUT - 90.0 - BASELINE1
        this.index = parseInt(dataList[1]);
        if (dataList[2] == "out" || dataList[2] == "OUT") {
            this.data = -parseFloat(dataList[3]) * Math.PI / 180;
        }
        else {
            this.data = parseFloat(dataList[3]) * Math.PI / 180;
        }
    }
    setTransform(x, y, z, moveType, moveHeight, rx = 0, ry = 0, rz = 0) {
        this.type = AnimationType.TRANSFORM;
        this.x = x;
        this.y = y;
        this.z = z;
        this.moveType = moveType;
        this.moveHeight = moveHeight;
        this.rx = rx / 180.0 * Math.PI;
        this.ry = ry / 180.0 * Math.PI;
        this.rz = rz / 180.0 * Math.PI;
    }
    //public setPos(x: number, y: number, z: number, moveType: string, moveHeight: number): void {
    //    this.type = AnimationType.TRANSFORM;
    //    this.x = x;
    //    this.y = y;
    //    this.z = z;
    //    this.moveType = moveType;
    //    this.moveHeight = moveHeight;
    //}
    //public setRot(rx: number, ry: number, rz: number): void {
    //    this.type = AnimationType.TRANSFORM;
    //    this.rx = rx;
    //    this.ry = ry;
    //    this.rz = rz;
    //}
    setVisible(flag) {
        this.type = AnimationType.VIEW;
        this.visible = flag;
    }
    setTime(startTime) {
        this.startTime = startTime;
        this.endTime = startTime + this.durationTime;
    }
    updateTime(time) {
        if (this.xmlnode == null)
            return;
        if (this.target == null || this.target == undefined)
            return;
        switch (this.type) {
            case AnimationType.TRANSFORM:
                if (time < this.startTime) {
                    this.oldPos.x = (this.target).position.x;
                    this.oldPos.y = (this.target).position.y;
                    this.oldPos.z = (this.target).position.z;
                }
                else if (time > this.endTime || this.durationTime == 0) {
                    (this.target).position.x = this.x;
                    (this.target).position.y = this.y;
                    (this.target).position.z = this.z;
                    (this.target).rotation.x = this.rx;
                    (this.target).rotation.y = this.ry;
                    (this.target).rotation.z = this.rz;
                    (this.target).updateMatrix();
                }
                else {
                    var r = (time - this.startTime) / this.durationTime;
                    (this.target).rotation.x = this.rx * r;
                    (this.target).rotation.y = this.ry * r;
                    (this.target).rotation.z = this.rz * r;
                    (this.target).updateMatrix();
                    if (this.moveHeight > 1.0) {
                        if (r < 0.3) {
                            r = r / 0.3;
                            (this.target).position.x = this.oldPos.x;
                            (this.target).position.y = this.oldPos.y;
                            (this.target).position.z = this.z + r * this.moveHeight;
                        }
                        else if (r > 0.7) {
                            r = (r - 0.7) / 0.3;
                            (this.target).position.x = this.x;
                            (this.target).position.y = this.y;
                            (this.target).position.z = this.z + (1 - r) * this.moveHeight;
                        }
                        else {
                            r = (r - 0.3) / 0.4;
                            (this.target).position.x = this.oldPos.x + (this.x - this.oldPos.x) * r;
                            (this.target).position.y = this.oldPos.y + (this.y - this.oldPos.y) * r;
                            (this.target).position.z = this.z + this.moveHeight;
                        }
                    }
                    else {
                        (this.target).position.x = this.oldPos.x + (this.x - this.oldPos.x) * r;
                        (this.target).position.y = this.oldPos.y + (this.y - this.oldPos.y) * r;
                        (this.target).position.z = this.z;
                        //(<THREE.Object3D>(this.target)).position.x = this.x;
                        //(<THREE.Object3D>(this.target)).position.y = this.y;
                        //(<THREE.Object3D>(this.target)).position.z = this.z;
                    }
                }
                break;
            case AnimationType.VIEW:
                if (time >= this.startTime) {
                    if (this.xmlnode.isVisible == true) {
                        this.target.visible = this.visible;
                    }
                    else {
                        this.target.visible = false;
                    }
                }
                break;
        }
    }
}
//# sourceMappingURL=Animation.js.map