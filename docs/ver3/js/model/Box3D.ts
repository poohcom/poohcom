/// <reference path="../../scripts/typings/three/index.d.ts" />

// 같은 텍스처를 사용하는 박스들
class Box3D extends THREE.Object3D {

    constructor() {
        super();

        this.childList = new Array<BoxFace>();
        this.helper = new THREE.BoundingBoxHelper(this, 0xff0000);

        this.root = new THREE.Object3D();
        this.add(this.root);
        this.root.add(this.helper);

    }
    // 이면의 기준 본
    public root: THREE.Object3D;

    public isVBOX: boolean=false;

    private helper: THREE.BoundingBoxHelper;

    // 이 박스에 해당하는 전체 면
    public childList: Array<BoxFace>;

    public updateMaterial(frontMaterial: THREE.Material, backMaterial: THREE.Material): void
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