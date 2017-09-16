/// <reference path="../../scripts/typings/three/index.d.ts" />

// 같은 텍스처를 사용하는 박스들
class Box3D extends THREE.Object3D {

    constructor() {
        super();

        this.childList = new Array<BoxFace>();
        //this.frustumCulled = false;
        //this.helper = new THREE.BoundingBoxHelper(this, 0xff0000);
        //this.add(this.helper);
    }

    public isVBOX: boolean=false;

    private helper: THREE.BoundingBoxHelper;
    //public fileName:string;

    // 이 박스에 해당하는 전체 면
    public childList: Array<BoxFace>;

    public updateMaterial(frontMaterial: THREE.MeshPhongMaterial, backMaterial: THREE.MeshPhongMaterial): void
    {
        for (var i: number = 0; i < this.childList.length; i++)
        {
            this.childList[i].updateMaterial(frontMaterial, backMaterial);
        }
    }

    public update(time: number):void
    {
        for (var i: number = 0; i < this.childList.length; i++) {
            this.childList[i].update(time);
        }
    }

    public updateMaterialBox(bumpScale: number, diffuseColor: number, specularColor: number, reflectivity: number, specularShininess: number): void
    {
        for (var i: number = 0; i < this.childList.length; i++) {
            this.childList[i].updateMaterialBox(bumpScale, diffuseColor, specularColor, reflectivity, specularShininess);
        }
    }

}

// 면