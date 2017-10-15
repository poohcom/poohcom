/// <reference path="../../scripts/typings/three/index.d.ts" />


class BoxFace3D extends THREE.Object3D {

    constructor() {
        super();

        this.helper = new THREE.BoundingBoxHelper(this, 0xff0000);
        this.add(this.helper);
    }

    private helper: THREE.BoundingBoxHelper;
    // 기준선
    public isBackFace: boolean = false;
    public updateMaterial(material: THREE.Material): void
    {
        var list: THREE.Object3D[] = this.children;

        for (var i: number = 0; i < list.length; i++) {
            if (list[i] instanceof THREE.Mesh)
            {
                (<THREE.Mesh>list[i]).material =  material;
            }
        }
    }    

    public updateMaterialBox(bumpScale: number, diffuseColor: number, specularColor: number, reflectivity: number, specularShininess: number): void
    {

        var list: THREE.Object3D[] = this.children;

        for (var i: number = 0; i < list.length; i++) {
            if (list[i] instanceof THREE.Mesh) {
                var material: THREE.MeshPhongMaterial = <THREE.MeshPhongMaterial>((<THREE.Mesh>list[i]).material);
                material.bumpScale = bumpScale;
               // material.color = new THREE.Color(diffuseColor);
                material.specular = new THREE.Color(specularColor);
                material.reflectivity = reflectivity;
                material.shininess = specularShininess;
            }
        }
    }    

    public updateTexture(map: THREE.Texture): void {
        var list: THREE.Object3D[] = this.children;

        for (var i: number = 0; i < list.length; i++) {
            if (list[i] instanceof THREE.Mesh) {
                if (this.isBackFace == false)
                {
                    (<THREE.MeshPhongMaterial>(<THREE.Mesh>list[i]).material).map = map;
                    (<THREE.MeshPhongMaterial>(<THREE.Mesh>list[i]).material).bumpMap = map;
                } 
            }
        }
    }

    public updatePos(px: number,py:number): void {
        var list: THREE.Object3D[] = this.children;

        for (var i: number = 0; i < list.length; i++) {
            if (list[i] instanceof THREE.Mesh) {

                //list[i].position.set(list[i].position.x - px, list[i].position.y - py,0);

                var geometry:any = (<THREE.Mesh>list[i]).geometry;

                for (var i: number = 0; i < geometry.vertices.length; i++) {
                    geometry.vertices[i].x = geometry.vertices[i].x - px;
                    geometry.vertices[i].y = geometry.vertices[i].y -py;
                }

               // geometry.computeBoundingBox();
            }
        }
    }    
    
}

// 면