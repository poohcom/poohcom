/// <reference path="../../scripts/typings/three/index.d.ts" />
/// <reference path="../../scripts/typings/three/detector.d.ts" />
/// <reference path="../../scripts/typings/stats.js/index.d.ts" />
/// <reference path="../../scripts/typings/dat-gui/index.d.ts" />


// 박스 svg
class SVGBox
{
    constructor()
    {
    }
    public fileName:string;
    public width: number = 0.0;
    public height: number = 0.0;

    public pointMap: Map<string, BoxPoint>;
    public lineMap: Map<string, BoxLine>;
    public graphMap: Map<string, BoxLine[]>;
    public faceMap: Map<string, BoxFace>;
    public baselineMap: Map<string, BoxBaseline>;

    public box3D: Box3D;

    private AddLine(doc: Document): void
    {
        var lines = doc.getElementsByTagName("line");

        for (var i: number = 0; i < lines.length; i++) {

            if (lines[i].getAttribute("id") == undefined)
                continue;

            
            var lineID: string = lines[i].getAttribute("id");

            // 기준선
            var isBaseline: boolean = (lineID.indexOf("BASELINE") == 0);
            if (isBaseline)
            {
                var baselineKey: string = lineID.split("-")[0];

                var baseline: BoxBaseline;
                if (this.baselineMap.has(baselineKey) == false) {

                    baseline = new BoxBaseline();
                    this.baselineMap.set(baselineKey, baseline);

                } else {
                    baseline = this.baselineMap.get(baselineKey);
                }

                baseline.set(lineID, parseFloat(lines[i].getAttribute("x1")), parseFloat(lines[i].getAttribute("y1") ));

                continue;
            }

            var key1: string = this.grid(lines[i].getAttribute("x1")) + "," + this.grid(lines[i].getAttribute("y1"));
            if (this.pointMap.has(key1) == false) {
                //var p: BoxPoint = new BoxPoint(parseFloat(lines[i].getAttribute("x1")) / this.width, parseFloat(lines[i].getAttribute("y1")) / this.height);

                var p: BoxPoint = new BoxPoint(parseFloat(lines[i].getAttribute("x1")) , parseFloat(lines[i].getAttribute("y1")) );
                this.pointMap.set(key1, p);

                this.graphMap.set(key1, []);
            }

            var key2: string = this.grid(lines[i].getAttribute("x2")) + "," + this.grid(lines[i].getAttribute("y2"));
            if (this.pointMap.has(key2) == false) {
                //var p: BoxPoint = new BoxPoint(parseFloat(lines[i].getAttribute("x2")) / this.width, parseFloat(lines[i].getAttribute("y2")) / this.height);
                var p: BoxPoint = new BoxPoint(parseFloat(lines[i].getAttribute("x2")) , parseFloat(lines[i].getAttribute("y2")) );
                this.pointMap.set(key2, p);

                this.graphMap.set(key2, []);
            }

            if (key1 == key2)
                continue;

            var boxLine: BoxLine = new BoxLine(lines[i].getAttribute("id"), key1, key2, true);
            boxLine.p1 = this.pointMap.get(key1);
            boxLine.p2 = this.pointMap.get(key2);
            this.lineMap.set(boxLine.key, boxLine);

            var boxLine2: BoxLine = new BoxLine(lines[i].getAttribute("id"), key2, key1, false);
            boxLine2.p1 = this.pointMap.get(key2);
            boxLine2.p2 = this.pointMap.get(key1);
            this.lineMap.set(boxLine2.key, boxLine2);

            var b1: BoxLine[] = this.graphMap.get(key1);
            b1.push(boxLine)
            this.graphMap.set(key1, b1);

            var b2: BoxLine[] = this.graphMap.get(key2);
            b2.push(boxLine2)
            this.graphMap.set(key2, b2);
        }

        for (var key of this.graphMap.keys()) {

            var bb: BoxLine[] = this.graphMap.get(key);

            if (bb.length <= 2)
                continue;

            for (var i: number = 0; i < bb.length; i++) {
                bb[i].isMultilink = true;
            }

            this.graphMap.set(key, bb);
        }
    }

