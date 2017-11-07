/// <reference path="../scripts/typings/createjs/createjs.d.ts" />
/// <reference path="../scripts/typings/jszip/index.d.ts" />
/// <reference path="../scripts/typings/jszip/jsziputil.d.ts" />
/// <reference path="../scripts/typings/three/index.d.ts" />
var Menu = (function () {
    function Menu() {
        //public mode: number = Menu.VIEW;
        this.mode = Menu.EDIT;
        //public mode: number = Menu.TAGEDIT;
        this.filename = "";
        this.fileIndex = 0;
        this.fileZipListIndex = 0;
        this.isLock = false;
        this.materialParams = {
            specularShininess: 0.5,
            reflectivity: 1.0,
            gamma: 0.5,
            bumpScale: 10,
            lightColor: "#ffffff",
            backgroundColor: "#000000",
            grid: true,
            bound: false,
            autorotate: false,
            speed: "1.00",
            axis: "x"
        };
        this.viewParams = {
            isPlay: true,
            speed: "1",
            time: 0.0
        };
        this.uiHeightIndex = 0;
        if (Menu._instance) {
            throw new Error("Error: Config instead of new.");
        }
        Menu._instance = this;
    }
    Menu.prototype.nextHeight = function () {
        return 20 * this.uiHeightIndex++;
    };
    Menu.instance = function () {
        if (Menu._instance === null) {
            Menu._instance = new Menu();
        }
        return Menu._instance;
    };
    Menu.prototype.init = function () {
        if (this.GetUrlValue("mode") != "") {
            if (this.GetUrlValue("mode") == "view") {
                this.mode = Menu.VIEW;
            }
            if (this.GetUrlValue("mode") == "edit") {
                this.mode = Menu.EDIT;
            }
            if (this.GetUrlValue("mode") == "tag") {
                this.mode = Menu.TAGEDIT;
            }
        }
        this.filename = this.GetUrlValue("filename");
        this.initDebug();
        this.createGUI();
        this.zipList = new Array();
        if (this.filename == "")
            return;
        JSZipUtils.getBinaryContent(this.filename, function (err, data) {
            if (err) {
                console.log("err:" + err);
            }
            else {
                // resolve(data);
                var new_zip = new JSZip();
                new_zip.loadAsync(data).then(function (content) {
                    console.log("new_zip:", content);
                    var jpgList = content.file(new RegExp("[\x21-\x7E]*.jpg"));
                    var pngList = content.file(new RegExp("[\x21-\x7E]*.png"));
                    //var mtlList: JSZipObject[] = content.file(new RegExp("[\x21-\x7E]*.mtl"));
                    var objList = content.file(new RegExp("[\x21-\x7E]*.obj"));
                    var svgList = content.file(new RegExp("[\x21-\x7E]*.svg"));
                    var packList = content.file(new RegExp("[\x21-\x7E]*.pack"));
                    for (var i = 0; i < packList.length; i++) {
                        Menu.instance().zipList.push(packList[i]);
                    }
                    for (var i = 0; i < jpgList.length; i++) {
                        Menu.instance().zipList.push(jpgList[i]);
                    }
                    for (var i = 0; i < pngList.length; i++) {
                        Menu.instance().zipList.push(pngList[i]);
                    }
                    for (var i = 0; i < svgList.length; i++) {
                        Menu.instance().zipList.push(svgList[i]);
                    }
                    //for (var i: number = 0; i < mtlList.length; i++) {
                    //  Menu.instance().zipList.push(mtlList[i]);
                    //}
                    for (var i = 0; i < objList.length; i++) {
                        Menu.instance().zipList.push(objList[i]);
                    }
                    Menu.instance().readFileZipList();
                });
            }
        });
    };
    Menu.prototype.initDebug = function () {
        /////
        this.fileApiAvailable = true;
        //if (window.File && window.FileReader && window.FileList && window.Blob) {
        //    console.log('File API is supported! Enabling all features.');
        //} else {
        //    this.fileApiAvailable = false;
        //    console.warn('File API is not supported! Disabling file loading.');
        //}
        var THIS = this;
        var stage = new createjs.Stage("uiCanvas");
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick", tick);
        function tick(event) {
            stage.update(event);
        }
        if (this.mode == Menu.VIEW) {
            return;
        }
        this.filePanel = new createjs.Container();
        this.filePanel.visible = false;
        this.filePanel.addEventListener("click", function (event) {
            THIS.filePanel.visible = false;
        });
        stage.addChild(this.filePanel);
        var button = new Button();
        button.init(100, 20, "파일", "#000000");
        button.x = 0;
        button.y = this.nextHeight();
        button.addEventListener("click", function (event) {
            THIS.filePanel.visible = true;
        });
        stage.addChild(button);
        ///
        var button = new Button();
        button.init(100, 20, "초기화", "#000000");
        button.x = 0;
        button.y = this.nextHeight();
        button.addEventListener("click", function (event) {
            SceneManager.instance().reset();
        });
        this.filePanel.addChild(button);
        ///
        var button = new Button();
        button.init(100, 20, "zip 파일 읽기", "#000000");
        button.x = 0;
        button.y = this.nextHeight();
        button.addEventListener("click", function (event) {
            console.log("파일 오픈");
            var elemFileInput = document.getElementById('fileUploadInput');
            elemFileInput.accept = ".zip";
            elemFileInput.multiple = false;
            elemFileInput.click();
        });
        this.filePanel.addChild(button);
        var button = new Button();
        button.init(100, 20, "zip 파일 저장", "#000000");
        button.x = 0;
        button.y = this.nextHeight();
        button.addEventListener("click", function (event) {
            SceneManager.instance().selectPack.saveZip();
        });
        this.filePanel.addChild(button);
        ///////
        document.getElementById('fileUploadInput').addEventListener('change', this.readMultiFile, false);
        if (this.mode == Menu.TAGEDIT) {
            return;
        }
        var button = new Button();
        button.init(100, 20, "SVG 파일 읽기", "#000000");
        button.x = 0;
        button.y = this.nextHeight();
        button.addEventListener("click", function (event) {
            console.log("파일 오픈");
            var elemFileInput = document.getElementById('fileUploadInput');
            elemFileInput.accept = ".svg";
            elemFileInput.multiple = true;
            elemFileInput.click();
        });
        this.filePanel.addChild(button);
        var button = new Button();
        button.init(100, 20, "jpg 파일 읽기", "#000000");
        button.x = 0;
        button.y = this.nextHeight();
        button.addEventListener("click", function (event) {
            console.log("jpg 파일 오픈");
            var elemFileInput = document.getElementById('fileUploadInput');
            elemFileInput.accept = ".jpg,.png";
            elemFileInput.multiple = true;
            elemFileInput.click();
        });
        this.filePanel.addChild(button);
        var button = new Button();
        button.init(100, 20, "obj 파일 읽기", "#000000");
        button.x = 0;
        button.y = this.nextHeight();
        button.addEventListener("click", function (event) {
            console.log("obj 파일 오픈");
            var elemFileInput = document.getElementById('fileUploadInput');
            elemFileInput.accept = ".obj";
            elemFileInput.multiple = true;
            elemFileInput.click();
        });
        this.filePanel.addChild(button);
        /////////////////
        /////////////
    };
    // 정리
    Menu.prototype.refreshEditFolder = function (nodeList) {
        this.createGUI();
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].type != XMLNodeType.VBOX) {
                this.addNode(nodeList[i]);
            }
        }
    };
    Menu.prototype.createGUI = function () {
        if (this.gui != null) {
            this.gui.destroy();
        }
        this.gui = new dat.GUI();
        var lightFolder = this.gui.addFolder('Material and Light');
        var viewFolder = this.gui.addFolder('View');
        this.editFolder = this.gui.addFolder('Edit');
        lightFolder.add(this.materialParams, "specularShininess", 0.0, 1.0).onChange(function (value) {
            SceneManager.instance().changeMaterial();
        });
        lightFolder.add(this.materialParams, "reflectivity", 0.0, 1.0).onChange(function (value) {
            SceneManager.instance().changeMaterial();
        });
        lightFolder.add(this.materialParams, "gamma", 0.0, 1.0).onChange(function (value) {
            SceneManager.instance().changeMaterial();
        });
        lightFolder.add(this.materialParams, "bumpScale", 0, 10).onChange(function (value) {
            SceneManager.instance().changeMaterial();
        });
        lightFolder.add(this.materialParams, "grid").onChange(function (value) {
            SceneManager.instance().visibleMenu(value);
        });
        lightFolder.add(this.materialParams, "autorotate").onChange(function (value) {
            SceneManager.instance().setAutoRotate(value);
        });
        lightFolder.add(this.materialParams, "speed", ["0.25", "0.50", "1.00", "2.00"]).onChange(function (value) {
            SceneManager.instance().setAutoRotateSpeed(parseFloat(value));
        });
        lightFolder.add(this.materialParams, "axis", ["x", "y", "z"]).onChange(function (value) {
            SceneManager.instance().setAutoRotateAxis(value);
        });
        lightFolder.add(this.materialParams, "bound").onChange(function (value) {
            SceneManager.instance().visibleBound(value);
        });
        var lightColor = lightFolder.addColor(this.materialParams, 'lightColor');
        lightColor.onChange(function (colorValue) {
            SceneManager.instance().changeMaterial();
        });
        var backgroundColor = lightFolder.addColor(this.materialParams, 'backgroundColor');
        backgroundColor.onChange(function (colorValue) {
            SceneManager.instance().renderer.setClearColor(colorValue);
        });
        viewFolder.add(this.viewParams, "speed", ["1", "0.5", "0.2", "0.1"]).onChange(function (value) {
            AnimationManager.instance().speed = parseFloat(value);
        });
        viewFolder.add(this.viewParams, "isPlay").onChange(function (value) {
            AnimationManager.instance().isPlay = value;
        });
        // 시간 컨트롤러
        //this.timeGUI = viewFolder.add(this.viewParams, "time", 0, 100).step(1);
        this.timeGUI = viewFolder.add(this.viewParams, "time", 0, 100).listen();
        this.timeGUI.onChange(function (value) {
            //AnimationManager.instance().updateTime(value);
        });
    };
    //private addNode(node: XMLNode):void
    //{
    //    var nodeFolder: dat.GUI = this.editFolder.addFolder(node.id);
    //    var viewParams = {
    //        isVisible: true,
    //        DELETE: false
    //    };
    //    nodeFolder.add(viewParams, "isVisible").onChange(function (value) {
    //        node.updateVisible(value);
    //    });
    //    if (this.mode == Menu.EDIT)
    //    {
    //        nodeFolder.add(viewParams, "DELETE").onChange(function (value) {
    //            if (value == true) {
    //                var r = confirm("삭제하시겠습니까?");
    //                if (r == true) {
    //                    Menu.instance().deleteNode(node);
    //                } 
    //            }
    //        });
    //    }
    //}
    Menu.prototype.addNode = function (node) {
        var nodeFolder = this.editFolder.addFolder(node.id);
        var viewParams = {
            isVisible: true,
            DELETE: function () {
                var r = confirm("삭제하시겠습니까?");
                if (r == true) {
                    Menu.instance().deleteNode(node);
                }
            },
            tag: function () {
                SceneManager.instance().selectPack.selectTagID(node.id);
            }
        };
        nodeFolder.add(viewParams, "isVisible").onChange(function (value) {
            node.updateVisible(value);
        });
        if (this.mode == Menu.EDIT) {
            nodeFolder.add(viewParams, "DELETE");
        }
        nodeFolder.add(viewParams, "tag");
        if (this.mode == Menu.EDIT || this.mode == Menu.TAGEDIT) {
            var tagParams = {
                edit: node.desc,
                delete: function () {
                    var r = confirm("태그를 삭제하시겠습니까?");
                    if (r == true) {
                        tagParams.edit = "";
                    }
                },
                save: function () {
                    SceneManager.instance().selectPack.editTagID(node.id, tagParams.edit);
                }
            };
            var tagFolder = nodeFolder.addFolder("setting tag");
            tagFolder.add(tagParams, "edit").listen();
            tagFolder.add(tagParams, "delete");
            tagFolder.add(tagParams, "save");
            //tagFolder.add(tagParams, "cancel");
        }
        //if (this.mode == Menu.EDIT || this.mode == Menu.TAGEDIT )
        //{
        //    var tagParams = {
        //        edit: node.desc,
        //        delete: function() {
        //            var r = confirm("태그를 삭제하시겠습니까?");
        //            if (r == true) {
        //                //SceneManager.instance().selectPack.deleteTagID(node.id);
        //                //SceneManager.instance().selectPack.editTagID(node.id, "");
        //                tagParams.edit = "";
        //            }
        //        },
        //        save: function() {
        //            SceneManager.instance().selectPack.editTagID(node.id, tagParams.edit);
        //        }
        //    };
        //    var tagFolder: dat.GUI = nodeFolder.addFolder("setting tag");
        //    tagFolder.add(tagParams, "edit").listen();
        //    tagFolder.add(tagParams, "delete");
        //    tagFolder.add(tagParams, "save");
        //}
    };
    Menu.prototype.deleteNode = function (node) {
        console.log(node.id);
        SceneManager.instance().selectPack.deleteNode(node.id);
    };
    Menu.prototype.readMultiFile = function (e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        Menu.instance().fileList = e.target.files;
        Menu.instance().fileIndex = 0;
        Menu.instance().readFile();
    };
    Menu.prototype.readFileZipList = function () {
        if (this.fileZipListIndex >= this.zipList.length) {
            SceneManager.instance().selectPack.refresh();
            return;
        }
        var zipFile = this.zipList[this.fileZipListIndex++];
        if (zipFile.name.indexOf('\.pack') > 0) {
            zipFile.async('string').then(function (txt) {
                console.log("the content:", zipFile.name);
                SceneManager.instance().selectPack.init();
                SceneManager.instance().selectPack.addFilePack(zipFile.name, txt);
                Menu.instance().readFileZipList();
            });
        }
        else if (zipFile.name.indexOf('\.jpg') > 0
            ||
                zipFile.name.indexOf('\.png') > 0) {
            zipFile.async('blob').then(function (raw) {
                console.log("the content:", zipFile.name);
                SceneManager.instance().selectPack.addFileImageForZip(zipFile.name, raw);
            });
        }
        else if (zipFile.name.indexOf('\.obj') > 0) {
            zipFile.async('string').then(function (txt) {
                console.log("the content:", zipFile.name);
                SceneManager.instance().selectPack.addFileObj(zipFile.name, txt);
                Menu.instance().readFileZipList();
            });
        }
        else if (zipFile.name.indexOf('\.svg') > 0) {
            zipFile.async('string').then(function (txt) {
                console.log("the content:", zipFile.name);
                SceneManager.instance().selectPack.addFileSvg(zipFile.name, txt);
                Menu.instance().readFileZipList();
            });
        }
        else {
            Menu.instance().readFileZipList();
        }
    };
    Menu.prototype.readFile = function () {
        var file = this.fileList[this.fileIndex++];
        this.zipList = new Array();
        this.fileZipListIndex = 0;
        if (!file) {
            SceneManager.instance().selectPack.refresh();
            return;
        }
        if (file.name.indexOf('\.zip') > 0) {
            var new_zip = new JSZip();
            new_zip.loadAsync(file).then(function (content) {
                console.log("new_zip:", content);
                var jpgList = content.file(new RegExp("[\x21-\x7E]*.jpg"));
                var pngList = content.file(new RegExp("[\x21-\x7E]*.png"));
                //var mtlList: JSZipObject[] = content.file(new RegExp("[\x21-\x7E]*.mtl"));
                var objList = content.file(new RegExp("[\x21-\x7E]*.obj"));
                var svgList = content.file(new RegExp("[\x21-\x7E]*.svg"));
                var packList = content.file(new RegExp("[\x21-\x7E]*.pack"));
                for (var i = 0; i < packList.length; i++) {
                    Menu.instance().zipList.push(packList[i]);
                }
                for (var i = 0; i < jpgList.length; i++) {
                    Menu.instance().zipList.push(jpgList[i]);
                }
                for (var i = 0; i < pngList.length; i++) {
                    Menu.instance().zipList.push(pngList[i]);
                }
                for (var i = 0; i < svgList.length; i++) {
                    Menu.instance().zipList.push(svgList[i]);
                }
                //for (var i: number = 0; i < mtlList.length; i++) {
                //  Menu.instance().zipList.push(mtlList[i]);
                //}
                for (var i = 0; i < objList.length; i++) {
                    Menu.instance().zipList.push(objList[i]);
                }
                Menu.instance().readFileZipList();
            });
        }
        if (file.name.indexOf('\.svg') > 0) {
            var reader = new FileReader();
            var fileName = file.name;
            reader.onload = function (e) {
                SceneManager.instance().selectPack.addFileSvgXML(fileName);
                SceneManager.instance().selectPack.addFileSvg(fileName, reader.result);
                Menu.instance().readFile();
            };
            reader.readAsText(file);
        }
        if (file.name.indexOf('\.jpg') > 0) {
            var reader = new FileReader();
            var fileName = file.name;
            var f = file;
            reader.onload = function (e) {
                SceneManager.instance().selectPack.addFileImage(fileName, f, reader.result);
                Menu.instance().readFile();
            };
            reader.readAsArrayBuffer(file); // 저장되나 이미지가 안되고
        }
        if (file.name.indexOf('\.png') > 0) {
            var reader = new FileReader();
            var fileName = file.name;
            var f = file;
            reader.onload = function (e) {
                SceneManager.instance().selectPack.addFileImage(fileName, f, reader.result);
                Menu.instance().readFile();
            };
            reader.readAsArrayBuffer(file); // 저장되나 이미지가 안되고
        }
        //if (file.name.indexOf('\.mtl') > 0) {
        //    var reader = new FileReader();
        //    var fileName: string = file.name;
        //    reader.onload = function (e) {
        //        SceneManager.instance().selectPack.addFileMtl(fileName, reader.result);
        //        Menu.instance().readFile();
        //    };
        //    reader.readAsText(file);
        //}
        if (file.name.indexOf('\.obj') > 0) {
            var reader = new FileReader();
            var fileName = file.name;
            reader.onload = function (e) {
                SceneManager.instance().selectPack.addFileObjXML(fileName);
                SceneManager.instance().selectPack.addFileObj(fileName, reader.result);
                Menu.instance().readFile();
            };
            reader.readAsText(file);
        }
    };
    // url
    Menu.prototype.GetUrlValue = function (VarSearch) {
        var SearchString = window.location.search.substring(1);
        var VariableArray = SearchString.split('&');
        for (var i = 0; i < VariableArray.length; i++) {
            var KeyValuePair = VariableArray[i].split('=');
            if (KeyValuePair[0] == VarSearch) {
                return KeyValuePair[1];
            }
        }
        return "";
    };
    return Menu;
}());
// 3가지 모드
// 
//public debug:boolean = true;
Menu.VIEW = 0;
Menu.TAGEDIT = 1;
Menu.EDIT = 2;
Menu._instance = null;
//# sourceMappingURL=Menu.js.map