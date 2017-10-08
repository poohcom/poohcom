/// <reference path="../../scripts/typings/three/index.d.ts" />
/// <reference path="../../scripts/typings/three/detector.d.ts" />
/// <reference path="../../scripts/typings/stats.js/index.d.ts" />
/// <reference path="../../scripts/typings/dat-gui/index.d.ts" />
/// <reference path="../../scripts/typings/jszip/index.d.ts" />

// 1,1 정규화된 파일
class PackFile {

    constructor() {
    
        this.file = null;

        this.fileData =null;
    }


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
    
    
    private xmlDoc: Document;

    constructor() {
        this.files = new Array<PackFile>();

        this.nodeList = new Array<XMLNode>();

        this.packName = "noname";
        
        this.addFilePack("noname.pack", "<?xml  version= '1.0' encoding= 'utf-8' ?><pack file=\"noname\" ></pack>");
    }

    public refreshImage(fileName: string, texture:THREE.Texture): void
    {
        var key: string = fileName.replace(".jpg", "").replace(".png", "");

        for (var i: number = 0; i < this.nodeList.length; ++i) {
            if (this.nodeList[i].type == XMLNodeType.OBJ && this.nodeList[i].id == key)
            {
                this.nodeList[i].updateImage(texture);
            }

            if (this.nodeList[i].type == XMLNodeType.BOX && this.nodeList[i].id == key) {
                this.nodeList[i].updateImage(texture);
            }
        }
    }


    public getNode(): Array<THREE.Mesh> {

        var list: Array<THREE.Mesh> = new Array<THREE.Mesh>();
        
        for (var i: number = 0; i < this.nodeList.length; ++i) {
            //if (this.nodeList[i].type == XMLNodeType.OBJ)

            if (this.nodeList[i].box!=null)
            {
                this.nodeList[i].box.updateMatrixWorld(true);
                list.push(this.nodeList[i].box);
            }

        }

        //console.log("l" + list.length);

        return list;
    }

    // 선택된 아이템의 desc 출력
    public selectItem(item:any):void{

        if (item == null)
        {
            document.getElementById("desc").style.visibility = "hidden";
            return;
        }

        for (var i: number = 0; i < this.nodeList.length; ++i) {
            //if (this.nodeList[i].type == XMLNodeType.OBJ) {
            if (this.nodeList[i].box == item && this.nodeList[i].desc != undefined && this.nodeList[i].desc!="" )
            {
                console.log(this.nodeList[i].desc);

                document.getElementById("desc").style.visibility = "visible";

                document.getElementById("desc").innerHTML = this.nodeList[i].desc;
                return;

            }
        }
    }

    public refresh(): void
    {
        // menu fresh
        console.log("refresh");

        for (var i: number = 0; i < this.nodeList.length; ++i) {

            console.log("info:" + this.nodeList[i].id);

            if (this.nodeList[i].target == "" || this.nodeList[i].target == null)
            {
                console.log("add:" + this.nodeList[i].id);

                SceneManager.instance().scene.add(this.nodeList[i].item);
            } else {

                console.log("add:" + this.nodeList[i].id + ":" + this.nodeList[i].target);

                var node:XMLNode = this.findNode(this.nodeList[i].target);

                // 계층 추가
                node.item.add(this.nodeList[i].item);

            }
            //this.nodeList[i].update();
        }

        Menu.instance().refreshEditFolder(this.nodeList);

        SceneManager.instance().changeMaterial();
    }

    public findNode(id:string): XMLNode {
        for (var i: number = 0; i < this.nodeList.length; i++)
        {
            if (this.nodeList[i].id == id)
                return this.nodeList[i];
        }

        var xml:XMLNode= new XMLNode();
        xml.id = id;
        console.log("xml:" + id);
        this.nodeList.push(xml);
        return xml;
    }

   

