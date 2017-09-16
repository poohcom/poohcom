/// <reference path="../../scripts/typings/three/index.d.ts" />

// 

enum XMLNodeType {
    BOX = 1, // SVG
    VBOX, // V
    OBJ // Obj
};

// 에니메이션
class XMLNode {
    constructor() {

        this.id = "";
        this.desc = "";
        this.animationList = new Array<Animation>();
        this.isVisible = true;
        this.isViewOn = true;
        this.target = "";
    }

    public id: string;

    public target: string;

    public item: any;

    public type: XMLNodeType;
    public box: any; // 바운딩 박스
    public desc: string;

    private animationList: Array<Animation>;

    public addAnimation(animation: Animation): void {
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

    public update(): void
    {
        for (var i: number = 0; i < this.animationList.length; i++) {
            this.animationList[i].target = this.item;
            this.animationList[i].xmlnode = this;
            
        }
    }


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

    public setObj(item: THREE.Group) {

        this.type = XMLNodeType.OBJ;
        this.item = item;

    }

    public setVBox(item: Box3D) {

        this.type = XMLNodeType.VBOX;
        this.item = item;
    }

    public setBox(item: Box3D) {
        this.type = XMLNodeType.BOX;
        this.item = item;
    }

    public updateVisible(flag: boolean): void {

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

    public updateTime(time: number) {

        for (var i: number = 0; i < this.animationList.length; i++)
        {
            //this.animationList[i].target = this.item;
            //this.animationList[i].xmlnode = this;
            this.animationList[i].updateTime(time);
        }
    }







}
