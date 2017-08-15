class BoxLine {
    constructor(id, pointKey1, pointKey2) {
        this.id = id;
        this.p1key = pointKey1;
        this.p2key = pointKey2;
        this.key = pointKey1 + "," + pointKey2;
        this.isCut = id.indexOf("CUT") == 0;
        this.isCrease = id.indexOf("CREASE") == 0;
    }
    getNextKey(start) {
        if (start == this.p1key)
            return this.p2key;
        if (start == this.p2key)
            return this.p1key;
        return null;
    }
}
// 1,1 정규화된 점  
//# sourceMappingURL=BoxLine.js.map