    public savePackFile(): void
    {
        var xmlSerializer: XMLSerializer = new XMLSerializer();
        
        var str:string = xmlSerializer.serializeToString(this.xmlDoc);

        var file: File =null;
        for (var i: number = 0; i < this.files.length; i++) {
            if (this.files[i].fileName == this.packName + ".pack")
            {
                this.files[i].file = str;
            }
        }
    }

    public saveZip(): void {

        this.savePackFile();

        var zip = new JSZip();

        for (var i: number = 0; i < this.files.length; i++) {

            if (this.files[i].type == FileType.IMAGE && this.files[i].fileData == null)
                continue;

            if (this.files[i].type == FileType.MTL && this.files[i].fileData == null)
                continue;

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

    // 그냥 파일읽기
    public addFileImage(fileName: string, file: any, fileData:any): void
    {
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
            packFile.fileData.needsUpdate = true;

            SceneManager.instance().selectPack.refreshImage(fileName, packFile.fileData);
        };

        reader.readAsDataURL(file); // 저장되나 이미지가 안되고
    }

    // zip에서 파일 읽기
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
            packFile.fileData.needsUpdate = true;

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
        packFile.fileData = null;
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
        packFile.fileData = null;

        this.files.push(packFile);

        return packFile;
    }

    public addFileObjXML(fileName: string): void {

        var packList: NodeListOf<Element> = this.xmlDoc.getElementsByTagName("pack");

        var node: any = this.xmlDoc.createElement("obj");

        var id: Attr = this.xmlDoc.createAttribute("id");
        id.nodeValue = fileName.replace(".obj", "");
        node.setAttributeNode(id);

        packList[0].appendChild(node);
    }


