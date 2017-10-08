class BoxLine {

    constructor(id: string, pointKey1: string, pointKey2: string, isMaster: boolean) {
        this.id = id;
        this.p1key = pointKey1;  
        this.p2key = pointKey2;
        this.key = pointKey1 + "," + pointKey2;
        this.isCut = id.indexOf("CUT") == 0;
        this.isCrease = id.indexOf("CREASE") == 0;
        this.isMaster2 = isMaster;

        if (this.isCrease == true)
        {
            var list: string[] = id.split("-");
            this.animationGroup = list[1];
            this.animationOut = (list[2] == "out");
            this.animationDegree = parseFloat(list[3]);
        }
    }

    public isMaster2: boolean; //cut 에서 처음 생성한 라인인지 체크용
    public isMultilink: boolean = false;
    public isCut: boolean;
    public isCrease: boolean;

    public id: string;
    public key: string;

    public p1key: string;
    public p2key: string;

    public p1:BoxPoint;
    public p2: BoxPoint;

    public animationGroup: string;
    public animationOut: boolean;
    public animationDegree: number;

    public getNextKey(start: string): string
    {
        if (start == this.p1key)
            return this.p2key;

        if (start == this.p2key)
            return this.p1key;

        return null
    }

    public reversekey(): string {
        return this.p2key + "," + this.p1key;
    }
}

// 1,1 정규화된 점 