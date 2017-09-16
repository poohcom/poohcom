/// <reference path="../../scripts/typings/createjs/createjs.d.ts" />
class Util {
    static getRad(line1, line2) {
        if (line1.p1key == line2.p1key) {
            return Util.angle(line1.p2.x, line1.p2.y, line2.p1.x, line2.p1.y, line2.p2.x, line2.p2.y);
        }
        else if (line1.p1key == line2.p2key) {
            return Util.angle(line1.p2.x, line1.p2.y, line2.p2.x, line2.p2.y, line2.p1.x, line2.p1.y);
        }
        else if (line1.p2key == line2.p1key) {
            return Util.angle(line1.p1.x, line1.p1.y, line2.p1.x, line2.p1.y, line2.p2.x, line2.p2.y);
        }
        else if (line1.p2key == line2.p2key) {
            return Util.angle(line1.p1.x, line1.p1.y, line2.p2.x, line2.p2.y, line2.p1.x, line2.p1.y);
        }
        return 0.0;
    }
    // 시계방향
    static angle(x1, y1, x2, y2, x3, y3) {
        var lega1, lega2, legb1, legb2;
        var norm, norm1, norm2, angle, prod, curl;
        lega1 = x1 - x2;
        legb1 = y1 - y2;
        lega2 = x3 - x2;
        legb2 = y3 - y2;
        norm1 = Math.sqrt(lega1 * lega1 + legb1 * legb1); //두 벡터의 크기 
        norm2 = Math.sqrt(lega2 * lega2 + legb2 * legb2); //두 벡터의 크기 
        norm = norm1 * norm2;
        prod = (lega1 * lega2) + (legb1 * legb2); //두 벡터의 내적 
        var r = Math.max(-1.0, Math.min(1.0, prod / norm));
        angle = Math.acos(r);
        curl = (lega1 * legb2) - (legb1 * lega2); //두 벡터의 외적 
        if (curl <= 0)
            return angle / Math.PI * 180;
        else
            return (360 - angle / Math.PI * 180);
    }
}
//# sourceMappingURL=Util.js.map