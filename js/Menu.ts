/// <reference path="../scripts/typings/createjs/createjs.d.ts" />

class Menu
{

    filePanel: createjs.Container;
    renderSpeedPanel: createjs.Container;
    lightPanel: createjs.Container;
    materialPanel: createjs.Container;
    settingPanel: createjs.Container;
    fileApiAvailable: boolean;

    constructor() {
    }

    //public addButton()

    public init(): void {


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

        this.filePanel = new createjs.Container();
        this.filePanel.visible = false;

        this.filePanel.addEventListener("click", function (event: Event) {

            THIS.filePanel.visible = false;
        });

        stage.addChild(this.filePanel);

        var button = new Button();
        button.init(100, 20, "파일", "#000000");
        button.x = 0;
        button.y = 0;
        
        button.addEventListener("click", function (event: Event) {
            THIS.filePanel.visible = true;
        });

        stage.addChild(button);


        var button = new Button();
        button.init(100, 20, "SVG 파일 읽기", "#000000");
        button.x = 0;
        button.y = 20;
        button.addEventListener("click", function (event: Event) {

            console.log("파일 오픈");
            var elemFileInput: HTMLInputElement = <HTMLInputElement>document.getElementById('fileUploadInput');
            elemFileInput.accept = ".svg";
            elemFileInput.click();
        });
        this.filePanel.addChild(button);


        var button = new Button();
        button.init(100, 20, "jpg 파일 읽기", "#000000");
        button.x = 0;
        button.y = 40;
        button.addEventListener("click", function (event: Event) {

            console.log("jpg 파일 오픈");

            var elemFileInput: HTMLInputElement = <HTMLInputElement> document.getElementById('fileUploadInput');
            elemFileInput.accept = ".jpg";
            elemFileInput.click();
        });

        this.filePanel.addChild(button);

        var button = new Button();
        button.init(100, 20, "obj 파일 읽기", "#000000");
        button.x = 0;
        button.y = 60;
        button.addEventListener("click", function (event: Event) {

            console.log("obj 파일 오픈");
            var elemFileInput: HTMLInputElement = <HTMLInputElement>document.getElementById('fileUploadInput');
            elemFileInput.accept = ".obj";
            elemFileInput.click();

        });


        
        this.filePanel.addChild(button);

        var params = {
            specularShininess: 0.5,
            reflectivity: 1.0,
            gamma: 0.5,
            bumpScale: 10,
            lightColor : "#ffffff"
        };
        // Init gui
        var gui = new dat.GUI();
        gui.add(params, "specularShininess", 0.0, 1.0).onChange(function (value) {
            SceneManager.instance().updateParams(params);
            
        });

        gui.add(params, "reflectivity", 0.0, 1.0).onChange(function (value) {
            SceneManager.instance().updateParams(params);
        });
        gui.add(params, "gamma", 0.0, 1.0).onChange(function (value) {
            SceneManager.instance().updateParams(params);
        });
        gui.add(params, "bumpScale", 0, 10).onChange(function (value) {
            SceneManager.instance().updateParams(params);
        });
        
        var lightColor = gui.addColor(params, 'lightColor');
        
        lightColor.onChange(function (colorValue) {
            //the return value by the chooser is like as: #ffff
            //colorValue = colorValue.replace('#', '');
            //function hexToRgb(hex) {
            //    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            //    return result ? {
            //        r: parseInt(result[1], 16),
            //        g: parseInt(result[2], 16),
            //        b: parseInt(result[3], 16)
            //    } : null;
            //}
            //var rgba = hexToRgb(colorValue);

            //var color = outlinePass.visibleEdgeColor;
            //color.r = rgba.r / 255;
            //color.g = rgba.g / 255;
            //color.b = rgba.b / 255;

            SceneManager.instance().updateParams(params);

        });



        //class FizzyText {

        //    public message: string = 'dat.gu문서';
        //    public speed: Number = 0.8;
        //    public displayOutline: boolean = true;
        //    public explode = function () { };
        
        //}

        //var FizzyText2 = function () {
        //    this.message = 'dat.gui2';
        //    this.speed = 0.8;
        //    this.displayOutline = false;
        //    this.explode = function () { };
        //    // Define render logic ...
        //};

        //var text = new FizzyText();
        ////var gui = new dat.GUI({ autoPlace: false, closeOnTop: true, name: "test", closed: false });
        ////var gui = new dat.GUI({ autoPlace: false});
        //var gui = new dat.GUI();

        //gui.add(text, 'message');
        //gui.add(text, 'speed', -5, 5);
        //gui.add(text, 'displayOutline');
        //gui.add(text, 'explode');
        
        

        //var customContainer = document.getElementById('uiCanvas');
        //customContainer.appendChild(gui.domElement);
        
        function readSingleFile(e) {
            var file = e.target.files[0];
            

            if (!file) {
                return;
            }

            var files = e.target.files;
            
            for (var i = 0, file; file = files[i]; i++)
            {

                if (file.name.indexOf('\.svg') > 0)
                {

                    var reader = new FileReader();
                    reader.onload = function(e)
                    {
                        var parser: DOMParser = new DOMParser();
                        var xmlDoc: Document = parser.parseFromString(reader.result, "text/xml");
                        
                        //console.log(xmlDoc.getElementsByTagName("svg")[0].getAttribute("width"));
                        //console.log(xmlDoc.getElementsByTagName("svg")[0].getAttribute("height"));
                        //var lines = xmlDoc.getElementsByTagName("line");
                        
                        SceneManager.instance().addSVG(xmlDoc);
                    };

                    reader.readAsText(file);
                }

                if (file.name.indexOf('\.jpg') > 0)
                {
                    var reader = new FileReader();
                    reader.onload = function(e) {


                        var img = new Image();
                        img.src = reader.result;

                        SceneManager.instance().addTexture(new THREE.TextureLoader().load(reader.result));

                        //var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
                        //var bytes = new Uint8Array(reader.result);
                        //var blob = new Blob([bytes], { type: 'image/jpeg' });


                        //FileWriter.instance().save(blob);
                    };

                    reader.readAsDataURL(file);


                }
            }


        }

        

        document.getElementById('fileUploadInput').addEventListener('change', readSingleFile, false);
    }



}