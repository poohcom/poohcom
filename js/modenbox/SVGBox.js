// 박스 
class SVGBox {
    constructor() {
        this.width = 0.0;
        this.height = 0.0;
    }
    //public init(doc: Document): void
    //{
    //    this.width = parseFloat(doc.getElementsByTagName("svg")[0].getAttribute("width"));
    //    this.height = parseFloat(doc.getElementsByTagName("svg")[0].getAttribute("height"));
    //    var lines = doc.getElementsByTagName("line");
    //    this.pointMap = new Map<string, BoxPoint>();
    //    this.lineMap = new Map<string, BoxLine>();
    //    this.graphMap = new Map<string, BoxLine[]>();
    //    this.faceMap = new Map<string, BoxFace>();
    //    for (var i: number = 0; i < lines.length; i++) {
    //        if (lines[i].getAttribute("id") == undefined)
    //            continue;
    //        var isBaseline: boolean = (lines[i].getAttribute("id").indexOf("BASELINE") == 0); 
    //        if (isBaseline)
    //            continue;
    //        var key1: string = lines[i].getAttribute("x1") + "," + lines[i].getAttribute("y1");
    //        if (this.pointMap.has(key1) == false)
    //        {
    //            var p: BoxPoint = new BoxPoint(parseFloat(lines[i].getAttribute("x1")) / this.width, parseFloat(lines[i].getAttribute("y1")) / this.height);
    //            this.pointMap.set(key1, p);
    //            this.graphMap.set(key1, [] );
    //        }
    //        var key2: string = lines[i].getAttribute("x2") + "," + lines[i].getAttribute("y2");
    //        if (this.pointMap.has(key2) == false) {
    //            var p: BoxPoint = new BoxPoint(parseFloat(lines[i].getAttribute("x2")) / this.width, parseFloat(lines[i].getAttribute("y2")) / this.height);
    //            this.pointMap.set(key2, p);
    //            this.graphMap.set(key2, []);
    //        }
    //        var boxLine: BoxLine = new BoxLine(lines[i].getAttribute("id"), key1, key2);
    //        boxLine.p1 = this.pointMap.get(key1);
    //        boxLine.p2 = this.pointMap.get(key2);
    //        this.lineMap.set(boxLine.key, boxLine);
    //        // 접는선
    //        if (boxLine.isCrease == true)
    //        {
    //            var boxLine2: BoxLine = new BoxLine(lines[i].getAttribute("id"), key2, key1);
    //            boxLine2.p1 = this.pointMap.get(key2);
    //            boxLine2.p2 = this.pointMap.get(key1);
    //            this.lineMap.set(boxLine2.key, boxLine2);
    //            var b1: BoxLine[] = this.graphMap.get(key1);
    //            b1.push(boxLine)
    //            this.graphMap.set(key1, b1);
    //            var b2: BoxLine[] = this.graphMap.get(key2);
    //            b2.push(boxLine2)
    //            this.graphMap.set(key2, b2);
    //        } else {
    //            // 짜를선
    //            var b1: BoxLine[] = this.graphMap.get(key1);
    //            b1.push(boxLine)
    //            this.graphMap.set(key1, b1);
    //            var b2: BoxLine[] = this.graphMap.get(key2);
    //            b2.push(boxLine)
    //            this.graphMap.set(key2, b2);
    //        }
    //    }
    //    console.log(this.pointMap.size);
    //    console.log(this.lineMap.size);
    //    console.log(this.faceMap.size);
    //    console.log(this.angle(603.507, 1197.469, 1453.901, 1197.469, 1453.901, 1196.051));
    //    console.log(this.angle(-1, 0, 0, 0, 0, 1));
    //    console.log(this.angle(1, 0, 0, 0, 1, 1));
    //    console.log(this.angle(1, 0, 0, 0, 1, -1));
    //    console.log(this.angle(0, 1, 0, 0, -1, 1));
    //    console.log(this.angle(0, 1, 0, 0, 1, 1));
    //    var count: number = 0;
    //    while (true)
    //    {
    //        var startLine: BoxLine = this.getStartLine();
    //        if (startLine == null)
    //        {
    //            break;
    //        }
    //        var startKey: string = startLine.p1key;         
    //        var nextKey: string = startLine.p1key; 
    //        var face: BoxFace = new BoxFace();
    //        face.list += startLine.p1key + ",";
    //        while (startLine != null) {
    //            this.lineMap.delete(startLine.key);
    //            face.list += startLine.getNextKey(nextKey) + ",";
    //            if (startKey == startLine.getNextKey(nextKey) )
    //            {
    //                count++;
    //                this.faceMap.set(count.toString(), face);
    //                break;
    //            }
    //            var lineList: BoxLine[] = this.graphMap.get(startLine.getNextKey(nextKey));
    //            nextKey = startLine.getNextKey(nextKey);
    //            var oldLine: BoxLine = startLine;
    //            startLine = null;
    //            var maxRad: number = 0;
    //            for (var i: number = 0; i < lineList.length; i++) {
    //                var checkLine: BoxLine = this.lineMap.get(lineList[i].key);
    //                if (checkLine == undefined)
    //                    continue;
    //                if ((checkLine.p1key == oldLine.p1key && checkLine.p2key == oldLine.p2key)
    //                    ||
    //                    (checkLine.p1key == oldLine.p2key && checkLine.p2key == oldLine.p1key)
    //                )
    //                {
    //                    continue;
    //                } else
    //                {
    //                    var rad: number = 0;
    //                    if (oldLine.p1key == checkLine.p1key)
    //                    {
    //                        rad = this.angle(oldLine.p2.x, oldLine.p2.y, checkLine.p1.x, checkLine.p1.y, checkLine.p2.x, checkLine.p2.y);
    //                    } else if (oldLine.p1key == checkLine.p2key)
    //                    {
    //                        rad = this.angle(oldLine.p2.x, oldLine.p2.y, checkLine.p2.x, checkLine.p2.y, checkLine.p1.x, checkLine.p1.y);
    //                    }
    //                    else if (oldLine.p2key == checkLine.p1key) {
    //                        rad = this.angle(oldLine.p1.x, oldLine.p1.y, checkLine.p1.x, checkLine.p1.y, checkLine.p2.x, checkLine.p2.y);
    //                    } else if (oldLine.p2key == checkLine.p2key) {
    //                        rad = this.angle(oldLine.p1.x, oldLine.p1.y, checkLine.p2.x, checkLine.p2.y, checkLine.p1.x, checkLine.p1.y);
    //                    }
    //                    if (maxRad < rad )
    //                    {
    //                        maxRad = rad;
    //                        startLine = checkLine;
    //                    }
    //                }
    //            }
    //        }
    //    }
    //    for (var key of this.faceMap.keys()) {
    //        console.log(this.faceMap.get(key).list);
    //    }
    //    console.log(this.pointMap.size);
    //    console.log(this.lineMap.size);
    //    console.log(this.faceMap.size);
    //    // 접는 선은 방향별로
    //    // 절단선은 한번
    //    // 접는선이 있으면 시작
    //    // 없은 절단선으로
    //    SceneManager.instance().addFace(this.faceMap, this.width, this.height);
    //}
    init(doc) {
        this.width = parseFloat(doc.getElementsByTagName("svg")[0].getAttribute("width"));
        this.height = parseFloat(doc.getElementsByTagName("svg")[0].getAttribute("height"));
        var lines = doc.getElementsByTagName("line");
        this.pointMap = new Map();
        this.lineMap = new Map();
        this.graphMap = new Map();
        this.faceMap = new Map();
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].getAttribute("id") == undefined)
                continue;
            var isBaseline = (lines[i].getAttribute("id").indexOf("BASELINE") == 0);
            if (isBaseline)
                continue;
            var key1 = this.grid(lines[i].getAttribute("x1")) + "," + this.grid(lines[i].getAttribute("y1"));
            if (this.pointMap.has(key1) == false) {
                var p = new BoxPoint(parseFloat(lines[i].getAttribute("x1")) / this.width, parseFloat(lines[i].getAttribute("y1")) / this.height);
                this.pointMap.set(key1, p);
                this.graphMap.set(key1, []);
            }
            var key2 = this.grid(lines[i].getAttribute("x2")) + "," + this.grid(lines[i].getAttribute("y2"));
            if (this.pointMap.has(key2) == false) {
                var p = new BoxPoint(parseFloat(lines[i].getAttribute("x2")) / this.width, parseFloat(lines[i].getAttribute("y2")) / this.height);
                this.pointMap.set(key2, p);
                this.graphMap.set(key2, []);
            }
            var boxLine = new BoxLine(lines[i].getAttribute("id"), key1, key2);
            boxLine.p1 = this.pointMap.get(key1);
            boxLine.p2 = this.pointMap.get(key2);
            this.lineMap.set(boxLine.key, boxLine);
            var boxLine2 = new BoxLine(lines[i].getAttribute("id"), key2, key1);
            boxLine2.p1 = this.pointMap.get(key2);
            boxLine2.p2 = this.pointMap.get(key1);
            this.lineMap.set(boxLine2.key, boxLine2);
            var b1 = this.graphMap.get(key1);
            b1.push(boxLine);
            this.graphMap.set(key1, b1);
            var b2 = this.graphMap.get(key2);
            b2.push(boxLine2);
            this.graphMap.set(key2, b2);
            //// 접는선
            //if (boxLine.isCrease == true) {
            //    var boxLine2: BoxLine = new BoxLine(lines[i].getAttribute("id"), key2, key1);
            //    boxLine2.p1 = this.pointMap.get(key2);
            //    boxLine2.p2 = this.pointMap.get(key1);
            //    this.lineMap.set(boxLine2.key, boxLine2);
            //    var b1: BoxLine[] = this.graphMap.get(key1);
            //    b1.push(boxLine)
            //    this.graphMap.set(key1, b1);
            //    var b2: BoxLine[] = this.graphMap.get(key2);
            //    b2.push(boxLine2)
            //    this.graphMap.set(key2, b2);
            //} else {
            //    // 짜를선
            //    var b1: BoxLine[] = this.graphMap.get(key1);
            //    b1.push(boxLine)
            //    this.graphMap.set(key1, b1);
            //    var b2: BoxLine[] = this.graphMap.get(key2);
            //    b2.push(boxLine)
            //    this.graphMap.set(key2, b2);
            //}
        }
        console.log(this.pointMap.size);
        console.log(this.lineMap.size);
        console.log(this.faceMap.size);
        var count = 0;
        while (true) {
            var startLine = this.getStartLine();
            if (startLine == null) {
                break;
            }
            var startKey = startLine.p1key;
            var nextKey = startLine.p1key;
            var face = new BoxFace();
            face.list += startLine.p1key + ",";
            while (startLine != null) {
                this.lineMap.delete(startLine.key);
                face.idlist += startLine.id + ",";
                face.list += startLine.getNextKey(nextKey) + ",";
                if (startKey == startLine.getNextKey(nextKey)) {
                    if (startLine.p1key == startLine.p2key) {
                        console.log("ERROR:" + face.idlist);
                        break;
                    }
                    count++;
                    this.faceMap.set(count.toString(), face);
                    console.log("success:" + face.idlist);
                    break;
                }
                var lineList = this.graphMap.get(startLine.getNextKey(nextKey));
                nextKey = startLine.getNextKey(nextKey);
                var oldLine = startLine;
                startLine = null;
                var maxRad = 0;
                for (var i = 0; i < lineList.length; i++) {
                    var checkLine = this.lineMap.get(lineList[i].key);
                    if (checkLine == undefined)
                        continue;
                    if ((checkLine.p1key == oldLine.p1key && checkLine.p2key == oldLine.p2key)
                        ||
                            (checkLine.p1key == oldLine.p2key && checkLine.p2key == oldLine.p1key)) {
                        continue;
                    }
                    else {
                        var rad = 0;
                        if (oldLine.p1key == checkLine.p1key) {
                            rad = this.angle(oldLine.p2.x, oldLine.p2.y, checkLine.p1.x, checkLine.p1.y, checkLine.p2.x, checkLine.p2.y);
                        }
                        else if (oldLine.p1key == checkLine.p2key) {
                            rad = this.angle(oldLine.p2.x, oldLine.p2.y, checkLine.p2.x, checkLine.p2.y, checkLine.p1.x, checkLine.p1.y);
                        }
                        else if (oldLine.p2key == checkLine.p1key) {
                            rad = this.angle(oldLine.p1.x, oldLine.p1.y, checkLine.p1.x, checkLine.p1.y, checkLine.p2.x, checkLine.p2.y);
                        }
                        else if (oldLine.p2key == checkLine.p2key) {
                            rad = this.angle(oldLine.p1.x, oldLine.p1.y, checkLine.p2.x, checkLine.p2.y, checkLine.p1.x, checkLine.p1.y);
                        }
                        if (maxRad < rad) {
                            maxRad = rad;
                            startLine = checkLine;
                        }
                    }
                }
                if (startLine == null) {
                    console.log("ERROR:" + face.idlist);
                }
            }
        }
        //console.log("success");
        //for (var key of this.faceMap.keys()) {
        //    console.log(this.faceMap.get(key).idlist);
        //}
        console.log(this.pointMap.size);
        console.log(this.lineMap.size);
        console.log(this.faceMap.size);
        // 접는 선은 방향별로
        // 절단선은 한번
        // 접는선이 있으면 시작
        // 없은 절단선으로
        SceneManager.instance().addFace(this.faceMap, this.width, this.height);
        //console.log(this.angle(603.507, 1197.469, 1453.901, 1197.469, 1453.901, 1196.051));
        //console.log(this.angle(-1, 0, 0, 0, 0, 1));
        //console.log(this.angle(1, 0, 0, 0, 1, 1));
        //console.log(this.angle(1, 0, 0, 0, 1, -1));
        //console.log(this.angle(0, 1, 0, 0, -1, 1));
        //console.log(this.angle(0, 1, 0, 0, 1, 1));
    }
    getStartLine() {
        for (var key of this.lineMap.keys()) {
            if (this.lineMap.get(key).isCrease == true) {
                return this.lineMap.get(key);
            }
        }
        for (var key of this.lineMap.keys()) {
            return this.lineMap.get(key);
        }
        return null;
    }
    angle(x1, y1, x2, y2, x3, y3) {
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
    grid(str) {
        return Math.round(parseFloat(str)).toString();
    }
}
//# sourceMappingURL=SVGBox.js.map