/// <reference path="./chameleon/controls.ts" />
/// <reference path="./chameleon/brushes.ts" />
var Chameleon;
(function (Chameleon) {
    function create(geometry, canvas) {
        return new Chameleon.Controls(geometry, canvas);
    }
    Chameleon.create = create;
})(Chameleon || (Chameleon = {}));
//# sourceMappingURL=chameleon.js.map