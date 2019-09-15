/// <reference path="./common.ts" />
var Chameleon;
(function (Chameleon) {
    var mouseProjectionOnBall = (() => {
        var projGlobal = new THREE.Vector3(), projLocal = new THREE.Vector3();
        var upFactor = new THREE.Vector3(), eyeFactor = new THREE.Vector3(), sideFactor = new THREE.Vector3();
        return (event, canvasBox, up, eye) => {
            projLocal.set((event.pageX - canvasBox.width * 0.5 - canvasBox.left) / (canvasBox.width * .5), (canvasBox.height * 0.5 + canvasBox.top - event.pageY) / (canvasBox.height * .5), 0.0);
            var lengthSq = projLocal.lengthSq();
            if (lengthSq > 1.0) {
                projLocal.normalize();
            }
            else {
                projLocal.z = Math.sqrt(1.0 - lengthSq);
            }
            sideFactor.copy(up).cross(eye).setLength(projLocal.x);
            upFactor.copy(up).setLength(projLocal.y);
            eyeFactor.copy(eye).setLength(projLocal.z);
            return projGlobal.copy(sideFactor).add(upFactor).add(eyeFactor);
        };
    })();
    var touchProjectionOnBall = (() => {
        var projGlobal = new THREE.Vector3(), projLocal = new THREE.Vector3();
        var upFactor = new THREE.Vector3(), eyeFactor = new THREE.Vector3(), sideFactor = new THREE.Vector3();
        return (event, canvasBox, up, eye) => {
            projLocal.set((event.touches[0].pageX - canvasBox.width * 0.5 - canvasBox.left) / (canvasBox.width * .5), (canvasBox.height * 0.5 + canvasBox.top - event.touches[0].pageY) / (canvasBox.height * .5), 0.0);
            var lengthSq = projLocal.lengthSq();
            if (lengthSq > 1.0) {
                projLocal.normalize();
            }
            else {
                projLocal.z = Math.sqrt(1.0 - lengthSq);
            }
            sideFactor.copy(up).cross(eye).setLength(projLocal.x);
            upFactor.copy(up).setLength(projLocal.y);
            eyeFactor.copy(eye).setLength(projLocal.z);
            return projGlobal.copy(sideFactor).add(upFactor).add(eyeFactor);
        };
    })();
    let CameraControlsState;
    (function (CameraControlsState) {
        CameraControlsState[CameraControlsState["Idle"] = 0] = "Idle";
        CameraControlsState[CameraControlsState["Pan"] = 1] = "Pan";
        CameraControlsState[CameraControlsState["Rotate"] = 2] = "Rotate";
    })(CameraControlsState = Chameleon.CameraControlsState || (Chameleon.CameraControlsState = {}));
    class CameraControlsBase {
        constructor(camera, canvasBox) {
            this.camera = camera;
            this.canvasBox = canvasBox;
            this.rotateSpeed = 1.5;
            this.panSpeed = 0.8;
            this.zoomSpeed = 1.2;
            this._state = CameraControlsState.Idle;
            this._eye = new THREE.Vector3();
            this.target = new THREE.Vector3();
            this._rotateStart = new THREE.Vector3();
            this._rotateEnd = new THREE.Vector3();
            this._zoomStart = 0;
            this._zoomEnd = 0;
            this._panStart = new THREE.Vector2();
            this._panEnd = new THREE.Vector2();
            this.rotateCamera = (() => {
                var axis = new THREE.Vector3(), quaternion = new THREE.Quaternion();
                return () => {
                    var angle = Math.acos(this._rotateStart.dot(this._rotateEnd) / this._rotateStart.length() / this._rotateEnd.length());
                    if (angle) {
                        axis.crossVectors(this._rotateStart, this._rotateEnd).normalize();
                        angle *= this.rotateSpeed;
                        quaternion.setFromAxisAngle(axis, -angle);
                        this._eye.applyQuaternion(quaternion);
                        this.camera.up.applyQuaternion(quaternion);
                        this._rotateEnd.applyQuaternion(quaternion);
                        this._rotateStart.copy(this._rotateEnd);
                    }
                };
            })();
            this.panCamera = (() => {
                var mouseChange = new THREE.Vector2(), cameraUp = new THREE.Vector3(), pan = new THREE.Vector3();
                return () => {
                    mouseChange.subVectors(this._panEnd, this._panStart);
                    if (mouseChange.lengthSq()) {
                        mouseChange.multiplyScalar(this._eye.length() * this.panSpeed);
                        pan.crossVectors(this._eye, this.camera.up).setLength(mouseChange.x).add(cameraUp.copy(this.camera.up).setLength(mouseChange.y));
                        this.camera.position.add(pan);
                        this.target.add(pan);
                        this._panStart.copy(this._panEnd);
                    }
                };
            })();
            this.onMouseDown = (event) => {
                switch (event.button) {
                    case 0: // Left button
                        this._state = CameraControlsState.Rotate;
                        this._rotateStart.copy(this._getMouseProjectionOnBall(event));
                        this._rotateEnd.copy(this._rotateStart);
                        break;
                    case 2: // Right button
                        this._state = CameraControlsState.Pan;
                        this._panStart.copy(this._getMousePositionInCanvas(event));
                        this._panEnd.copy(this._panStart);
                        break;
                    default:
                        debugger;
                }
            };
            this.onMouseMove = (event) => {
                switch (this._state) {
                    case CameraControlsState.Rotate:
                        this._rotateEnd.copy(this._getMouseProjectionOnBall(event));
                        break;
                    case CameraControlsState.Pan:
                        this._panEnd.copy(this._getMousePositionInCanvas(event));
                        break;
                    default:
                        debugger;
                }
            };
            this.onMouseUp = (event) => {
                this._state = CameraControlsState.Idle;
            };
            this.onMouseWheel = (event) => {
                var delta = 0;
                //if (event.wheelDelta) { // WebKit / Opera / Explorer 9
                //    delta = -event.wheelDelta / 40;
                //} else if (event.detail) { // Firefox
                //    delta = event.detail / 3;
                //}
                this._zoomStart += delta * 0.01;
            };
            this.onTouchDown = (event) => {
                this._state = CameraControlsState.Rotate;
                this._rotateStart.copy(this._getTouchProjectionOnBall(event));
                this._rotateEnd.copy(this._rotateStart);
            };
            this.onTouchMove = (event) => {
                this._rotateEnd.copy(this._getTouchProjectionOnBall(event));
            };
            this.onTouchUp = (event) => {
                this._state = CameraControlsState.Idle;
            };
        }
        _getMousePositionInCanvas(event) {
            var pos = Chameleon.mousePositionInCanvas(event, this.canvasBox);
            pos.x /= this.canvasBox.width;
            pos.y /= this.canvasBox.height;
            return pos;
        }
        _getMouseProjectionOnBall(event) {
            return mouseProjectionOnBall(event, this.canvasBox, this.camera.up, this._eye);
        }
        _getTouchPositionInCanvas(event) {
            var pos = Chameleon.touchPositionInCanvas(event, this.canvasBox);
            pos.x /= this.canvasBox.width;
            pos.y /= this.canvasBox.height;
            return pos;
        }
        _getTouchProjectionOnBall(event) {
            return touchProjectionOnBall(event, this.canvasBox, this.camera.up, this._eye);
        }
        zoomCamera() {
            var factor = 1.0 + (this._zoomEnd - this._zoomStart) * this.zoomSpeed;
            if (factor !== 1.0 && factor > 0.0) {
                this.camera.zoom *= factor;
                this._zoomStart = this._zoomEnd;
                this.camera.updateProjectionMatrix();
            }
        }
        updateCamera() {
            this._eye.subVectors(this.camera.position, this.target);
            this.rotateCamera();
            this.zoomCamera();
            this.panCamera();
            this.camera.position.addVectors(this.target, this._eye);
            this.camera.lookAt(this.target);
        }
    }
    Chameleon.CameraControlsBase = CameraControlsBase;
    /**
     * A simplification of THREE.TrackballControls from the three.js examples
     */
    class PerspectiveCameraControls extends CameraControlsBase {
        constructor(camera, canvasBox) {
            super(camera, canvasBox);
            this.camera = camera;
            this.canvasBox = canvasBox;
        }
        handleResize() {
            this.camera.aspect = this.canvasBox.width / this.canvasBox.height;
            this.camera.updateProjectionMatrix();
        }
    }
    Chameleon.PerspectiveCameraControls = PerspectiveCameraControls;
    /**
     * A simplification of THREE.OrthographicTrackballControls from the three.js examples
     */
    class OrthographicCameraControls extends CameraControlsBase {
        constructor(camera, canvasBox) {
            super(camera, canvasBox);
            this.camera = camera;
            this.canvasBox = canvasBox;
            this._center0 = new THREE.Vector2((camera.left + camera.right) / 2, (camera.top + camera.bottom) / 2);
            this._viewSize = camera.top - camera.bottom;
            this.handleResize();
        }
        handleResize() {
            this.camera.top = this._center0.y + this._viewSize / 2;
            this.camera.bottom = this._center0.y - this._viewSize / 2;
            var ratio = this.canvasBox.width / this.canvasBox.height;
            this.camera.left = this._center0.x - this._viewSize / 2 * ratio;
            this.camera.right = this._center0.x + this._viewSize / 2 * ratio;
            this.camera.updateProjectionMatrix();
        }
    }
    Chameleon.OrthographicCameraControls = OrthographicCameraControls;
})(Chameleon || (Chameleon = {}));
//# sourceMappingURL=camera-controls.js.map