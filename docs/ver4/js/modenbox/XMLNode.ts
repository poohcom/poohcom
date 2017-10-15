/// <reference path="../../scripts/typings/three/index.d.ts" />

// 

enum XMLNodeType {
    BOX = 1, // SVG
    VBOX, // V
    OBJ // Obj
};

// 에니메이션
class XMLNode {

    public id: string;

    public target: string;

    public item: any;
    public itemVisible: any;

    public type: XMLNodeType;
    //public box: any; // 바운딩 박스
    public box: THREE.Mesh; // 바운딩 박스

    public desc: string;

    private animationList: Array<Animation>;

    constructor() {

        this.id = "";
        this.desc = "";
        this.animationList = new Array<Animation>();
        this.isVisible = true;
        this.isViewOn = true;
        this.target = "";
        this.item = null;
        this.itemVisible = null;


        var animation: Animation = new Animation();
        animation.durationTime = 0;
        animation.index = 0;
        animation.setTransform(0, 0, 0, "U", 0,
            0, 0, 0
        );

        this.addAnimation(animation);

        var animation1: Animation = new Animation();
        animation1.durationTime = 0;
        animation1.index = 0;
        animation1.setVisible(true);
        this.addAnimation(animation1);


    }


    public clearAnimation(): void
    {
        while (this.animationList.length > 0) {
            this.animationList.pop();
        }
    }

    public addAnimation(animation: Animation): void {
        animation.xmlnode = this;

        this.animationList.push(animation);
    }

    public getAnimationList(): Array<Animation> {
        return this.animationList;
    }

    public isVisible: boolean; // menu에서 
    public isViewOn: boolean; // 애니에서 오오픈

    public sx: number;
    public sy: number;
    public sz: number;

    public toXMLString(): string {
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

    public updateImage(texture: THREE.Texture): void {

        this.item.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                if (child.material instanceof THREE.MeshPhongMaterial)
                {
                    var m: THREE.MeshPhongMaterial = <THREE.MeshPhongMaterial>(child.material);
                    m.map = texture;
                    m.bumpMap = texture;
                    m.needsUpdate = true;
                }
            }
        });
    }

    public setObj(item: THREE.Group) {

        this.type = XMLNodeType.OBJ;
        this.item = item;
        this.itemVisible = item;

        AnimationManager.instance().sortAnimation();
    }

    public setVBox(item: Box3D) {

        this.type = XMLNodeType.VBOX;
        this.item = item;
        this.itemVisible = item;
        //this.itemVisible = item.root;
    }

    public setBox(item: Box3D) {
        this.type = XMLNodeType.BOX;
        this.item = item;
        this.itemVisible = item.root;
    }

    public updateVisible(flag: boolean): void {
        this.isVisible = flag;
    }

    public updateTime(time: number) {

        for (var i: number = 0; i < this.animationList.length; i++)
        {
            this.animationList[i].updateTime(time);
        }
    }




}
