/// <reference path="../../scripts/typings/createjs/createjs.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super.call(this) || this;
    }
    Button.prototype.init = function (w, h, buttontext, color) {
        var circle = new createjs.Shape();
        ////circle.graphics.beginFill("DeepSkyBlue").drawRoundRect(0, 0, w, h, h / 4.0);
        circle.graphics.beginLinearGradientFill(["#afafaf", "#cfcfcf", "#afafaf"], [0, 0.5, 1], 0, 0, 0, h).drawRect(0, 0, w, h);
        //circle.graphics.beginLinearGradientFill([ "#afafaf", "#cfcfcf", "#afafaf"], [0,0.5, 1], 0, 0, 0, h).drawRoundRect(0, 0, w, h, h / 4.0);
        this.addChild(circle);
        var text = new createjs.Text(buttontext, "12px Arial", color);
        var b = text.getBounds();
        //console.log("w:" + b.width);
        //console.log("h:" + b.height);
        text.x = (w - b.width) / 2;
        text.y = (h - b.height) / 2;
        this.addChild(text);
    };
    return Button;
}(createjs.Container));
//# sourceMappingURL=Button.js.map