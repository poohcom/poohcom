/// <reference path="../jszip.d.ts" />
/// <reference path="../three-objloaderexporter.d.ts" />
/// <reference path="./common.ts" />
/// <reference path="./camera-controls.ts" />
/// <reference path="./texture-manager.ts" />
/// <reference path="./brushes.ts" />
var Chameleon;
(function (Chameleon) {
    let ControlsState;
    (function (ControlsState) {
        ControlsState[ControlsState["Idle"] = 0] = "Idle";
        ControlsState[ControlsState["Draw"] = 1] = "Draw";
        ControlsState[ControlsState["View"] = 2] = "View";
    })(ControlsState || (ControlsState = {}));
    class Controls {
        constructor(geometry, canvas) {
            this._state = ControlsState.Idle;
            this._mesh = new THREE.Mesh();
            this.canvasBox = { left: 0, top: 0, width: 0, height: 0 };
            this._headLight = new THREE.PointLight(0xFFFFFF, 0.25);
            this._perspectiveView = false;
            this._scene = (() => {
                var scene = new THREE.Scene();
                var ambientLight = new THREE.AmbientLight(0x999999);
                scene.add(ambientLight);
                var light = new THREE.DirectionalLight(0xFFFFFF, 0.2);
                light.position.set(320, 390, 700);
                scene.add(light);
                var light2 = new THREE.DirectionalLight(0xFFFFFF, 0.2);
                light2.position.set(-720, -190, -300);
                scene.add(light2);
                scene.add(this._headLight);
                scene.add(this._mesh);
                return scene;
            })();
            this._renderer = (() => {
                var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                renderer.setClearColor(0xAAAAAA, 1.0);
                return renderer;
            })();
            this.brush = new Chameleon.Pencil();
            this._mousedown = (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (this._state !== ControlsState.Idle) {
                    return;
                }
                // Hold shift key to rotate and pan
                if (this.perspectiveView || event.shiftKey) {
                    this._state = ControlsState.View;
                    this._textureManager.useViewingTexture();
                    this._perspectiveCameraControls.onMouseDown(event);
                    this._orthographicCameraControls.onMouseDown(event);
                }
                else {
                    this._state = ControlsState.Draw;
                    this._textureManager.useDrawingTexture();
                    var pos = Chameleon.mousePositionInCanvas(event, this.canvasBox);
                    this.brush.startStroke(this._textureManager.drawingCanvas, pos);
                    this._textureManager.onStrokePainted(pos, this.brush.radius, true);
                }
                document.addEventListener('mousemove', this._mousemove, false);
                document.addEventListener('mouseup', this._mouseup, false);
            };
            this._mousemove = (event) => {
                if (this._state === ControlsState.Idle) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                switch (this._state) {
                    case ControlsState.View:
                        this._perspectiveCameraControls.onMouseMove(event);
                        this._orthographicCameraControls.onMouseMove(event);
                        break;
                    case ControlsState.Draw:
                        var pos = Chameleon.mousePositionInCanvas(event, this.canvasBox);
                        this.brush.continueStoke(pos);
                        this._textureManager.onStrokePainted(pos, this.brush.radius, false);
                        break;
                    default:
                        debugger;
                }
            };
            this._mouseup = (event) => {
                event.preventDefault();
                event.stopPropagation();
                this.brush.finishStroke();
                this.update();
                this._perspectiveCameraControls.onMouseUp(event);
                this._orthographicCameraControls.onMouseUp(event);
                this._state = ControlsState.Idle;
                document.removeEventListener('mousemove', this._mousemove);
                document.removeEventListener('mouseup', this._mouseup);
            };
            this._mousewheel = (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (this._state === ControlsState.Draw || !this.perspectiveView && !event.shiftKey) {
                    return;
                }
                this._textureManager.useViewingTexture();
                this._perspectiveCameraControls.onMouseWheel(event);
                this._orthographicCameraControls.onMouseWheel(event);
            };
            this._touchdown = (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (this._state !== ControlsState.Idle) {
                    return;
                }
                // Hold shift key to rotate and pan
                if (this.perspectiveView || event.shiftKey) {
                    this._state = ControlsState.View;
                    this._textureManager.useViewingTexture();
                    this._perspectiveCameraControls.onTouchDown(event);
                    this._orthographicCameraControls.onTouchDown(event);
                }
                else {
                    this._state = ControlsState.Draw;
                    this._textureManager.useDrawingTexture();
                    var pos = Chameleon.touchPositionInCanvas(event, this.canvasBox);
                    this.brush.startStroke(this._textureManager.drawingCanvas, pos);
                    this._textureManager.onStrokePainted(pos, this.brush.radius, true);
                }
                document.addEventListener('touchmove', this._touchmove, false);
                document.addEventListener('touchend', this._touchup, false);
            };
            this._touchmove = (event) => {
                if (this._state === ControlsState.Idle) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                switch (this._state) {
                    case ControlsState.View:
                        this._perspectiveCameraControls.onTouchMove(event);
                        this._orthographicCameraControls.onTouchMove(event);
                        break;
                    case ControlsState.Draw:
                        var pos = Chameleon.touchPositionInCanvas(event, this.canvasBox);
                        this.brush.continueStoke(pos);
                        this._textureManager.onStrokePainted(pos, this.brush.radius, false);
                        break;
                    default:
                        debugger;
                }
            };
            this._touchup = (event) => {
                event.preventDefault();
                event.stopPropagation();
                this.brush.finishStroke();
                this.update();
                this._perspectiveCameraControls.onTouchUp(event);
                this._orthographicCameraControls.onTouchUp(event);
                this._state = ControlsState.Idle;
                document.removeEventListener('touchmove', this._touchmove);
                document.removeEventListener('touchend', this._touchup);
            };
            this.geometry = geometry.clone();
            // Note that a crucial assumption is that this Mesh object will never be transformed (rotated, scaled, or translated)
            // This is crucial for both TextureManager and CameraControls to work properly
            this._mesh.geometry = this.geometry;
            if (!canvas) {
                canvas = document.createElement('canvas');
            }
            this.canvas = canvas;
            this.canvas.addEventListener('contextmenu', (e) => e.preventDefault(), false);
            this.canvas.addEventListener('mousedown', this._mousedown, false);
            this.canvas.addEventListener('mousewheel', this._mousewheel, false);
            this.canvas.addEventListener('DOMMouseScroll', this._mousewheel, false); // firefox
            this.canvas.addEventListener('touchstart', this._touchdown, false);
            this._initializeCamera();
            this._textureManager = new Chameleon.TextureManager(this._mesh, this._renderer, this._orthographicCamera);
            this.handleResize();
            this.update();
        }
        updateCanvasBox() {
            var canvasRect = this.canvas.getBoundingClientRect();
            var docElement = this.canvas.ownerDocument.documentElement;
            this.canvasBox.left = canvasRect.left + window.pageXOffset - docElement.clientLeft;
            this.canvasBox.top = canvasRect.top + window.pageYOffset - docElement.clientTop;
            this.canvasBox.width = canvasRect.width;
            this.canvasBox.height = canvasRect.height;
        }
        get perspectiveView() {
            return this._perspectiveView;
        }
        set perspectiveView(value) {
            if (this._perspectiveView === value) {
                return;
            }
            this._perspectiveView = value;
            if (value) {
                this._textureManager.useViewingTexture();
            }
        }
        get backgroundColor() {
            return this._textureManager.backgroundColor;
        }
        set backgroundColor(value) {
            this._textureManager.backgroundColor = value;
            this._textureManager.backgroundReset();
        }
        handleResize() {
            var devicePixelRatio = window.devicePixelRatio || 1; // Evaluates to 2 if Retina
            this._renderer.setSize(this.canvas.width / devicePixelRatio, this.canvas.height / devicePixelRatio);
            this.updateCanvasBox();
            this._orthographicCameraControls.handleResize();
            this._perspectiveCameraControls.handleResize();
            this._textureManager.useViewingTexture();
        }
        update() {
            this._perspectiveCameraControls.updateCamera();
            this._orthographicCameraControls.updateCamera();
            if (this.perspectiveView) {
                this._headLight.position.copy(this._perspectiveCamera.position);
                this._renderer.render(this._scene, this._perspectiveCamera);
            }
            else {
                this._headLight.position.copy(this._orthographicCamera.position);
                this._renderer.render(this._scene, this._orthographicCamera);
            }
            this.canvas.getContext('2d').drawImage(this._renderer.domElement, 0, 0);
        }
        static _computeBoundingBallRadius(geometry) {
            var radius = 0;
            var origin = new THREE.Vector3(0, 0, 0);
            for (var i = 0; i < geometry.vertices.length; i += 1) {
                radius = Math.max(radius, geometry.vertices[i].distanceTo(origin));
            }
            return radius;
        }
        _initializeCamera() {
            this._boundingBallRadius = Controls._computeBoundingBallRadius(this.geometry);
            var fov = 60;
            var z = 2 * this._boundingBallRadius / Math.tan(fov / 2 / 180 * Math.PI);
            this._orthographicCamera = new THREE.OrthographicCamera(-this._boundingBallRadius * 2, this._boundingBallRadius * 2, this._boundingBallRadius * 2, -this._boundingBallRadius * 2);
            this._orthographicCamera.position.z = z;
            this._orthographicCameraControls = new Chameleon.OrthographicCameraControls(this._orthographicCamera, this.canvasBox);
            this._perspectiveCamera = new THREE.PerspectiveCamera(fov, 1);
            this._perspectiveCamera.position.setZ(z);
            this._perspectiveCameraControls = new Chameleon.PerspectiveCameraControls(this._perspectiveCamera, this.canvasBox);
        }
        resetCameras() {
            var fov = 60;
            var z = 2 * this._boundingBallRadius / Math.tan(fov / 2 / 180 * Math.PI);
            this._orthographicCamera.position.set(0, 0, z);
            this._perspectiveCamera.position.set(0, 0, z);
            var origin = new THREE.Vector3(0, 0, 0);
            this._orthographicCameraControls.target.copy(origin);
            this._orthographicCamera.lookAt(origin);
            this._perspectiveCameraControls.target.copy(origin);
            this._perspectiveCamera.lookAt(origin);
            this._orthographicCamera.up.set(0, 1, 0);
            this._perspectiveCamera.up.set(0, 1, 0);
            this._orthographicCamera.zoom = 1;
            this._perspectiveCamera.zoom = 1;
            this._orthographicCamera.updateProjectionMatrix();
            this._perspectiveCamera.updateProjectionMatrix();
            this._orthographicCameraControls.handleResize();
            this._perspectiveCameraControls.handleResize();
            this._textureManager.useViewingTexture();
        }
        packTexture() {
            this._textureManager.usePackedTexture();
            var zip = new JSZip();
            var textureDataUrl = this._textureManager.packedTexture.toDataURL();
            zip.file('texture.png', textureDataUrl.substr(textureDataUrl.indexOf(',') + 1), { base64: true });
            var objData = new THREE.OBJExporter().parse(this.geometry);
            zip.file('model.obj', objData);
            return zip.generate({ type: 'blob' });
        }
        removeEventListeners() {
            document.removeEventListener('mousedown', this._mousedown);
            document.removeEventListener('mousewheel', this._mousewheel);
            document.removeEventListener('DOMMouseScroll', this._mousewheel);
            document.removeEventListener('mousemove', this._mousemove);
            document.removeEventListener('mouseup', this._mouseup);
            document.removeEventListener('touchstart', this._touchdown);
            document.removeEventListener('touchmove', this._touchmove);
            document.removeEventListener('touchend', this._touchup);
        }
    }
    Chameleon.Controls = Controls;
})(Chameleon || (Chameleon = {}));
//# sourceMappingURL=controls.js.map