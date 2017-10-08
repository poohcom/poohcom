/// <reference path="../../scripts/typings/three/index.d.ts" />

// 

enum AnimationType {
    ROTATE = 1, // face 회전 // DATA는 회전값
    VIEW, // 보이기 안보이기 하기
    TRANSFORM // 박스, 오브젝트, 이동, 회전
};

// 에니메이션
class Animation {
    constructor()
    {
        this.durationTime = 3.0;
        this.oldPos = new THREE.Vector3();
        this.xmlnode = null;
        this.rx = 0;
        this.ry = 0;
        this.rz = 0;
    }
    
    public index: number = 0;
    public type: AnimationType;

    public startTime: number;
    public endTime: number;
    public durationTime: number;
    public xmlnode: XMLNode;

    /////////////////////////////
    public data: number;
    /////////////////////////////

    public x: number;
    public y: number;
    public z: number;

    public rx: number;
    public ry: number;
    public rz: number;

    public moveHeight: number;
    public moveType: string;
    /////////////////////////////
    public visible: boolean;

    public toXMLString(): string
    {
        switch (this.type)
        {
            case AnimationType.VIEW:
                break;
            case AnimationType.TRANSFORM:
                break;

            default:
                return "";
        }

        return "";
    }
    
    public setRotate(boxFace: BoxFace, data: string): void
    {
        this.type = AnimationType.ROTATE;
        //this.target = boxFace;

        var dataList: string[] = data.split("-");


        // CREASE - 106 - OUT - 90.0 - BASELINE1

        this.index = parseInt(dataList[1]);
        if (dataList[2] == "out" || dataList[2] == "OUT")
        {
            this.data = -parseFloat(dataList[3]) * Math.PI / 180;
        } else {

            this.data = parseFloat(dataList[3]) * Math.PI / 180;
        }
    }

    public setTransform(x: number, y: number, z: number, moveType: string, moveHeight: number, rx: number = 0, ry: number = 0, rz: number = 0): void {

        this.type = AnimationType.TRANSFORM;
        this.x = x;
        this.y = y;
        this.z = z;
        this.moveType = moveType;
        this.moveHeight = moveHeight;
        this.rx = rx / 180.0 * Math.PI ;
        this.ry = ry / 180.0 * Math.PI;
        this.rz = rz / 180.0 * Math.PI;
    }

    public setVisible(flag: boolean)
    {
        this.type = AnimationType.VIEW;
        this.visible = flag;
    }

    public setTime(startTime: number): void
    {
        this.startTime = startTime;
        this.endTime = startTime + this.durationTime;
    }
    private oldPos: THREE.Vector3;

    public updateTime(time: number):void
    {
        if (this.xmlnode == null)
            return;

        if (this.xmlnode.item == null)
            return;

        switch (this.type)
        {
            case AnimationType.TRANSFORM:

                if (time < this.startTime)
                {
                    this.oldPos.x = (<THREE.Object3D>(this.xmlnode.item)).position.x;
                    this.oldPos.y = (<THREE.Object3D>(this.xmlnode.item)).position.y;
                    this.oldPos.z = (<THREE.Object3D>(this.xmlnode.item)).position.z;

                } else if (time > this.endTime || this.durationTime==0)
                {
                    (<THREE.Object3D>(this.xmlnode.item)).position.x = this.x;
                    (<THREE.Object3D>(this.xmlnode.item)).position.y = this.y;
                    (<THREE.Object3D>(this.xmlnode.item)).position.z = this.z;

                    (<THREE.Object3D>(this.xmlnode.item)).rotation.x = this.rx;
    
                    (<THREE.Object3D>(this.xmlnode.item)).rotation.y = this.ry;
    
                    (<THREE.Object3D>(this.xmlnode.item)).rotation.z = this.rz;
    
                    (<THREE.Object3D>(this.xmlnode.item)).updateMatrix();

                } else {

                    var r: number = (time - this.startTime) / this.durationTime;

                    (<THREE.Object3D>(this.xmlnode.item)).rotation.x = this.rx * r;
    
                    (<THREE.Object3D>(this.xmlnode.item)).rotation.y = this.ry * r;
    
                    (<THREE.Object3D>(this.xmlnode.item)).rotation.z = this.rz * r;
    
                    (<THREE.Object3D>(this.xmlnode.item)).updateMatrix();

                    if (this.moveHeight > 1.0)
                    {

                        if (r < 0.3) {
                            r = r / 0.3;
                            (<THREE.Object3D>(this.xmlnode.item)).position.x = this.oldPos.x;
                            (<THREE.Object3D>(this.xmlnode.item)).position.y = this.oldPos.y;
                            (<THREE.Object3D>(this.xmlnode.item)).position.z = this.z + r * this.moveHeight;

                        } else if (r > 0.7) {
                            r = (r - 0.7) / 0.3;
                            (<THREE.Object3D>(this.xmlnode.item)).position.x = this.x;
                            (<THREE.Object3D>(this.xmlnode.item)).position.y = this.y;

                            (<THREE.Object3D>(this.xmlnode.item)).position.z = this.z + (1 - r) * this.moveHeight;
                        } else {
                            r = (r - 0.3) / 0.4;
                            
                            (<THREE.Object3D>(this.xmlnode.item)).position.x = this.oldPos.x + (this.x - this.oldPos.x) * r;
                            (<THREE.Object3D>(this.xmlnode.item)).position.y = this.oldPos.y + (this.y - this.oldPos.y) * r;
                            (<THREE.Object3D>(this.xmlnode.item)).position.z = this.z + this.moveHeight;
                        }

                    } else {


                        (<THREE.Object3D>(this.xmlnode.item)).position.x = this.oldPos.x + (this.x - this.oldPos.x) * r;
                        (<THREE.Object3D>(this.xmlnode.item)).position.y = this.oldPos.y + (this.y - this.oldPos.y) * r;
                        (<THREE.Object3D>(this.xmlnode.item)).position.z = this.z;
                    }
                }

                break;
            case AnimationType.VIEW:
                if (this.xmlnode.itemVisible == null)
                    return;
                if (time >= this.startTime)
                {
                    if (this.xmlnode.isVisible == true)
                    {
                        this.xmlnode.itemVisible.visible = this.visible;
                    } else {
                        this.xmlnode.itemVisible.visible = false;
                    }
                }

                break;
        }

    }
    
}
