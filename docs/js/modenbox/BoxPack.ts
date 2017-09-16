/// <reference path="../../scripts/typings/three/index.d.ts" />
/// <reference path="../../scripts/typings/three/detector.d.ts" />
/// <reference path="../../scripts/typings/stats.js/index.d.ts" />
/// <reference path="../../scripts/typings/dat-gui/index.d.ts" />
/// <reference path="../../scripts/typings/jszip/index.d.ts" />

// 1,1 정규화된 파일
class PackFile {
    public fileName: string;
    public type: FileType;
    public file: any;
    public fileData: any; // texture, group, THREE.MaterialCreator
};

enum FileType {
    PACK = 1,
    IMAGE,
    MTL,
    OBJ,
    SVG
};

enum NoneType {
    OBJ = 1,
    BOX,
    VBOX
};

class BoxPack {

    public packName: string; // zip 파일 저장시 이름 

    public files: Array<PackFile>; // 리소스 파일들

    private nodeList: Array<XMLNode>; // 노드 

    constructor() {
        this.files = new Array<PackFile>();

        this.nodeList = new Array<XMLNode>();

        this.packName = "noname";
    }

    public getNode(): Array<THREE.Object3D> {

        var list: Array<THREE.Object3D> = new Array<THREE.Object3D>();
        
        for (var i: number = 0; i < this.nodeList.length; ++i) {
            if (this.nodeList[i].type == XMLNodeType.OBJ)
            {
                this.nodeList[i].box.updateMatrixWorld(true);
                list.push(this.nodeList[i].box);
            }

        }

        //console.log("l" + list.length);

        return list;
    }

    public selectItem(item:any):void{

        if (item == null)
        {
            document.getElementById("desc").style.visibility = "hidden";
            return;
        }

        var list: Array<THREE.Object3D> = new Array<THREE.Object3D>();

        for (var i: number = 0; i < this.nodeList.length; ++i) {
            if (this.nodeList[i].type == XMLNodeType.OBJ) {
                if (this.nodeList[i].box == item)
                {
                    console.log(this.nodeList[i].desc);


                    document.getElementById("desc").style.visibility = "visible";

                    document.getElementById("desc").innerHTML = this.nodeList[i].desc;
                    return;

                }
            }
        }
    }

    public refresh(): void
    {

        // menu fresh

        for (var i: number = 0; i < this.nodeList.length; ++i) {

            

            if (this.nodeList[i].target == "" || this.nodeList[i].target == null)
            {
                console.log("add:" + this.nodeList[i].id);

                SceneManager.instance().scene.add(this.nodeList[i].item);
            } else {

                console.log("add:" + this.nodeList[i].id + ":" + this.nodeList[i].target);


                var node:XMLNode = this.findNode(this.nodeList[i].target);
                
                node.item.add(this.nodeList[i].item);
            }

            this.nodeList[i].update();
        }
        

        Menu.instance().refreshEditFolder(this.nodeList);
    }

    public findNode(id:string): XMLNode {
        for (var i: number = 0; i < this.nodeList.length; i++)
        {
            if (this.nodeList[i].id == id)
                return this.nodeList[i];
        }

        var xml:XMLNode= new XMLNode();
        xml.id = id;
        this.nodeList.push(xml);
        return xml;
    }

    public load(): void
    {
    }

