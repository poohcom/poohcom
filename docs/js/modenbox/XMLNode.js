/// <reference path="../../scripts/typings/three/index.d.ts" />
// 
var XMLNodeType;
(function (XMLNodeType) {
    XMLNodeType[XMLNodeType["BOX"] = 1] = "BOX";
    XMLNodeType[XMLNodeType["VBOX"] = 2] = "VBOX";
    XMLNodeType[XMLNodeType["OBJ"] = 3] = "OBJ"; // Obj
})(XMLNodeType || (XMLNodeType = {}));
;
// 에니메이션
class XMLNode {
    constructor() {
        this.id = "";
        this.desc = "";
        this.animationList = new Array();
        this.isVisible = true;
        this.isViewOn = true;
        this.target = "";
    }
    addAnimation(animation) {
        this.animationList.push(animation);
    }
    getAnimationList() {
        return this.animationList;
    }
    update() {
        for (var i = 0; i < this.animationList.length; i++) {
            this.animationList[i].target = this.item;
            this.animationList[i].xmlnode = this;
        }
    }
    toXMLString() {
        switch (this.type) {
            case XMLNodeType.BOX:
                break;
            case XMLNodeType.VBOX:
                break;
            case XMLNodeType.OBJ:
                break;
            default:
                return "";
        }
        return "";
    }
    setObj(item) {
        this.type = XMLNodeType.OBJ;
        this.item = item;
    }
    setVBox(item) {
        this.type = XMLNodeType.VBOX;
        this.item = item;
    }
    setBox(item) {
        this.type = XMLNodeType.BOX;
        this.item = item;
    }
    updateVisible(flag) {
        this.isVisible = flag;
        //switch (this.type) {
        //    case XMLNodeType.BOX:
        //        (<Box3D>this.item).visible = flag;
        //        break;
        //    case XMLNodeType.VBOX:
        //        //this.item.visible = flag;
        //        break;
        //    case XMLNodeType.OBJ:
        //        (<THREE.Group>this.item).visible = flag;
        //        break;
        //    default:
        //        break;
        //}
    }
    updateTime(time) {
        for (var i = 0; i < this.animationList.length; i++) {
            //this.animationList[i].target = this.item;
            //this.animationList[i].xmlnode = this;
            this.animationList[i].updateTime(time);
        }
    }
}
//# sourceMappingURL=XMLNode.js.map