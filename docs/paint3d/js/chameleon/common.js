/// <reference path="../three.d.ts" />
var Chameleon;
(function (Chameleon) {
    function mousePositionInCanvas(event, canvasBox) {
        return new THREE.Vector2(event.pageX - canvasBox.left, event.pageY - canvasBox.top);
    }
    Chameleon.mousePositionInCanvas = mousePositionInCanvas;
    function touchPositionInCanvas(event, canvasBox) {
        return new THREE.Vector2(event.touches[0].pageX - canvasBox.left, event.touches[0].pageY - canvasBox.top);
    }
    Chameleon.touchPositionInCanvas = touchPositionInCanvas;
    function showCanvasInNewWindow(canvas) {
        var dataURL = canvas.toDataURL("image/png");
        var newWindow = window.open();
        newWindow.document.write('<img style="border:1px solid black" src="' + dataURL + '"/>');
    }
    Chameleon.showCanvasInNewWindow = showCanvasInNewWindow;
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    Chameleon.getRandomInt = getRandomInt;
    function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
    Chameleon.getRandomFloat = getRandomFloat;
    function angleBetween(point1, point2) {
        return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }
    Chameleon.angleBetween = angleBetween;
})(Chameleon || (Chameleon = {}));
//# sourceMappingURL=common.js.map