class BoxLine {

    constructor(id:string,pointKey1: string, pointKey2: string) {
        this.id = id;
        this.p1key = pointKey1;  
        this.p2key = pointKey2;
        this.key = pointKey1 + "," + pointKey2;
        this.isCut = id.indexOf("CUT") == 0;
        this.isCrease = id.indexOf("CREASE") == 0;
    }


    public isCut: boolean;
    public isCrease: boolean;

    public id: string;
    public key: string;

    public p1key: string;
    public p2key: string;

    public p1:BoxPoint;
    public p2: BoxPoint;

    public getNextKey(start: string): string
    {
        if (start == this.p1key)
            return this.p2key;

        if (start == this.p2key)
            return this.p1key;

        return null
    }


}

// 1,1 정규화된 점 