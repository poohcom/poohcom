/// <reference path="../../scripts/typings/createjs/createjs.d.ts" />
class Button extends createjs.Container {
    constructor() {
        super();
    }
    init(w, h, buttontext, color) {
        var circle = new createjs.Shape();
        ////circle.graphics.beginFill("DeepSkyBlue").drawRoundRect(0, 0, w, h, h / 4.0);
        circle.graphics.beginLinearGradientFill(["#afafaf", "#cfcfcf", "#afafaf"], [0, 0.5, 1], 0, 0, 0, h).drawRect(0, 0, w, h);
        //circle.graphics.beginLinearGradientFill([ "#afafaf", "#cfcfcf", "#afafaf"], [0,0.5, 1], 0, 0, 0, h).drawRoundRect(0, 0, w, h, h / 4.0);
        this.addChild(circle);
        var text = new createjs.Text(buttontext, "12px Arial", color);
        var b = text.getBounds();
        console.log("w:" + b.width);
        console.log("h:" + b.height);
        text.x = (w - b.width) / 2;
        text.y = (h - b.height) / 2;
        this.addChild(text);
    }
}
//# sourceMappingURL=Button.js.map