    public init(doc: Document): void {
        //var oSerializer: XMLSerializer = new XMLSerializer();
        //var sXML: string = oSerializer.serializeToString(doc);

        //console.log(sXML);


        this.width = parseFloat(doc.getElementsByTagName("svg")[0].getAttribute("width"));
        this.height = parseFloat(doc.getElementsByTagName("svg")[0].getAttribute("height"));

        this.pointMap = new Map<string, BoxPoint>();
        this.lineMap = new Map<string, BoxLine>();
        this.graphMap = new Map<string, BoxLine[]>();
        this.faceMap = new Map<string, BoxFace>();
        this.baselineMap = new Map<string, BoxBaseline>();

        this.AddLine(doc);

        var count: number = 0;

        var startLine: BoxLine = null;

        while (startLine = this.getStartLine())
        {
            var startKey: string = startLine.p1key;
            var nextKey: string = startLine.p1key;

            var face: BoxFace = new BoxFace();

            var circleDegree: number = 0;

            face.posXYList += startLine.p1key + ",";

            var startOriLine: BoxLine = startLine;

            while (startLine != null) {

                this.lineMap.delete(startLine.key);

                face.pushLineID(startLine.id);
                face.pushLine(startLine);

                nextKey = startLine.getNextKey(nextKey);
                face.posXYList += nextKey + ",";

                if (startKey == nextKey) {

                    circleDegree += 180 - this.getRad(startLine, startOriLine);

                    if (circleDegree >= 359) {
                        //console.log("ERROR_CIRCLEDEGREE:" + face.showLineIDList());
                        //console.log("circleDegree:" + circleDegree);
                        break;
                    }

                    //console.log("circleDegree:" + circleDegree);

                    count++;

                    this.faceMap.set(count.toString(), face);

                    //console.log("success:" + face.showLineIDList());
                    break;
                }

                var lineList: BoxLine[] = this.graphMap.get(nextKey);
                
                var oldLine: BoxLine = startLine;
                startLine = null;
                var maxRad: number = 0;
                for (var i: number = 0; i < lineList.length; i++) {

                    var checkLine: BoxLine = this.lineMap.get(lineList[i].key);
                    
                    if (checkLine == undefined)
                        continue;

                    if (
                        lineList.length > 1 && 
                        (
                        (checkLine.p1key == oldLine.p1key && checkLine.p2key == oldLine.p2key)
                        ||
                        (checkLine.p1key == oldLine.p2key && checkLine.p2key == oldLine.p1key)
                        )
                    ) {
                        continue;
                    } else {
                        var rad: number = this.getRad(oldLine, checkLine);
                        
                        if (maxRad < rad) {
                            maxRad = rad;
                            startLine = checkLine;
                        }
                    }
                }

                if (startLine == null) {
                    //console.log("ERROR:" + face.showLineIDList());
                } else {
                    circleDegree += 180 - maxRad;
                }
            }
        }

        this.addBox();

        this.addBoxChildList();

        //console.log("pointMap.size:" + this.pointMap.size);
        //console.log("faceMap.size:"+this.faceMap.size);
    }


    private addBox(): void {

        var w: number = this.width;
        var h: number = this.height;

        for (var key of this.faceMap.keys()) {

            var boxFace: BoxFace = this.faceMap.get(key);

            var list: string[] = boxFace.posXYList.split(",");

            var shape: THREE.Shape = new THREE.Shape();

            for (var i: number = 0; i < list.length / 2 - 1; i++) {
                if (i == 0) {
                    shape.moveTo(parseFloat(list[0]) / w, -parseFloat(list[1]) / h);
                } else {
                    shape.lineTo(parseFloat(list[i * 2]) / w, -parseFloat(list[i * 2 + 1]) / h);
                }
            }

            var geometry = new THREE.ShapeGeometry(shape);
            for (var i: number = 0; i < geometry.vertices.length; i++) {
                geometry.vertices[i].x = geometry.vertices[i].x * w;
                geometry.vertices[i].y = geometry.vertices[i].y * -h;
            }

            geometry.computeVertexNormals();

            var mesh: THREE.Mesh = new THREE.Mesh(geometry);
            mesh.position.set(0, 0, 0);

            var boxFace3DFront: BoxFace3D = new BoxFace3D();
            boxFace3DFront.add(mesh);
            boxFace3DFront.isBackFace = true;

            boxFace.faceFront = boxFace3DFront;

            var mesh2: THREE.Mesh = new THREE.Mesh(geometry);
            mesh2.position.set(0, 0, 0);

            var boxFace3DBack: BoxFace3D = new BoxFace3D();
            boxFace3DBack.add(mesh2);

            boxFace.faceBack = boxFace3DBack;

            for (var baselineMapKey of this.baselineMap.keys())
            {
                var boxBaseLine: BoxBaseline = this.baselineMap.get(baselineMapKey);

                var raycaster: THREE.Raycaster = new THREE.Raycaster(new THREE.Vector3(boxBaseLine.centerX, boxBaseLine.centerY, -100), new THREE.Vector3(0, 0, 1));
                var ob: THREE.Object3D[] = new Array<THREE.Object3D>();
                ob.push(mesh);
                var intersects: THREE.Intersection[] = raycaster.intersectObjects(ob);

                if (intersects.length > 0)
                {
                    boxFace.baselineKey = boxBaseLine.key;
                    boxFace.centerX = -boxBaseLine.centerX;
                    boxFace.centerY = -boxBaseLine.centerY;
                    
                    
                }
            }
        }

        //for (var baselineMapKey of this.baselineMap.keys()) {
        //    var boxBaseLine: BoxBaseline = this.baselineMap.get(baselineMapKey);
        //    console.log("boxBaseLine:" + boxBaseLine.key + ":"+ boxBaseLine.centerX+":"+ boxBaseLine.centerY);
        //}
    }

