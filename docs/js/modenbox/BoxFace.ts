/// <reference path="../../scripts/typings/three/index.d.ts" />

// 개별
class BoxFace{

    // 트리구조
    public childList: Array<BoxFace>;
    // 기준점
    public baselineKey: string;

    // 선리스트
    private lineIDList: Array<string>;

    // 점는선리스트
    public creaselineIDList: Array<string>;

    // 점는선 객체
    public creaselineList: Array<BoxLine>;

    // 점리스트
    public posXYList: string;
    
    // 앞면
    public faceFront: BoxFace3D;
    public faceBack: BoxFace3D;

    // 이면의 기준 본
    public rootBone: THREE.Object3D;
    // 회전 다시 정리하기 위한 본
    public rootNegativeBone: THREE.Object3D;

    // 회전시 기준 라인 - 방향 체크
    private rootCreaseLineID: string;

    // 회전시 기준 라인 - 방향 체크
    public creaseline: BoxLine;


    // 회전 방향
    private dir: THREE.Vector3;

    // 에니메이션 정보
    private animation:Animation;
    private boneMatrix: THREE.Matrix4;
    constructor() {
        //super();
        
        this.lineIDList = new Array<string>();
        this.creaselineIDList = new Array<string>();
        this.creaselineList = new Array<BoxLine>();
        this.creaseline = null;
        this.posXYList = "";

        //
        this.baselineKey = "";
        this.faceFront = null;
        this.faceBack = null;

        this.rootCreaseLineID = "";
        
        this.childList = new Array<BoxFace>();

        this.dir = null;
    }

    public centerX: number = 0;
    public centerY: number = 0;

    // 에니있는 것인지
    public isAnimation():boolean
    {
        return (this.dir != null);
    }

    public setCreaeLineID(lineID: string):void
    {
        this.rootCreaseLineID = lineID;

        for (var i: number = 0; i < this.creaselineList.length; i++)
        {
            if (this.creaselineList[i].id == lineID)
            {

                this.creaseline = this.creaselineList[i];
                this.animation = new Animation();
                this.animation.setRotate(this, lineID );

                return;
            }
        } 
    }



    public showLineIDList(): string {
        var ret: string = "";
        for (var i: number = 0; i < this.lineIDList.length; i++) {
            ret += this.lineIDList[i] + ",";
        }
        return ret;
    }

    // 기준면
    public isBaseline():boolean
    {
        return this.baselineKey != "";
    }

    // 접는선이 있는지
    public hasCreaseline(): boolean {
        return (this.creaselineIDList.length > 0);
    }

    public pushLineID(lineID: string):void
    {
        this.lineIDList.push(lineID);

        if (lineID.indexOf("CREASE") == 0)
        {
            this.creaselineIDList.push(lineID);
        }
    }

    public pushLine(line: BoxLine): void {
        
        if (line.id.indexOf("CREASE") == 0) {
            this.creaselineList.push(line);
        }
    }

    // face 리스트 box3d에 추가
    public addLink(box3d: Box3D): void
    {
        box3d.childList.push(this);

        for (var i: number = 0; i < this.childList.length; i++) {
            this.childList[i].addLink(box3d);
        }
    }

    public repos(r:number=0): void
    {
        this.rootBone = new THREE.Object3D();
        this.rootBone.frustumCulled = false;
        this.rootNegativeBone = new THREE.Object3D();
        this.rootNegativeBone.frustumCulled = false;

        this.rootBone.add(this.rootNegativeBone);

        this.rootNegativeBone.add(this.faceFront);
        this.rootNegativeBone.add(this.faceBack);

        
        // 메인 먼일경우
        if (this.isBaseline() == true)
        {
            //this.faceFront.updatePos(778, 970);
            //this.rootBone.position.set(-778, -970, 0);wafawfkp
            //this.rootBone.position.set();

            this.rootBone.position.set(this.centerX, this.centerY, 0); 
        } else {

            this.faceFront.updatePos(this.creaseline.p1.x, this.creaseline.p1.y);
            //this.faceBack.updatePos(this.creaseline.p1.x, this.creaseline.p1.y);

            this.dir= new THREE.Vector3();
            this.dir.x = this.creaseline.p2.x - this.creaseline.p1.x;
            this.dir.y = this.creaseline.p2.y - this.creaseline.p1.y;
            this.dir.z = 0;
            this.dir.normalize();


            this.boneMatrix = this.rootBone.matrix.clone();
            //this.rotateAroundObjectAxis(this.rootBone, this.dir, r);

        }
        

        for (var i: number = 0; i < this.childList.length; i++)
        {
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

    public rotateAroundObjectAxis(object: THREE.Object3D, axis: THREE.Vector3, radians: number): void {
        var rotObjectMatrix: THREE.Matrix4 = new THREE.Matrix4();
        rotObjectMatrix.makeRotationAxis(axis, radians);
        object.matrix = this.boneMatrix.clone();
        object.matrix.multiply(rotObjectMatrix);
        object.rotation.setFromRotationMatrix(object.matrix);
    }

    public setRootBonePosition(line: BoxLine): void
    {
        if (line == null)
        {
            this.rootBone.position.set(this.creaseline.p1.x, this.creaseline.p1.y, this.rootBone.position.z);
        } else {
            this.rootBone.position.set(this.creaseline.p1.x - line.p1.x, this.creaseline.p1.y - line.p1.y, this.rootBone.position.z);
        }
    }

    public updateMaterial(frontMaterial: THREE.MeshPhongMaterial, backMaterial: THREE.MeshPhongMaterial): void {

        this.faceFront.updateMaterial(frontMaterial);
        this.faceBack.updateMaterial(backMaterial);

        for (var i: number = 0; i < this.childList.length; i++) {
            this.childList[i].updateMaterial(frontMaterial, backMaterial);
        }
    }

    public updateMaterialBox(bumpScale: number, diffuseColor: number, specularColor: number, reflectivity: number, specularShininess: number): void {

        this.faceFront.updateMaterialBox(bumpScale, diffuseColor, specularColor, reflectivity, specularShininess);
        this.faceBack.updateMaterialBox(bumpScale, diffuseColor, specularColor, reflectivity, specularShininess);

        for (var i: number = 0; i < this.childList.length; i++) {
            this.childList[i].updateMaterialBox(bumpScale, diffuseColor, specularColor, reflectivity, specularShininess);
        }
    }
    public update(time: number):void
    {

        this.faceFront.update();
        this.faceBack.update();


        if (this.rootBone == null)
            return;

        if (this.dir == null)
            return;

        //this.animation.
        if (time < this.animation.startTime)
        {
            this.rotateAroundObjectAxis(this.rootBone, this.dir, 0);
        } else if (time > this.animation.endTime) {
            this.rotateAroundObjectAxis(this.rootBone, this.dir, this.animation.data);
        } else {

            if (this.animation.durationTime < 0.1)
            {

            } else {
                var r: number = (time - this.animation.startTime) / this.animation.durationTime * this.animation.data;
                this.rotateAroundObjectAxis(this.rootBone, this.dir, r);
            }
        }
    }

    public getAnimation(): Animation {
        return this.animation;
    }
   
}

// 면