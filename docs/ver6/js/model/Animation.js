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
var Animation = (function () {
    function Animation() {
        this.index = 0;
        this.durationTime = 3.0;
        this.oldPos = new THREE.Vector3();
        this.xmlnode = null;
        this.rx = 0;
        this.ry = 0;
        this.rz = 0;
    }
    Animation.prototype.toXMLString = function () {
        switch (this.type) {
            case AnimationType.VIEW:
                break;
            case AnimationType.TRANSFORM:
                break;
            default:
                return "";
        }
        return "";
    };
    Animation.prototype.setRotate = function (boxFace, data) {
        this.type = AnimationType.ROTATE;
        //this.target = boxFace;
        var dataList = data.split("-");
        // CREASE - 106 - OUT - 90.0 - BASELINE1
        this.index = parseInt(dataList[1]);
        if (dataList[2] == "out" || dataList[2] == "OUT") {
            this.data = -parseFloat(dataList[3]) * Math.PI / 180;
        }
        else {
            this.data = parseFloat(dataList[3]) * Math.PI / 180;
        }
    };
    Animation.prototype.setTransform = function (x, y, z, moveType, moveHeight, rx, ry, rz) {
        if (rx === void 0) { rx = 0; }
        if (ry === void 0) { ry = 0; }
        if (rz === void 0) { rz = 0; }
        this.type = AnimationType.TRANSFORM;
        this.x = x;
        this.y = y;
        this.z = z;
        this.moveType = moveType;
        this.moveHeight = moveHeight;
        this.rx = rx / 180.0 * Math.PI;
        this.ry = ry / 180.0 * Math.PI;
        this.rz = rz / 180.0 * Math.PI;
    };
    Animation.prototype.setVisible = function (flag) {
        this.type = AnimationType.VIEW;
        this.visible = flag;
    };
    Animation.prototype.setTime = function (startTime) {
        this.startTime = startTime;
        this.endTime = startTime + this.durationTime;
    };
    Animation.prototype.updateTime = function (time) {
        if (this.xmlnode == null)
            return;
        if (this.xmlnode.item == null)
            return;
        switch (this.type) {
            case AnimationType.TRANSFORM:
                if (time < this.startTime) {
                    this.oldPos.x = (this.xmlnode.item).position.x;
                    this.oldPos.y = (this.xmlnode.item).position.y;
                    this.oldPos.z = (this.xmlnode.item).position.z;
                }
                else if (time > this.endTime || this.durationTime == 0) {
                    (this.xmlnode.item).position.x = this.x;
                    (this.xmlnode.item).position.y = this.y;
                    (this.xmlnode.item).position.z = this.z;
                    (this.xmlnode.item).rotation.x = this.rx;
                    (this.xmlnode.item).rotation.y = this.ry;
                    (this.xmlnode.item).rotation.z = this.rz;
                    (this.xmlnode.item).updateMatrix();
                }
                else {
                    var r = (time - this.startTime) / this.durationTime;
                    (this.xmlnode.item).rotation.x = this.rx * r;
                    (this.xmlnode.item).rotation.y = this.ry * r;
                    (this.xmlnode.item).rotation.z = this.rz * r;
                    (this.xmlnode.item).updateMatrix();
                    if (this.moveHeight > 1.0) {
                        if (r < 0.3) {
                            r = r / 0.3;
                            (this.xmlnode.item).position.x = this.oldPos.x;
                            (this.xmlnode.item).position.y = this.oldPos.y;
                            (this.xmlnode.item).position.z = this.z + r * this.moveHeight;
                        }
                        else if (r > 0.7) {
                            r = (r - 0.7) / 0.3;
                            (this.xmlnode.item).position.x = this.x;
                            (this.xmlnode.item).position.y = this.y;
                            (this.xmlnode.item).position.z = this.z + (1 - r) * this.moveHeight;
                        }
                        else {
                            r = (r - 0.3) / 0.4;
                            (this.xmlnode.item).position.x = this.oldPos.x + (this.x - this.oldPos.x) * r;
                            (this.xmlnode.item).position.y = this.oldPos.y + (this.y - this.oldPos.y) * r;
                            (this.xmlnode.item).position.z = this.z + this.moveHeight;
                        }
                    }
                    else {
                        (this.xmlnode.item).position.x = this.oldPos.x + (this.x - this.oldPos.x) * r;
                        (this.xmlnode.item).position.y = this.oldPos.y + (this.y - this.oldPos.y) * r;
                        (this.xmlnode.item).position.z = this.z;
                    }
                }
                break;
            case AnimationType.VIEW:
                if (this.xmlnode.itemVisible == null)
                    return;
                if (time >= this.startTime) {
                    if (this.xmlnode.isVisible == true) {
                        this.xmlnode.itemVisible.visible = this.visible;
                    }
                    else {
                        this.xmlnode.itemVisible.visible = false;
                    }
                }
                break;
        }
    };
    return Animation;
}());
//# sourceMappingURL=Animation.js.map