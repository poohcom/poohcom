/// <reference path="../../scripts/typings/three/index.d.ts" />
/// <reference path="../../scripts/typings/three/detector.d.ts" />
/// <reference path="../../scripts/typings/stats.js/index.d.ts" />
/// <reference path="../../scripts/typings/dat-gui/index.d.ts" />
/// <reference path="../../scripts/typings/jszip/index.d.ts" />
// 1,1 정규화된 파일
var PackFile = (function () {
    function PackFile() {
        this.file = null;
        this.fileData = null;
    }
    return PackFile;
}());
;
var FileType;
(function (FileType) {
    FileType[FileType["PACK"] = 1] = "PACK";
    FileType[FileType["IMAGE"] = 2] = "IMAGE";
    FileType[FileType["MTL"] = 3] = "MTL";
    FileType[FileType["OBJ"] = 4] = "OBJ";
    FileType[FileType["SVG"] = 5] = "SVG";
})(FileType || (FileType = {}));
;
var NoneType;
(function (NoneType) {
    NoneType[NoneType["OBJ"] = 1] = "OBJ";
    NoneType[NoneType["BOX"] = 2] = "BOX";
    NoneType[NoneType["VBOX"] = 3] = "VBOX";
})(NoneType || (NoneType = {}));
;
var BoxPack = (function () {
    function BoxPack() {
        this.files = new Array();
        this.nodeList = new Array();
        this.packName = "noname";
        this.addFilePack("noname.pack", "<?xml  version= '1.0' encoding= 'utf-8' ?>\n<pack file=\"noname\" ></pack>");
    }
    BoxPack.prototype.refreshImage = function (fileName, texture) {
        var key = fileName.replace(".jpg", "").replace(".png", "");
        for (var i = 0; i < this.nodeList.length; ++i) {
            if (this.nodeList[i].type == XMLNodeType.OBJ && this.nodeList[i].id == key) {
                this.nodeList[i].updateImage(texture);
            }
            if (this.nodeList[i].type == XMLNodeType.BOX && this.nodeList[i].id == key) {
                this.nodeList[i].updateImage(texture);
            }
        }
    };
    BoxPack.prototype.getNode = function () {
        var list = new Array();
        for (var i = 0; i < this.nodeList.length; ++i) {
            //if (this.nodeList[i].type == XMLNodeType.OBJ)
            if (this.nodeList[i].box != null) {
                // this.nodeList[i].box.updateMatrixWorld(true);
                list.push(this.nodeList[i].box);
            }
        }
        //console.log("0l:" + list.length);
        //AnimationManager.instance().getMeshes(list);
        //console.log("1l:" + list.length);
        return list;
    };
    BoxPack.prototype.getNode2 = function () {
        var list = new Array();
        for (var i = 0; i < this.nodeList.length; ++i) {
            if (this.nodeList[i].box != null && this.nodeList[i].itemVisible.visible == true) {
                this.nodeList[i].box.updateMatrixWorld(true);
                this.nodeList[i].addMesh(list);
            }
        }
        AnimationManager.instance().getMeshes(list);
        return list;
    };
    // 선택된 아이템의 desc 출력
    BoxPack.prototype.selectItem = function (item) {
        if (item == null) {
            document.getElementById("desc").style.visibility = "hidden";
            return;
        }
        for (var i = 0; i < this.nodeList.length; ++i) {
            //if (this.nodeList[i].type == XMLNodeType.OBJ) {
            if (this.nodeList[i].box == item && this.nodeList[i].desc != undefined && this.nodeList[i].desc != "") {
                console.log(this.nodeList[i].desc);
                document.getElementById("desc").style.visibility = "visible";
                document.getElementById("desc").innerHTML = this.nodeList[i].desc;
                return;
            }
        }
    };
    BoxPack.prototype.selectTagID = function (id) {
        for (var i = 0; i < this.nodeList.length; ++i) {
            //if (this.nodeList[i].type == XMLNodeType.OBJ) {
            if (this.nodeList[i].id == id && this.nodeList[i].desc != undefined && this.nodeList[i].desc != "") {
                console.log(this.nodeList[i].desc);
                document.getElementById("desc").style.visibility = "visible";
                document.getElementById("desc").innerHTML = this.nodeList[i].desc;
                return;
            }
        }
    };
    BoxPack.prototype.deleteTagID = function (id) {
        for (var i = 0; i < this.nodeList.length; ++i) {
            //if (this.nodeList[i].type == XMLNodeType.OBJ) {
            if (this.nodeList[i].id == id && this.nodeList[i].desc != undefined && this.nodeList[i].desc != "") {
                this.nodeList[i].desc = "";
            }
        }
        ///////////////////
        // 오브젝트
        var packList = this.xmlDoc.getElementsByTagName("pack");
        var nodeList = packList[0].getElementsByTagName("box");
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].getAttribute("id") == id) {
                var noteList = nodeList[i].getElementsByTagName("note");
                for (var k = 0; k < noteList.length; k++) {
                    nodeList[i].removeChild(noteList[k]);
                }
            }
        }
        var nodeList = packList[0].getElementsByTagName("obj");
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].getAttribute("id") == id) {
                var noteList = nodeList[i].getElementsByTagName("note");
                for (var k = 0; k < noteList.length; k++) {
                    nodeList[i].removeChild(noteList[k]);
                }
            }
        }
    };
    BoxPack.prototype.editTagID = function (id, desc) {
        for (var i = 0; i < this.nodeList.length; ++i) {
            if (this.nodeList[i].id == id) {
                this.nodeList[i].desc = desc;
            }
        }
        ///////////////////
        // 오브젝트
        var packList = this.xmlDoc.getElementsByTagName("pack");
        var nodeList = packList[0].getElementsByTagName("box");
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].getAttribute("id") == id) {
                var noteList = nodeList[i].getElementsByTagName("note");
                if (noteList.length == 0) {
                    var note = this.xmlDoc.createElement("note");
                    var cdata = this.xmlDoc.createCDATASection(desc);
                    note.appendChild(cdata);
                    nodeList[i].appendChild(note);
                }
                else {
                    var noteList = nodeList[i].getElementsByTagName("note");
                    for (var k = 0; k < noteList.length; k++) {
                        if (noteList[k].childNodes.length > 1) {
                            var x = noteList[k].childNodes[1];
                            x.nodeValue = desc;
                        }
                    }
                }
            }
        }
        var nodeList = packList[0].getElementsByTagName("obj");
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].getAttribute("id") == id) {
                var noteList = nodeList[i].getElementsByTagName("note");
                if (noteList.length == 0) {
                    var note = this.xmlDoc.createElement("note");
                    var cdata = this.xmlDoc.createCDATASection("");
                    note.appendChild(cdata);
                    nodeList[i].appendChild(note);
                }
                var noteList = nodeList[i].getElementsByTagName("note");
                for (var k = 0; k < noteList.length; k++) {
                    if (noteList[k].childNodes.length > 1) {
                        var x = noteList[k].childNodes[1];
                        x.nodeValue = desc;
                    }
                }
            }
        }
    };
    BoxPack.prototype.refresh = function () {
        // menu fresh
        console.log("refresh");
        for (var i = 0; i < this.nodeList.length; ++i) {
            //console.log("info:" + this.nodeList[i].id);
            if (this.nodeList[i].target == "" || this.nodeList[i].target == null) {
                //console.log("add:" + this.nodeList[i].id);
                SceneManager.instance().scene.add(this.nodeList[i].item);
            }
            else {
                //console.log("add:" + this.nodeList[i].id + ":" + this.nodeList[i].target);
                var node = this.findNode(this.nodeList[i].target);
                // 계층 추가
                node.item.add(this.nodeList[i].item);
            }
            //this.nodeList[i].update();
        }
        Menu.instance().refreshEditFolder(this.nodeList);
        SceneManager.instance().changeMaterial();
    };
    BoxPack.prototype.deleteNode = function (id) {
        for (var i = 0; i < this.nodeList.length; ++i) {
            if (this.nodeList[i].target == id) {
                this.nodeList[i].target = null;
            }
        }
        for (var i = 0; i < this.nodeList.length; ++i) {
            if (this.nodeList[i].id == id) {
                console.log("delete:" + this.nodeList[i].id);
                var item = this.nodeList[i].item;
                this.nodeList.splice(i, 1);
                break;
            }
        }
        for (var i = 0; i < this.nodeList.length; ++i) {
            if (this.nodeList[i].item.parent == item) {
                SceneManager.instance().scene.add(this.nodeList[i].item);
            }
        }
        this.traverse(SceneManager.instance().scene, function (child) {
            if (child == item) {
                //console.log("del:" + child.id);
                child.parent.remove(child);
            }
        });
        //       console.log("delete l:" + this.nodeList.length);
        var packList = this.xmlDoc.getElementsByTagName("pack");
        var nodeList = packList[0].getElementsByTagName("box");
        var objList = packList[0].getElementsByTagName("obj");
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].getAttribute("target") == id) {
                nodeList[i].removeAttribute("target");
            }
        }
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].getAttribute("id") == id) {
                nodeList[i].remove();
                break;
            }
        }
        for (var i = 0; i < objList.length; i++) {
            if (objList[i].getAttribute("base") == id) {
                objList[i].removeAttribute("base");
            }
        }
        for (var i = 0; i < objList.length; i++) {
            if (objList[i].getAttribute("id") == id) {
                objList[i].remove();
                break;
            }
        }
        //리소스 지우기
        for (var i = this.files.length - 1; i >= 0; i--) {
            var lastIndex = this.files[i].fileName.lastIndexOf(".");
            var fileID;
            if (lastIndex == -1) {
                fileID = this.files[i].fileName;
            }
            else {
                fileID = this.files[i].fileName.substring(0, lastIndex);
            }
            if (fileID == id) {
                this.files.splice(i, 1);
            }
        }
        ///////////
        SceneManager.instance().createScene();
        this.refresh();
    };
    BoxPack.prototype.traverse = function (obj, callback) {
        callback(obj);
        var children = obj.children;
        for (var i = children.length - 1; i >= 0; i--) {
            this.traverse(children[i], callback);
        }
    };
    BoxPack.prototype.findNode = function (id) {
        for (var i = 0; i < this.nodeList.length; i++) {
            if (this.nodeList[i].id == id)
                return this.nodeList[i];
        }
        var xml = new XMLNode();
        xml.id = id;
        console.log("xml:" + id);
        this.nodeList.push(xml);
        return xml;
    };
    BoxPack.prototype.savePackFile = function () {
        var xmlSerializer = new XMLSerializer();
        var str = xmlSerializer.serializeToString(this.xmlDoc);
        var file = null;
        for (var i = 0; i < this.files.length; i++) {
            if (this.files[i].fileName == this.packName + ".pack") {
                this.files[i].file = str;
            }
        }
    };
    BoxPack.prototype.saveZip = function () {
        this.savePackFile();
        var zip = new JSZip();
        for (var i = 0; i < this.files.length; i++) {
            if (this.files[i].type == FileType.IMAGE && this.files[i].fileData == null)
                continue;
            if (this.files[i].type == FileType.MTL && this.files[i].fileData == null)
                continue;
            if (this.files[i].type == FileType.PACK) {
                zip.file(this.files[i].fileName, this.files[i].file, { binary: false });
            }
            else {
                zip.file(this.files[i].fileName, this.files[i].file, { binary: true });
            }
        }
        zip.generateAsync({
            type: "blob",
            compression: "DEFLATE"
        })
            .then(function (content) {
            FileWriter.instance().save(SceneManager.instance().selectPack.packName + ".zip", content);
        });
    };
    // 그냥 파일읽기
    BoxPack.prototype.addFileImage = function (fileName, file, fileData) {
        var packFile = this.getFileImg(fileName);
        packFile.fileName = fileName;
        packFile.file = fileData;
        packFile.type = FileType.IMAGE;
        this.files.push(packFile);
        var reader = new FileReader();
        reader.onload = function (e) {
            var packFile = SceneManager.instance().selectPack.getFileImg(fileName);
            //packFile.fileData.copy(new THREE.TextureLoader().load(reader.result) );
            packFile.fileData = new THREE.TextureLoader().load(reader.result);
            packFile.fileData.wrapS = packFile.fileData.wrapT = THREE.RepeatWrapping;
            packFile.fileData.anisotropy = 16;
            packFile.fileData.needsUpdate = true;
            SceneManager.instance().selectPack.refreshImage(fileName, packFile.fileData);
        };
        reader.readAsDataURL(file); // 저장되나 이미지가 안되고
    };
    // zip에서 파일 읽기
    BoxPack.prototype.addFileImageForZip = function (fileName, fileData) {
        var packFile = this.getFileImg(fileName);
        packFile.fileName = fileName;
        packFile.file = fileData;
        packFile.type = FileType.IMAGE;
        var reader = new FileReader();
        var fileNameScope = fileName;
        reader.onload = function (e) {
            console.log("img:" + fileNameScope);
            var packFile = SceneManager.instance().selectPack.getFileImg(fileNameScope);
            //packFile.fileData.copy(new THREE.TextureLoader().load(reader.result));
            packFile.fileData = new THREE.TextureLoader().load(reader.result);
            packFile.fileData.wrapS = packFile.fileData.wrapT = THREE.RepeatWrapping;
            packFile.fileData.anisotropy = 16;
            packFile.fileData.needsUpdate = true;
            Menu.instance().readFileZipList();
        };
        reader.readAsDataURL(fileData);
    };
    BoxPack.prototype.getFileMtl = function (fileName) {
        for (var i = 0; i < this.files.length; i++) {
            if (this.files[i].fileName == fileName)
                return this.files[i];
        }
        var packFile = new PackFile();
        packFile.fileName = fileName;
        packFile.type = FileType.MTL;
        packFile.fileData = null;
        this.files.push(packFile);
        return packFile;
    };
    BoxPack.prototype.getFileImg = function (fileName) {
        for (var i = 0; i < this.files.length; i++) {
            if (this.files[i].fileName == fileName)
                return this.files[i];
        }
        var packFile = new PackFile();
        packFile.fileName = fileName;
        packFile.type = FileType.IMAGE;
        packFile.fileData = null;
        this.files.push(packFile);
        return packFile;
    };
    BoxPack.prototype.addFileObjXML = function (fileName) {
        var packList = this.xmlDoc.getElementsByTagName("pack");
        var node = this.xmlDoc.createElement("obj");
        var id = this.xmlDoc.createAttribute("id");
        id.nodeValue = fileName.replace(".obj", "");
        node.setAttributeNode(id);
        packList[0].appendChild(node);
    };
    BoxPack.prototype.addFileObj = function (fileName, objText) {
        var id = fileName.replace(".obj", "");
        var filemtl = fileName.replace(".obj", ".mtl");
        var mtlFile = this.getFileMtl(filemtl);
        var objLoader = new THREE.OBJLoader();
        if (mtlFile.fileData != null) {
            objLoader.setMaterials(mtlFile.fileData);
        }
        var obj = objLoader.parse(objText);
        obj.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material.side = THREE.DoubleSide;
            }
        });
        if (mtlFile.fileData == null) {
            var fileimg = fileName.replace(".obj", ".jpg");
            var img = this.getFileImg(fileimg);
            if (img.fileData == null) {
                var fileimgpng = fileName.replace(".obj", ".png");
                img = this.getFileImg(fileimgpng);
            }
            obj.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.map = img.fileData;
                    child.material.bumpMap = img.fileData;
                }
            });
        }
        var bbox = new THREE.Box3();
        bbox.expandByObject(obj);
        var packFile = new PackFile();
        packFile.fileName = fileName;
        packFile.file = objText;
        packFile.type = FileType.OBJ;
        packFile.fileData = obj;
        this.files.push(packFile);
        var node = this.findNode(id);
        // dim
        if (node.sx != undefined) {
            var sv = bbox.getSize();
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
        var geometry = new THREE.BoxBufferGeometry(bbox.getSize().x, bbox.getSize().y, bbox.getSize().z);
        var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());
        object.material.transparent = true;
        object.material.opacity = 0.0;
        object.position.x = bbox.getCenter().x;
        object.position.y = bbox.getCenter().y;
        object.position.z = bbox.getCenter().z;
        obj.add(object);
        var o = new THREE.Object3D();
        node.box = object;
        //node.box = obj;
        obj.position.z = bbox.getSize().z * obj.scale.z;
        o.add(obj);
        node.setObj(o);
        //node.setObj(obj);
    };
    BoxPack.prototype.addFileMtl = function (fileName, mtlText) {
        var mtlLoader = new THREE.MTLLoader();
        var materials = mtlLoader.parse(mtlText);
        materials.preload();
        var packFile = new PackFile();
        packFile.fileName = fileName;
        packFile.file = mtlText;
        packFile.type = FileType.MTL;
        packFile.fileData = materials;
        this.files.push(packFile);
    };
    BoxPack.prototype.init = function () {
        while (this.files.length > 0) {
            this.files.pop();
        }
    };
    BoxPack.prototype.addFilePack = function (fileName, packText) {
        this.packName = fileName.replace(".pack", "");
        var packFile = new PackFile();
        packFile.fileName = fileName;
        packFile.file = packText;
        packFile.type = FileType.PACK;
        var parser = new DOMParser();
        this.xmlDoc = parser.parseFromString(packText, "text/xml");
        var xmlSerializer = new XMLSerializer();
        var str = xmlSerializer.serializeToString(this.xmlDoc);
        //   var nodeList: NodeListOf<Element> = this.xmlDoc.getElementsByTagName("box");
        var packList = this.xmlDoc.getElementsByTagName("pack");
        var nodeList = packList[0].getElementsByTagName("box");
        for (var i = 0; i < nodeList.length; i++) {
            var node = this.findNode(nodeList[i].getAttribute("id"));
            node.target = nodeList[i].getAttribute("target");
            if (nodeList[i].getAttribute("virtual") != undefined) {
                var box = new Box3D();
                box.isVBOX = true;
                //if (node.id == "TrayPad2") {
                //    box.rotation.x = 45 / 180.0 * Math.PI;
                //    box.rotation.x = 45 / 180.0 * Math.PI;
                //}
                var dim = nodeList[i].getAttribute("dim");
                if (dim != "" && dim != null && dim != undefined) {
                    var dimList = dim.replace("(", "").replace(")", "").split(",");
                    node.sx = parseFloat(dimList[0]);
                    node.sy = parseFloat(dimList[1]);
                    node.sz = parseFloat(dimList[2]);
                    var geometry = new THREE.BoxBufferGeometry(parseFloat(dimList[0]), parseFloat(dimList[1]), parseFloat(dimList[2]));
                    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());
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
            if (nodeList[i].getAttribute("loc") != undefined) {
                var loc = nodeList[i].getAttribute("loc");
                var pos = loc.replace("(", "").replace(")", "").split(",");
                var animation = new Animation();
                animation.durationTime = 0;
                animation.index = 0;
                // 기본 시작위치
                if (pos.length > 2) {
                    animation.setTransform(parseFloat(pos[0]), parseFloat(pos[1]), parseFloat(pos[2]), "U", 0, 0, 0, 0);
                }
                else {
                    animation.setTransform(parseFloat(pos[0]), parseFloat(pos[1]), 0, "U", 0, 0, 0, 0);
                }
                node.clearAnimation();
                node.addAnimation(animation);
                var animation1 = new Animation();
                animation1.durationTime = 0;
                animation1.index = 0;
                animation1.setVisible(true);
                node.addAnimation(animation1);
            }
            var dim = nodeList[i].getAttribute("dim");
            if (dim != "" && dim != null && dim != undefined) {
                var dimList = dim.replace("(", "").replace(")", "").split(",");
                node.sx = parseFloat(dimList[0]);
                node.sy = parseFloat(dimList[1]);
                node.sz = parseFloat(dimList[2]);
            }
            var viewList = nodeList[i].getElementsByTagName("view");
            for (var j = 0; j < viewList.length; j++) {
                var animation = new Animation();
                if (viewList[j].getAttribute("off") != undefined &&
                    viewList[j].getAttribute("off") != null &&
                    viewList[j].getAttribute("off") != "") {
                    animation.index = parseInt(viewList[j].getAttribute("off"));
                    animation.setVisible(false);
                }
                if (viewList[j].getAttribute("on") != undefined &&
                    viewList[j].getAttribute("on") != null &&
                    viewList[j].getAttribute("on") != "") {
                    animation.index = parseInt(viewList[j].getAttribute("on"));
                    animation.setVisible(true);
                }
                node.addAnimation(animation);
            }
            var animateList = nodeList[i].getElementsByTagName("animate");
            for (var k = 0; k < animateList.length; k++) {
                var animation = new Animation();
                animation.index = parseInt(animateList[k].getAttribute("begin"));
                animation.durationTime = parseFloat(animateList[k].getAttribute("dur"));
                // 에니
                var offset = animateList[k].getAttribute("offset");
                var offsetPos = offset.replace("(", "").replace(")", "").split(",");
                //animation.setPos(
                //    parseFloat(offsetPos[0]),
                //    parseFloat(offsetPos[1]),
                //    parseFloat(offsetPos[2]),
                //    animateList[k].getAttribute("moveType"),
                //    parseFloat(animateList[k].getAttribute("moveHeight"))
                //);
                var rotX = animateList[k].getAttribute("rotX");
                if (rotX == null || rotX == undefined || rotX == "") {
                    rotX = "0";
                }
                var rotY = animateList[k].getAttribute("rotY");
                if (rotY == null || rotY == undefined || rotY == "") {
                    rotY = "0";
                }
                var rotZ = animateList[k].getAttribute("rotZ");
                if (rotZ == null || rotZ == undefined || rotZ == "") {
                    rotZ = "0";
                }
                animation.setTransform(parseFloat(offsetPos[0]), parseFloat(offsetPos[1]), parseFloat(offsetPos[2]), animateList[k].getAttribute("moveType"), parseFloat(animateList[k].getAttribute("moveHeight")), parseFloat(rotX), parseFloat(rotY), parseFloat(rotZ));
                node.addAnimation(animation);
            }
            var noteList = nodeList[i].getElementsByTagName("note");
            for (var k = 0; k < noteList.length; k++) {
                if (noteList[k].childNodes.length > 1) {
                    var x = noteList[k].childNodes[1];
                    var txt = x.nodeValue;
                    node.desc = x.nodeValue;
                }
            }
        }
        ///////////////////
        // 오브젝트
        var packList = this.xmlDoc.getElementsByTagName("pack");
        //var nodeList: NodeListOf<Element> = packList[0].getElementsByTagName("box");
        var nodeList = packList[0].getElementsByTagName("obj");
        for (var i = 0; i < nodeList.length; i++) {
            var node = this.findNode(nodeList[i].getAttribute("id"));
            node.target = nodeList[i].getAttribute("base");
            if (nodeList[i].getAttribute("loc") != undefined) {
                var loc = nodeList[i].getAttribute("loc");
                var pos = loc.replace("(", "").replace(")", "").split(",");
                var animation = new Animation();
                animation.durationTime = 0;
                animation.index = 0;
                if (pos.length > 2) {
                    animation.setTransform(parseFloat(pos[0]), parseFloat(pos[1]), parseFloat(pos[2]), "U", 0, 0, 0, 0);
                }
                else {
                    animation.setTransform(parseFloat(pos[0]), parseFloat(pos[1]), 0, "U", 0, 0, 0, 0);
                }
                //기본 위치
                node.clearAnimation();
                node.addAnimation(animation);
                var animation1 = new Animation();
                animation1.durationTime = 0;
                animation1.index = 0;
                animation1.setVisible(true);
                node.addAnimation(animation1);
            }
            var dim = nodeList[i].getAttribute("dim");
            if (dim != "" && dim != null && dim != undefined) {
                var dimList = dim.replace("(", "").replace(")", "").split(",");
                node.sx = parseFloat(dimList[0]);
                node.sy = parseFloat(dimList[1]);
                node.sz = parseFloat(dimList[2]);
            }
            var viewList = nodeList[i].getElementsByTagName("view");
            for (var j = 0; j < viewList.length; j++) {
                var animation = new Animation();
                if (viewList[j].getAttribute("off") != undefined &&
                    viewList[j].getAttribute("off") != null &&
                    viewList[j].getAttribute("off") != "") {
                    animation.index = parseInt(viewList[j].getAttribute("off"));
                    animation.setVisible(false);
                }
                //if (viewList[j].getAttribute("on") != undefined) {
                if (viewList[j].getAttribute("on") != undefined &&
                    viewList[j].getAttribute("on") != null &&
                    viewList[j].getAttribute("on") != "") {
                    animation.index = parseInt(viewList[j].getAttribute("on"));
                    animation.setVisible(true);
                }
                node.addAnimation(animation);
            }
            var animateList = nodeList[i].getElementsByTagName("animate");
            for (var k = 0; k < animateList.length; k++) {
                var animation = new Animation();
                animation.index = parseInt(animateList[k].getAttribute("begin"));
                animation.durationTime = parseFloat(animateList[k].getAttribute("dur"));
                var offset = animateList[k].getAttribute("offset");
                var offsetPos = offset.replace("(", "").replace(")", "").split(",");
                animation.setTransform(parseFloat(offsetPos[0]), parseFloat(offsetPos[1]), parseFloat(offsetPos[2]), animateList[k].getAttribute("moveType"), parseFloat(animateList[k].getAttribute("moveHeight")), 0, 0, 0);
                node.addAnimation(animation);
            }
            var noteList = nodeList[i].getElementsByTagName("note");
            for (var k = 0; k < noteList.length; k++) {
                if (noteList[k].childNodes.length > 1) {
                    var x = noteList[k].childNodes[1];
                    var txt = x.nodeValue;
                    node.desc = x.nodeValue;
                }
            }
        }
        this.files.push(packFile);
    };
    BoxPack.prototype.addFileSvgXML = function (fileName) {
        var packList = this.xmlDoc.getElementsByTagName("pack");
        var node = this.xmlDoc.createElement("box");
        var id = this.xmlDoc.createAttribute("id");
        id.nodeValue = fileName.replace(".svg", "");
        node.setAttributeNode(id);
        packList[0].appendChild(node);
    };
    BoxPack.prototype.addFileSvg = function (fileName, file) {
        var id = fileName.replace(".svg", "");
        var packFile = new PackFile();
        packFile.fileName = fileName;
        packFile.file = file;
        packFile.type = FileType.SVG;
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(file, "text/xml");
        var svg = new SVGBox();
        svg.fileName = fileName;
        svg.init(xmlDoc);
        packFile.fileData = svg;
        this.files.push(packFile);
        var node = this.findNode(id);
        if (node.sx != undefined) {
            var geometry = new THREE.BoxBufferGeometry(node.sx, node.sy, node.sz);
            var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());
            object.material.transparent = true;
            object.material.opacity = 0.0;
            //object.position.x = node.sx / 2.0;
            //object.position.y = node.sy / 2.0;
            //object.position.z = node.sz / 2.0;
            svg.box3D.add(object);
            node.box = object;
        }
        node.setBox(svg.box3D);
    };
    BoxPack.prototype.updateMaterialBox = function (bumpScale, diffuseColor, specularColor, reflectivity, specularShininess) {
        for (var i = 0; i < this.files.length; i++) {
            if (this.files[i].type == FileType.SVG) {
                this.files[i].fileData.box3D.updateMaterialBox(bumpScale, diffuseColor, specularColor, reflectivity, specularShininess);
            }
            if (this.files[i].type == FileType.OBJ) {
                this.files[i].fileData.traverse(function (child) {
                    if (child instanceof THREE.Mesh
                        && child.material instanceof THREE.MeshPhongMaterial) {
                        var material = (child.material);
                        material.bumpScale = bumpScale;
                        // material.color = new THREE.Color(diffuseColor);
                        material.specular = new THREE.Color(specularColor);
                        material.reflectivity = reflectivity;
                        material.shininess = specularShininess;
                    }
                });
            }
        }
    };
    BoxPack.prototype.updateTime = function (time) {
        for (var i = 0; i < this.nodeList.length; i++) {
            this.nodeList[i].updateTime(time);
        }
        //nodeList: Array<XMLNode>; // 노드 
    };
    BoxPack.prototype.getAnimation = function (list) {
        for (var i = 0; i < this.nodeList.length; i++) {
            var aniList = this.nodeList[i].getAnimationList();
            for (var j = 0; j < aniList.length; j++) {
                list.push(aniList[j]);
            }
        }
    };
    return BoxPack;
}());
//# sourceMappingURL=BoxPack.js.map