    private addBoxChildList(): void {
        
        var listBoxFace: Map<number, BoxFace> = new Map<number, BoxFace>();

        var count: number = 0;

        var checkList: Array<BoxFace> = new Array<BoxFace>();

        for (var key of this.faceMap.keys()) {

            var boxFace: BoxFace = this.faceMap.get(key);
            if (boxFace.isBaseline() == true)
            {
                checkList.push(boxFace);
            }else
            if (boxFace.hasCreaseline() == true)
            {
                listBoxFace.set(count++ , boxFace);
            }
        }

        if (checkList.length==0) {
            console.log("baseface null"); // 기준면없음
            return;
        }
        
        while (listBoxFace.size > 0 && checkList.length > 0)
        {
            var tempList: Array<BoxFace> = new Array<BoxFace>();
            
            for (var i: number = 0; i < checkList.length; i++) {

                for (var j: number = 0; j < checkList[i].creaselineIDList.length; j++) {
                    for (var listBoxFaceKey of listBoxFace.keys()) {
                        var listBoxFaceValue: BoxFace = listBoxFace.get(listBoxFaceKey);

                        if (listBoxFaceValue.creaselineIDList.indexOf(checkList[i].creaselineIDList[j]) > -1) {
                            listBoxFaceValue.setCreaeLineID( checkList[i].creaselineIDList[j]);
                            checkList[i].childList.push(listBoxFaceValue);
                            tempList.push(listBoxFaceValue);
                            listBoxFace.delete(listBoxFaceKey);
                        }
                    }
                }
            }
            checkList = tempList;
        }

        this.box3D = new Box3D();
        //this.box3D.fileName = this.fileName;


        for (var key of this.faceMap.keys()) {

            var boxFace: BoxFace = this.faceMap.get(key);
            if (boxFace.isBaseline() == true)
            {
                boxFace.addLink(this.box3D);
                boxFace.repos();
                
                this.box3D.add(boxFace.rootBone);
            }

            //console.log("face " + boxFace.creaselineIDList.length); // 기준면에 접는선없음
            //console.log("show:" + boxFace.showLineIDList()); // 기준면에 접는선없음
        }



        var textureFileName: string = this.fileName.replace(".svg", ".jpg");
        var packFile: PackFile = SceneManager.instance().selectPack.getFileImg(textureFileName);

        var frontMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
            map: packFile.fileData,
            bumpMap: packFile.fileData,
            shading: THREE.SmoothShading,
            side: THREE.FrontSide
        });

        var backMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
            map: null,
            bumpMap: null,
            shading: THREE.SmoothShading,
            side: THREE.BackSide
        });

        this.box3D.updateMaterial(frontMaterial, backMaterial);


        SceneManager.instance().addBox3D(this.box3D);
    }

    private getStartLine(): BoxLine {

        for (var key of this.lineMap.keys()) {
            
            if (this.lineMap.get(key).isCrease == true)
            {
                return this.lineMap.get(key);
            }
        }

        for (var key of this.lineMap.keys()) {

            if (this.lineMap.get(key).isMultilink == true) {
                return this.lineMap.get(key);
            }
        }

        for (var key of this.lineMap.keys()) {
            
            return this.lineMap.get(key);
        }

        return null;
    }

    public getRad(line1: BoxLine, line2: BoxLine): number {
        if (line1.p1key == line2.p1key) {
            return this.angle(line1.p2.x, line1.p2.y, line2.p1.x, line2.p1.y, line2.p2.x, line2.p2.y);
        } else if (line1.p1key == line2.p2key) {
            return this.angle(line1.p2.x, line1.p2.y, line2.p2.x, line2.p2.y, line2.p1.x, line2.p1.y);
        }
        else if (line1.p2key == line2.p1key) {

            return this.angle(line1.p1.x, line1.p1.y, line2.p1.x, line2.p1.y, line2.p2.x, line2.p2.y);
        } else if (line1.p2key == line2.p2key) {
            return this.angle(line1.p1.x, line1.p1.y, line2.p2.x, line2.p2.y, line2.p1.x, line2.p1.y);
        }

        return 0.0;
    }

    // 시계방향
    public angle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): number {

        var lega1, lega2, legb1, legb2;
        var norm, norm1, norm2, angle, prod, curl;

        lega1 = x1 - x2;
        legb1 = y1 - y2;
        lega2 = x3 - x2;
        legb2 = y3 - y2;

        norm1 = Math.sqrt(lega1 * lega1 + legb1 * legb1);//두 벡터의 크기 
        norm2 = Math.sqrt(lega2 * lega2 + legb2 * legb2);//두 벡터의 크기 
        norm = norm1 * norm2;
        prod = (lega1 * lega2) + (legb1 * legb2);//두 벡터의 내적 

        var r: number = Math.max(-1.0, Math.min(1.0, prod / norm));


        angle = Math.acos(r);

        curl = (lega1 * legb2) - (legb1 * lega2);//두 벡터의 외적 

        if (curl <= 0) {
            return angle / Math.PI * 180;
        }
        else {
            return (360 - angle / Math.PI * 180);
        }
    }

    private grid(str: string): string
    {
        return Math.round(parseFloat(str)).toString();
    }

}

