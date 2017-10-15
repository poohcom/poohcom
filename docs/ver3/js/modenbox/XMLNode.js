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
var XMLNode = (function () {
    function XMLNode() {
        this.id = "";
        this.desc = "";
        this.animationList = new Array();
        this.isVisible = true;
        this.isViewOn = true;
        this.target = "";
        this.item = null;
        this.itemVisible = null;
        var animation = new Animation();
        animation.durationTime = 0;
        animation.index = 0;
        animation.setTransform(0, 0, 0, "U", 0, 0, 0, 0);
        this.addAnimation(animation);
        var animation1 = new Animation();
        animation1.durationTime = 0;
        animation1.index = 0;
        animation1.setVisible(true);
        this.addAnimation(animation1);
    }
    XMLNode.prototype.clearAnimation = function () {
        while (this.animationList.length > 0) {
            this.animationList.pop();
        }
    };
    XMLNode.prototype.addAnimation = function (animation) {
        animation.xmlnode = this;
        this.animationList.push(animation);
    };
    XMLNode.prototype.getAnimationList = function () {
        return this.animationList;
    };
    XMLNode.prototype.toXMLString = function () {
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
    };
    XMLNode.prototype.updateImage = function (texture) {
        this.item.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                if (child.material instanceof THREE.MeshPhongMaterial) {
                    var m = (child.material);
                    m.map = texture;
                    m.bumpMap = texture;
                    m.needsUpdate = true;
                }
            }
        });
    };
    XMLNode.prototype.setObj = function (item) {
        this.type = XMLNodeType.OBJ;
        this.item = item;
        this.itemVisible = item;
        AnimationManager.instance().sortAnimation();
    };
    XMLNode.prototype.setVBox = function (item) {
        this.type = XMLNodeType.VBOX;
        this.item = item;
        this.itemVisible = item;
        //this.itemVisible = item.root;
    };
    XMLNode.prototype.setBox = function (item) {
        this.type = XMLNodeType.BOX;
        this.item = item;
        this.itemVisible = item.root;
    };
    XMLNode.prototype.updateVisible = function (flag) {
        this.isVisible = flag;
    };
    XMLNode.prototype.updateTime = function (time) {
        for (var i = 0; i < this.animationList.length; i++) {
            this.animationList[i].updateTime(time);
        }
    };
    return XMLNode;
}());
//# sourceMappingURL=XMLNode.js.map