    public addFileObj(fileName: string, objText:string): void {

        var id: string = fileName.replace(".obj", "");
        var filemtl: string = fileName.replace(".obj", ".mtl");

        var mtlFile: PackFile = this.getFileMtl(filemtl);

        var objLoader: THREE.OBJLoader = new THREE.OBJLoader();
        if (mtlFile.fileData != null)
        {
            objLoader.setMaterials(mtlFile.fileData);
        } 

        var obj: THREE.Group = objLoader.parse(objText);
        obj.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                (<THREE.Mesh>child).material.side = THREE.DoubleSide;
            }
        });

        if (mtlFile.fileData  == null) {

            var fileimg: string = fileName.replace(".obj", ".jpg");

            var img: PackFile = this.getFileImg(fileimg);

            if (img.fileData == null)
            {
                var fileimgpng: string = fileName.replace(".obj", ".png");
                img = this.getFileImg(fileimgpng);
            }

            obj.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    (<THREE.MeshPhongMaterial>child.material).map = img.fileData;
                    (<THREE.MeshPhongMaterial>child.material).bumpMap = img.fileData;
                }
            });
        }

        var bbox: THREE.Box3 = new THREE.Box3();
        bbox.expandByObject(obj);
        
        var packFile: PackFile = new PackFile();
        packFile.fileName = fileName;
        packFile.file = objText;
        packFile.type = FileType.OBJ;
        packFile.fileData = obj;
        
        this.files.push(packFile);

        var node: XMLNode = this.findNode(id);
        
        // dim
        if (node.sx != undefined) {
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
        var object: THREE.Mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());
        
        object.material.transparent = true;
        object.material.opacity = 0.0;
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
        
        this.files.push(packFile);

    }

    public init(): void
    {
        while (this.files.length > 0) {
            this.files.pop();
        }
    }

    public addFilePack(fileName: string, packText: string): void
    {

        this.packName = fileName.replace(".pack", "");

        var packFile: PackFile = new PackFile();
        packFile.fileName = fileName;
        packFile.file = packText;
        packFile.type = FileType.PACK;

        var parser: DOMParser = new DOMParser();
        this.xmlDoc = parser.parseFromString(packText, "text/xml");


        var xmlSerializer: XMLSerializer = new XMLSerializer();
        var str: string = xmlSerializer.serializeToString(this.xmlDoc);



     //   var nodeList: NodeListOf<Element> = this.xmlDoc.getElementsByTagName("box");

        var packList: NodeListOf<Element> = this.xmlDoc.getElementsByTagName("pack");
        var nodeList: NodeListOf<Element> = packList[0].getElementsByTagName("box");


        for (var i: number = 0; i < nodeList.length; i++)
        {
            var node: XMLNode = this.findNode(nodeList[i].getAttribute("id"));

            node.target = nodeList[i].getAttribute("target");

            if (nodeList[i].getAttribute("virtual") != undefined)
            {
                var box: Box3D = new Box3D();
                box.isVBOX = true;

                //if (node.id == "TrayPad2") {
                //    box.rotation.x = 45 / 180.0 * Math.PI;
                //    box.rotation.x = 45 / 180.0 * Math.PI;
                //}

                var dim: string = nodeList[i].getAttribute("dim");
                if (dim != "" && dim != null && dim != undefined) {
                    var dimList: string[] = dim.replace("(", "").replace(")", "").split(",");
                    node.sx = parseFloat(dimList[0]);
                    node.sy = parseFloat(dimList[1]);
                    node.sz = parseFloat(dimList[2]);

                    var geometry: THREE.BoxBufferGeometry = new THREE.BoxBufferGeometry(
                        parseFloat(dimList[0]),
                        parseFloat(dimList[1]),
                        parseFloat(dimList[2])
                    );
                    var object: THREE.Mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());

                    object.material.transparent = true;
                    object.material.opacity = 0.0;
                    object.position.x = 0;
                    object.position.y = 0;
                    object.position.z = 0;
                    
                    box.add(object);

                    node.box = object;
                }

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
                node.clearAnimation();
                node.addAnimation(animation);


                var animation1: Animation = new Animation();
                animation1.durationTime = 0;
                animation1.index = 0;
                animation1.setVisible(true);
                node.addAnimation(animation1);

            } 

            var dim: string = nodeList[i].getAttribute("dim");
            if (dim != "" && dim != null && dim != undefined) {
                var dimList: string[] = dim.replace("(", "").replace(")", "").split(",");
                node.sx = parseFloat(dimList[0]);
                node.sy = parseFloat(dimList[1]);
                node.sz = parseFloat(dimList[2]);
            }

            
            var viewList: NodeListOf<Element> = nodeList[i].getElementsByTagName("view");
            for (var j: number = 0; j < viewList.length; j++)
            {

                var animation: Animation = new Animation();

                
                if (viewList[j].getAttribute("off") != undefined &&
                    viewList[j].getAttribute("off") != null &&
                      viewList[j].getAttribute("off") != ""
                 ) 
                {
                    animation.index = parseInt(viewList[j].getAttribute("off"));
                    animation.setVisible(false);
                } 
                
                if (viewList[j].getAttribute("on") != undefined &&
                    viewList[j].getAttribute("on") != null &&
                    viewList[j].getAttribute("on") != ""
                ) 
                {
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
                if (rotX == null || rotX == undefined || rotX =="" )
                {
                    rotX = "0";
                }


                var rotY: string = animateList[k].getAttribute("rotY");
                
                if (rotY == null || rotY == undefined || rotY == "")
                {
                    rotY = "0";
                }

                var rotZ: string = animateList[k].getAttribute("rotZ");
                if (rotZ == null || rotZ == undefined || rotZ == "")
                {
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

            var noteList: NodeListOf<Element> = nodeList[i].getElementsByTagName("note");
            for (var k: number = 0; k < noteList.length; k++) {

                if (noteList[k].childNodes.length > 1) {
                    var x = noteList[k].childNodes[1];
                    var txt = x.nodeValue;
                    node.desc = x.nodeValue;
                }
            }
        }

        ///////////////////
        // 오브젝트
        var packList: NodeListOf<Element> = this.xmlDoc.getElementsByTagName("pack");
        //var nodeList: NodeListOf<Element> = packList[0].getElementsByTagName("box");

        var nodeList: NodeListOf<Element> = packList[0].getElementsByTagName("obj");
        
        for (var i: number = 0; i < nodeList.length; i++) {
            var node: XMLNode = this.findNode(nodeList[i].getAttribute("id"));
            node.target = nodeList[i].getAttribute("base");
            
            if (nodeList[i].getAttribute("loc") != undefined) {
                var loc: string = nodeList[i].getAttribute("loc");
                var pos: string[] = loc.replace("(", "").replace(")", "").split(",");
                var animation: Animation = new Animation();
                animation.durationTime = 0;
                animation.index = 0;


                //기본 위치
                animation.setTransform(parseFloat(pos[0]), parseFloat(pos[1]), 0, "U", 0,
                    0, 0, 0);

                node.clearAnimation();
                node.addAnimation(animation);

                var animation1: Animation = new Animation();
                animation1.durationTime = 0;
                animation1.index = 0;
                animation1.setVisible(true);
                node.addAnimation(animation1);
            } 

            var dim: string = nodeList[i].getAttribute("dim");
            if (dim != "" && dim != null && dim != undefined) {
                var dimList: string[] = dim.replace("(", "").replace(")", "").split(",");
                node.sx = parseFloat(dimList[0]);
                node.sy = parseFloat(dimList[1]);
                node.sz = parseFloat(dimList[2]);
            }

        

            var viewList: NodeListOf<Element> = nodeList[i].getElementsByTagName("view");
            for (var j: number = 0; j < viewList.length; j++) {

                var animation: Animation = new Animation();

                if (viewList[j].getAttribute("off") != undefined &&
                    viewList[j].getAttribute("off") != null &&
                    viewList[j].getAttribute("off") != ""
                ) {
                    animation.index = parseInt(viewList[j].getAttribute("off"));
                    animation.setVisible(false);
                }

                //if (viewList[j].getAttribute("on") != undefined) {

                if (viewList[j].getAttribute("on") != undefined &&
                    viewList[j].getAttribute("on") != null &&
                    viewList[j].getAttribute("on") != ""
                ){
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

    public addFileSvgXML(fileName: string): void {

        var packList: NodeListOf<Element> = this.xmlDoc.getElementsByTagName("pack");

        var node: any = this.xmlDoc.createElement("box");

        var id: Attr = this.xmlDoc.createAttribute("id");
        id.nodeValue = fileName.replace(".svg", "");
        node.setAttributeNode(id);
        
        packList[0].appendChild(node);

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

        if (node.sx != undefined) {
            
            var geometry: THREE.BoxBufferGeometry = new THREE.BoxBufferGeometry(node.sx, node.sy, node.sz);

            var object: THREE.Mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());


            object.material.transparent = true;
            object.material.opacity = 0.0;
            //object.position.x = node.sx / 2.0;
            //object.position.y = node.sy / 2.0;
            //object.position.z = node.sz / 2.0;

            svg.box3D.add(object);

            node.box = object;
        }


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

            if (this.files[i].type == FileType.OBJ) {
                (<THREE.Group>this.files[i].fileData).traverse(function (child) {
                    if (child instanceof THREE.Mesh
                        && (<THREE.Mesh>child).material instanceof THREE.MeshPhongMaterial
                    )
                    {
                            var material: THREE.MeshPhongMaterial = <THREE.MeshPhongMaterial>((<THREE.Mesh>child).material);
                            material.bumpScale = bumpScale;
                            // material.color = new THREE.Color(diffuseColor);
                            material.specular = new THREE.Color(specularColor);
                            material.reflectivity = reflectivity;
                            material.shininess = specularShininess;
                    }
                });


                


                



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