    public save(): void
    {
        var zip = new JSZip();

        for (var i: number = 0; i < this.files.length; i++)
        {
            //zip.file(this.files[i].fileName, this.files[i].file, { base64: true });
            zip.file(this.files[i].fileName, this.files[i].file, { binary: true } );

            //zip.file(this.files[i].fileName, this.files[i].file);
        }

        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                FileWriter.instance().save(SceneManager.instance().selectPack.packName + ".zip", content);
        });
    }


    public saveZip(): void {
        var zip = new JSZip();

        for (var i: number = 0; i < this.files.length; i++) {
            zip.file(this.files[i].fileName, this.files[i].file, { binary: true });
        }
        
        zip.generateAsync({
            type: "blob",
            compression: "DEFLATE"
            })
            .then(function (content) {
                FileWriter.instance().save(SceneManager.instance().selectPack.packName + ".zip", content);
            });
    }

    public addFileImage(fileName: string, file: any, fileData:any): void
    {
        //var packFile: PackFile = SceneManager.instance().selectPack.getFileImg(fileName);
        var packFile: PackFile = this.getFileImg(fileName);
        packFile.fileName = fileName;
        packFile.file = fileData;
        packFile.type = FileType.IMAGE;

        this.files.push(packFile);
        
        var reader: FileReader = new FileReader();
        reader.onload = function (e) {
            var packFile: PackFile = SceneManager.instance().selectPack.getFileImg(fileName);
            
            //packFile.fileData.copy(new THREE.TextureLoader().load(reader.result) );
            packFile.fileData = new THREE.TextureLoader().load(reader.result);

            packFile.fileData.wrapS = packFile.fileData.wrapT = THREE.RepeatWrapping;
            packFile.fileData.anisotropy = 16;

            //SceneManager.instance().selectPack.refresh();
        };

        reader.readAsDataURL(file); // 저장되나 이미지가 안되고
    }


    public addFileImageForZip(fileName: string, fileData: any): void {

        var packFile: PackFile = this.getFileImg(fileName);
        packFile.fileName = fileName;
        packFile.file = fileData;
        packFile.type = FileType.IMAGE;

        var reader: FileReader = new FileReader();
        var fileNameScope: string = fileName;
        reader.onload = function (e) {
            console.log("img:" + fileNameScope);
            var packFile: PackFile = SceneManager.instance().selectPack.getFileImg(fileNameScope);

            //packFile.fileData.copy(new THREE.TextureLoader().load(reader.result));
            packFile.fileData = new THREE.TextureLoader().load(reader.result);
            packFile.fileData.wrapS = packFile.fileData.wrapT = THREE.RepeatWrapping;
            packFile.fileData.anisotropy = 16;
            Menu.instance().readFileZipList();
        };

        reader.readAsDataURL(fileData);
        
    }
    
    public getFileMtl(fileName:string): PackFile {
        for (var i: number = 0; i < this.files.length; i++) {
            if (this.files[i].fileName == fileName)
                return this.files[i];
        }

        var packFile: PackFile = new PackFile();
        packFile.fileName = fileName;

        packFile.type = FileType.MTL;
        this.files.push(packFile);

        return packFile;
    }

    public getFileImg(fileName:string): PackFile {
        for (var i: number = 0; i < this.files.length; i++) {
            if (this.files[i].fileName == fileName)
                return this.files[i];
        }

        var packFile: PackFile = new PackFile();
        packFile.fileName = fileName;
        packFile.type = FileType.IMAGE;
        //packFile.fileData = new THREE.TextureLoader().load('textures/UV_Grid_Sm.jpg');
        packFile.fileData = new THREE.Texture();//Loader().load('textures/UV_Grid_Sm.jpg');
        
        packFile.fileData.wrapS = packFile.fileData.wrapT = THREE.RepeatWrapping;
        packFile.fileData.anisotropy = 16;

        this.files.push(packFile);

        return packFile;
    }

    public addFileObj(fileName: string, objText:string): void {

        var id: string = fileName.replace(".obj", "");
        var filemtl: string = fileName.replace(".obj", ".mtl");

        var mtlFile: PackFile = this.getFileMtl(filemtl);

        var objLoader: THREE.OBJLoader = new THREE.OBJLoader();
        if (mtlFile != null)
        {
            objLoader.setMaterials(mtlFile.fileData);
        }

        var obj: THREE.Group = objLoader.parse(objText);

        for (var i: number = 0; i < obj.children.length; i++) {

            if (obj.children[i] instanceof THREE.Mesh) {
                (<THREE.Mesh>obj.children[i]).material.side = THREE.DoubleSide;
            }
        }

        var bbox: THREE.Box3 = new THREE.Box3();
        bbox.expandByObject(obj);
        
        //console.log(bbox.min);
        //console.log(bbox.max);
        //console.log(bbox.getCenter());
        //console.log(bbox.getSize());

        var helper: THREE.BoundingBoxHelper = new THREE.BoundingBoxHelper(obj, 0xff0000);
        helper.update();
        helper.visible = false;
        obj.add(helper);
        
   //     SceneManager.instance().scene.add(obj);

        var packFile: PackFile = new PackFile();
        packFile.fileName = fileName;
        packFile.file = objText;
        packFile.type = FileType.OBJ;
        packFile.fileData = obj;
        
        this.files.push(packFile);

        var node: XMLNode = this.findNode(id);
        

        if (node.sx != undefined)
        {
            var sv: THREE.Vector3 = bbox.getSize();

            console.log("sv:" + sv.x);
            console.log("sv:" + sv.y);
            console.log("sv:" + sv.z);

            console.log("node:" + node.sx);
            console.log("node:" + node.sy);
            console.log("node:" + node.sz);

            if (sv.x != 0) {
                obj.scale.x = node.sx / sv.x;
            }

            if (sv.y != 0) {
                obj.scale.y = node.sy / sv.y;
            }

            if (sv.z != 0) {
                obj.scale.z = node.sz / sv.z;
            }

            console.log("sc:" + obj.scale.x);
            console.log("sc:" + obj.scale.y);
            console.log("sc:" + obj.scale.z);

        } 
        var geometry: THREE.BoxBufferGeometry = new THREE.BoxBufferGeometry(bbox.getSize().x, bbox.getSize().y, bbox.getSize().z);
        //var object: THREE.Mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());

        var object: THREE.Mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: "#000", transparent: true, side: THREE.DoubleSide, alphaTest: 0 }));

        
        //object.visible = false;
        //object.material.uniforms.transparent = true;
        object.material.transparent = true;
        object.material.opacity = 0;
        object.position.x = bbox.getCenter().x;
        object.position.y = bbox.getCenter().y;
        object.position.z = bbox.getCenter().z;
        obj.add(object);

        node.box = object;
        node.setObj(obj);

    }
    
    public addFileMtl(fileName: string, mtlText: string): void {

        var mtlLoader: THREE.MTLLoader = new THREE.MTLLoader();
        var materials: THREE.MaterialCreator = mtlLoader.parse(mtlText);
        
        materials.preload();
        var packFile: PackFile = new PackFile();
        packFile.fileName = fileName;
        packFile.file = mtlText;
        
        packFile.type = FileType.MTL;
        packFile.fileData = materials;

        //this.materials1 = materials;
        this.files.push(packFile);

    }

    public addFilePack(fileName: string, packText:string): void {
        var packFile: PackFile = new PackFile();
        packFile.fileName = fileName;
        packFile.file = packText;
        packFile.type = FileType.PACK;

        var parser: DOMParser = new DOMParser();
        var xmlDoc: Document = parser.parseFromString(packText, "text/xml");

        var nodeList: NodeListOf<Element> = xmlDoc.getElementsByTagName("box");

        for (var i: number = 0; i < nodeList.length; i++)
        {
            var node: XMLNode = this.findNode(nodeList[i].id);
            node.target = nodeList[i].getAttribute("target");

            if (nodeList[i].getAttribute("virtual") != undefined)
            {
                var box: Box3D = new Box3D();
                box.isVBOX = true;

                //if (node.id == "TrayPad2") {
                //    box.rotation.x = 45 / 180.0 * Math.PI;
                //    box.rotation.x = 45 / 180.0 * Math.PI;
                //}
                node.setVBox(box);
            }

            if (nodeList[i].getAttribute("loc") != undefined)
            {
                var loc: string = nodeList[i].getAttribute("loc");
                var pos:string[] = loc.replace("(", "").replace(")", "").split(",");
                var animation: Animation = new Animation();
                animation.durationTime = 0;
                animation.index = 0;

                // 기본 시작위치
                animation.setTransform(parseFloat(pos[0]), parseFloat(pos[1]), 0, "U", 0,
                    0,0,0
                );
                node.addAnimation(animation);


            } else {
                var animation: Animation = new Animation();
                animation.durationTime = 0;
                animation.index = 0;
                // 기본 시작위치

                
                animation.setTransform(0,0, 0, "U", 0,
                    0, 0, 0
                );


                node.addAnimation(animation);
            }

            var animation: Animation = new Animation();
            animation.durationTime = 0;
            animation.index = 0;
            animation.setVisible(true);
            node.addAnimation(animation);

            var viewList: NodeListOf<Element> = nodeList[i].getElementsByTagName("view");
            for (var j: number = 0; j < viewList.length; j++)
            {

                var animation: Animation = new Animation();

                if (viewList[j].getAttribute("off") != undefined) {
                    animation.index = parseInt(viewList[j].getAttribute("off"));
                    animation.setVisible(false);
                } 

                if (viewList[j].getAttribute("on") != undefined) {
                    animation.index = parseInt(viewList[j].getAttribute("on"));
                    animation.setVisible(true);
                }

                node.addAnimation(animation);
            }

            var animateList: NodeListOf<Element> = nodeList[i].getElementsByTagName("animate");
            for (var k: number = 0; k < animateList.length; k++) {

                var animation: Animation = new Animation();

                animation.index = parseInt(animateList[k].getAttribute("begin"));
                animation.durationTime = parseFloat(animateList[k].getAttribute("dur"));


                // 에니
                var offset: string = animateList[k].getAttribute("offset");
                var offsetPos: string[] = offset.replace("(", "").replace(")", "").split(",");

                //animation.setPos(
                //    parseFloat(offsetPos[0]),
                //    parseFloat(offsetPos[1]),
                //    parseFloat(offsetPos[2]),
                //    animateList[k].getAttribute("moveType"),
                //    parseFloat(animateList[k].getAttribute("moveHeight"))
                //);

                var rotX: string = animateList[k].getAttribute("rotX");
                if (rotX == null || rotX == undefined)
                {
                    rotX = "0";
                }


                var rotY: string = animateList[k].getAttribute("rotY");
                
                    if (rotY == null || rotY == undefined)
                {
                    rotY = "0";
                }

                var rotZ: string = animateList[k].getAttribute("rotZ");
                if (rotZ == null || rotZ == undefined) {
                    rotZ = "0";
                }

                animation.setTransform(
                    parseFloat(offsetPos[0]),
                    parseFloat(offsetPos[1]),
                    parseFloat(offsetPos[2]),
                    animateList[k].getAttribute("moveType"),
                    parseFloat(animateList[k].getAttribute("moveHeight")),
                    parseFloat(rotX),
                    parseFloat(rotY),
                    parseFloat(rotZ)
                );

                node.addAnimation(animation);
            }
        }

        ///////////////////
        // 오브젝트

        var nodeList: NodeListOf<Element> = xmlDoc.getElementsByTagName("obj");
        
        for (var i: number = 0; i < nodeList.length; i++) {
            var node: XMLNode = this.findNode(nodeList[i].id);
            node.target = nodeList[i].getAttribute("base");
            
            if (nodeList[i].getAttribute("loc") != undefined) {
                var loc: string = nodeList[i].getAttribute("loc");
                var pos: string[] = loc.replace("(", "").replace(")", "").split(",");
                var animation: Animation = new Animation();
                animation.durationTime = 0;
                animation.index = 0;


                //기본 위치
                animation.setTransform(parseFloat(pos[0]), parseFloat(pos[1]), 0, "U", 0,
                0,0,0);
                node.addAnimation(animation);
            } else {

                //기본 위치
                var animation: Animation = new Animation();
                animation.durationTime = 0;
                animation.index = 0;
                animation.setTransform(0, 0, 0, "U", 0, 0,0,0);
                node.addAnimation(animation);
            }


            var dim: string = nodeList[i].getAttribute("dim");
            if (dim != "" && dim != null && dim != undefined) {
                var dimList: string[] = dim.replace("(", "").replace(")", "").split(",");
                node.sx = parseFloat(dimList[0]);
                node.sy = parseFloat(dimList[1]);
                node.sz = parseFloat(dimList[2]);
            }

            var animation: Animation = new Animation();
            animation.durationTime = 0;
            animation.index = 0;
            animation.setVisible(true);
            node.addAnimation(animation);

            var viewList: NodeListOf<Element> = nodeList[i].getElementsByTagName("view");
            for (var j: number = 0; j < viewList.length; j++) {

                var animation: Animation = new Animation();

                if (viewList[j].getAttribute("off") != undefined) {
                    animation.index = parseInt(viewList[j].getAttribute("off"));
                    animation.setVisible(false);
                }

                if (viewList[j].getAttribute("on") != undefined) {
                    animation.index = parseInt(viewList[j].getAttribute("on"));
                    animation.setVisible(true);
                }

                node.addAnimation(animation);
            }

            var animateList: NodeListOf<Element> = nodeList[i].getElementsByTagName("animate");
            for (var k: number = 0; k < animateList.length; k++) {

                var animation: Animation = new Animation();

                animation.index = parseInt(animateList[k].getAttribute("begin"));
                animation.durationTime = parseFloat(animateList[k].getAttribute("dur"));

                var offset: string = animateList[k].getAttribute("offset");
                var offsetPos: string[] = offset.replace("(", "").replace(")", "").split(",");

                animation.setTransform(
                    parseFloat(offsetPos[0]),
                    parseFloat(offsetPos[1]),
                    parseFloat(offsetPos[2]),
                    animateList[k].getAttribute("moveType"),
                    parseFloat(animateList[k].getAttribute("moveHeight")), 0, 0, 0
                    );

                node.addAnimation(animation);
            }

            var noteList: NodeListOf<Element> = nodeList[i].getElementsByTagName("note");
            for (var k: number = 0; k < noteList.length; k++) {

                if (noteList[k].childNodes.length > 1)
                {
                    var x = noteList[k].childNodes[1];
                    var txt = x.nodeValue;
                    node.desc = x.nodeValue;
                }
            }
        }

        this.files.push(packFile);

    }

    public addFileSvg(fileName: string, file: any): void {

        var id: string = fileName.replace(".svg", "");
        var packFile: PackFile = new PackFile();
        packFile.fileName = fileName;
        packFile.file = file;
        packFile.type = FileType.SVG;

        var parser: DOMParser = new DOMParser();
        var xmlDoc: Document = parser.parseFromString(file, "text/xml");

        var svg: SVGBox = new SVGBox();
        svg.fileName = fileName;
        svg.init(xmlDoc);
        packFile.fileData = svg;
        this.files.push(packFile);

        var node: XMLNode = this.findNode(id);
        
        node.setBox(svg.box3D);

    }

    public updateMaterialBox(bumpScale: number, diffuseColor: number, specularColor: number, reflectivity: number, specularShininess: number): void
    {
        for (var i: number = 0; i < this.files.length; i++)
        {
            if (this.files[i].type == FileType.SVG)
            {
                (<SVGBox>this.files[i].fileData).box3D.updateMaterialBox(bumpScale, diffuseColor, specularColor, reflectivity, specularShininess);
            }
        }
    }


    public updateTime(time: number)
    {
        for (var i: number = 0; i < this.nodeList.length; i++)
        {
            this.nodeList[i].updateTime(time);
        }

        //nodeList: Array<XMLNode>; // 노드 
    }

    public getAnimation(list: Array<Animation>)
    {
        for (var i: number = 0; i < this.nodeList.length; i++)
        {
            var aniList: Array<Animation> = this.nodeList[i].getAnimationList();

            for (var j: number = 0; j < aniList.length; j++) {
                list.push(aniList[j]);
            }
        }
    }
}

