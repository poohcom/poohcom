/// <reference path="../../scripts/typings/three/index.d.ts" />
/// <reference path="../../scripts/typings/three/detector.d.ts" />
/// <reference path="../../scripts/typings/stats.js/index.d.ts" />
/// <reference path="../../scripts/typings/dat-gui/index.d.ts" />
// 박스 svg
var SVGBox = (function () {
    function SVGBox() {
        this.width = 0.0;
        this.height = 0.0;
    }
    SVGBox.prototype.AddLine = function (doc) {
        var lines = doc.getElementsByTagName("line");
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].getAttribute("id") == undefined)
                continue;
            var lineID = lines[i].getAttribute("id");
            // 기준선
            var isBaseline = (lineID.indexOf("BASELINE") == 0);
            if (isBaseline) {
                var baselineKey = lineID.split("-")[0];
                var baseline;
                if (this.baselineMap.has(baselineKey) == false) {
                    baseline = new BoxBaseline();
                    this.baselineMap.set(baselineKey, baseline);
                }
                else {
                    baseline = this.baselineMap.get(baselineKey);
                }
                baseline.set(lineID, parseFloat(lines[i].getAttribute("x1")), parseFloat(lines[i].getAttribute("y1")));
                continue;
            }
            var key1 = this.grid(lines[i].getAttribute("x1")) + "," + this.grid(lines[i].getAttribute("y1"));
            if (this.pointMap.has(key1) == false) {
                //var p: BoxPoint = new BoxPoint(parseFloat(lines[i].getAttribute("x1")) / this.width, parseFloat(lines[i].getAttribute("y1")) / this.height);
                var p = new BoxPoint(parseFloat(lines[i].getAttribute("x1")), parseFloat(lines[i].getAttribute("y1")));
                this.pointMap.set(key1, p);
                this.graphMap.set(key1, []);
            }
            var key2 = this.grid(lines[i].getAttribute("x2")) + "," + this.grid(lines[i].getAttribute("y2"));
            if (this.pointMap.has(key2) == false) {
                //var p: BoxPoint = new BoxPoint(parseFloat(lines[i].getAttribute("x2")) / this.width, parseFloat(lines[i].getAttribute("y2")) / this.height);
                var p = new BoxPoint(parseFloat(lines[i].getAttribute("x2")), parseFloat(lines[i].getAttribute("y2")));
                this.pointMap.set(key2, p);
                this.graphMap.set(key2, []);
            }
            if (key1 == key2)
                continue;
            var boxLine = new BoxLine(lines[i].getAttribute("id"), key1, key2, true);
            boxLine.p1 = this.pointMap.get(key1);
            boxLine.p2 = this.pointMap.get(key2);
            this.lineMap.set(boxLine.key, boxLine);
            var boxLine2 = new BoxLine(lines[i].getAttribute("id"), key2, key1, false);
            boxLine2.p1 = this.pointMap.get(key2);
            boxLine2.p2 = this.pointMap.get(key1);
            this.lineMap.set(boxLine2.key, boxLine2);
            var b1 = this.graphMap.get(key1);
            b1.push(boxLine);
            this.graphMap.set(key1, b1);
            var b2 = this.graphMap.get(key2);
            b2.push(boxLine2);
            this.graphMap.set(key2, b2);
        }
        for (var _i = 0, _a = this.graphMap.keys(); _i < _a.length; _i++) {
            var key = _a[_i];
            var bb = this.graphMap.get(key);
            if (bb.length <= 2)
                continue;
            for (var i = 0; i < bb.length; i++) {
                bb[i].isMultilink = true;
            }
            this.graphMap.set(key, bb);
        }
    };
    SVGBox.prototype.init = function (doc) {
        //var oSerializer: XMLSerializer = new XMLSerializer();
        //var sXML: string = oSerializer.serializeToString(doc);
        //console.log(sXML);
        this.width = parseFloat(doc.getElementsByTagName("svg")[0].getAttribute("width"));
        this.height = parseFloat(doc.getElementsByTagName("svg")[0].getAttribute("height"));
        this.pointMap = new Dictionary();
        this.lineMap = new Dictionary();
        this.graphMap = new Dictionary();
        this.faceMap = new Dictionary();
        this.baselineMap = new Dictionary();
        this.AddLine(doc);
        var count = 0;
        var startLine = null;
        while (startLine = this.getStartLine()) {
            var startKey = startLine.p1key;
            var nextKey = startLine.p1key;
            var face = new BoxFace();
            var circleDegree = 0;
            face.posXYList += startLine.p1key + ",";
            var startOriLine = startLine;
            while (startLine != null) {
                this.lineMap.delete(startLine.key);
                face.pushLineID(startLine.id);
                face.pushLine(startLine);
                nextKey = startLine.getNextKey(nextKey);
                face.posXYList += nextKey + ",";
                if (startKey == nextKey) {
                    circleDegree += 180 - this.getRad(startLine, startOriLine);
                    if (circleDegree >= 359) {
                        console.log("ERROR_CIRCLEDEGREE:" + face.showLineIDList());
                        console.log("circleDegree:" + circleDegree);
                        break;
                    }
                    console.log("circleDegree:" + circleDegree);
                    count++;
                    this.faceMap.set(count.toString(), face);
                    console.log("success:" + face.showLineIDList());
                    break;
                }
                var lineList = this.graphMap.get(nextKey);
                var oldLine = startLine;
                startLine = null;
                var maxRad = 0;
                for (var i = 0; i < lineList.length; i++) {
                    var checkLine = this.lineMap.get(lineList[i].key);
                    if (checkLine == undefined)
                        continue;
                    if (lineList.length > 1 &&
                        ((checkLine.p1key == oldLine.p1key && checkLine.p2key == oldLine.p2key)
                            ||
                                (checkLine.p1key == oldLine.p2key && checkLine.p2key == oldLine.p1key))) {
                        continue;
                    }
                    else {
                        var rad = this.getRad(oldLine, checkLine);
                        if (maxRad < rad) {
                            maxRad = rad;
                            startLine = checkLine;
                        }
                    }
                }
                if (startLine == null) {
                    console.log("ERROR:" + face.showLineIDList());
                }
                else {
                    circleDegree += 180 - maxRad;
                }
            }
        }
        this.addBox();
        this.addBoxChildList();
        console.log("pointMap.size:" + this.pointMap.size());
        console.log("faceMap.size:" + this.faceMap.size());
    };
    SVGBox.prototype.addBox = function () {
        var w = this.width;
        var h = this.height;
        var count = 1;
        for (var _i = 0, _a = this.faceMap.keys(); _i < _a.length; _i++) {
            var key = _a[_i];
            var boxFace = this.faceMap.get(key);
            var list = boxFace.posXYList.split(",");
            var shape = new THREE.Shape();
            for (var i = 0; i < list.length / 2 - 1; i++) {
                if (i == 0) {
                    shape.moveTo(parseFloat(list[0]) / w, -parseFloat(list[1]) / h);
                }
                else {
                    shape.lineTo(parseFloat(list[i * 2]) / w, -parseFloat(list[i * 2 + 1]) / h);
                }
            }
            var geometry = new THREE.ShapeGeometry(shape);
            for (var i = 0; i < geometry.vertices.length; i++) {
                geometry.vertices[i].x = geometry.vertices[i].x * w;
                geometry.vertices[i].y = geometry.vertices[i].y * -h;
            }
            geometry.computeVertexNormals();
            var mesh = new THREE.Mesh(geometry);
            mesh.position.set(0, 0, 0);
            var boxFace3DFront = new BoxFace3D();
            boxFace3DFront.add(mesh);
            /////////////////////////////////////
            boxFace3DFront.isBackFace = true;
            boxFace.faceFront = boxFace3DFront;
            var mesh2 = new THREE.Mesh(geometry);
            mesh2.position.set(0, 0, 0);
            var boxFace3DBack = new BoxFace3D();
            boxFace3DBack.add(mesh2);
            boxFace.faceBack = boxFace3DBack;
            for (var _b = 0, _c = this.baselineMap.keys(); _b < _c.length; _b++) {
                var baselineMapKey = _c[_b];
                var boxBaseLine = this.baselineMap.get(baselineMapKey);
                var raycaster = new THREE.Raycaster(new THREE.Vector3(boxBaseLine.centerX, boxBaseLine.centerY, -100), new THREE.Vector3(0, 0, 1));
                var ob = new Array();
                ob.push(mesh);
                var intersects = raycaster.intersectObjects(ob);
                //if (intersects.length > 0 || count==0)
                if (intersects.length > 0 || count == 0) {
                    count++;
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
    };
    SVGBox.prototype.addBoxChildList = function () {
        var listBoxFace = new Dictionary();
        var count = 0;
        var checkList = new Array();
        for (var _i = 0, _a = this.faceMap.keys(); _i < _a.length; _i++) {
            var key = _a[_i];
            var boxFace = this.faceMap.get(key);
            if (boxFace.isBaseline() == true) {
                checkList.push(boxFace);
            }
            else if (boxFace.hasCreaseline() == true) {
                listBoxFace.set(count++, boxFace);
            }
        }
        if (checkList.length == 0) {
            console.log("baseface null"); // 기준면없음
            return;
        }
        while (listBoxFace.size() > 0 && checkList.length > 0) {
            var tempList = new Array();
            for (var i = 0; i < checkList.length; i++) {
                for (var j = 0; j < checkList[i].creaselineIDList.length; j++) {
                    for (var _b = 0, _c = listBoxFace.keys(); _b < _c.length; _b++) {
                        var listBoxFaceKey = _c[_b];
                        var listBoxFaceValue = listBoxFace.get(listBoxFaceKey);
                        if (listBoxFaceValue.creaselineIDList.indexOf(checkList[i].creaselineIDList[j]) > -1) {
                            listBoxFaceValue.setCreaeLineID(checkList[i].creaselineIDList[j]);
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
        for (var _d = 0, _e = this.faceMap.keys(); _d < _e.length; _d++) {
            var key = _e[_d];
            var boxFace = this.faceMap.get(key);
            if (boxFace.isBaseline() == true) {
                boxFace.addLink(this.box3D);
                boxFace.repos();
                this.box3D.root.add(boxFace.rootBone);
            }
            //console.log("face " + boxFace.creaselineIDList.length); // 기준면에 접는선없음
            //console.log("show:" + boxFace.showLineIDList()); // 기준면에 접는선없음
        }
        var textureFileName = this.fileName.replace(".svg", ".jpg");
        var packFile = SceneManager.instance().selectPack.getFileImg(textureFileName);
        var frontMaterial = new THREE.MeshPhongMaterial({
            map: packFile.fileData,
            bumpMap: packFile.fileData,
            shading: THREE.SmoothShading,
            side: THREE.FrontSide
        });
        var backMaterial = new THREE.MeshPhongMaterial({
            color: 0x707070,
            shading: THREE.SmoothShading,
            side: THREE.BackSide
        });
        this.box3D.updateMaterial(frontMaterial, backMaterial);
        SceneManager.instance().addBox3D(this.box3D);
    };
    SVGBox.prototype.getStartLine = function () {
        for (var _i = 0, _a = this.lineMap.keys(); _i < _a.length; _i++) {
            var key = _a[_i];
            if (this.lineMap.get(key).isCrease == true) {
                return this.lineMap.get(key);
            }
        }
        for (var _b = 0, _c = this.lineMap.keys(); _b < _c.length; _b++) {
            var key = _c[_b];
            if (this.lineMap.get(key).isMultilink == true) {
                return this.lineMap.get(key);
            }
        }
        for (var _d = 0, _e = this.lineMap.keys(); _d < _e.length; _d++) {
            var key = _e[_d];
            return this.lineMap.get(key);
        }
        return null;
    };
    SVGBox.prototype.getRad = function (line1, line2) {
        if (line1.p1key == line2.p1key) {
            return this.angle(line1.p2.x, line1.p2.y, line2.p1.x, line2.p1.y, line2.p2.x, line2.p2.y);
        }
        else if (line1.p1key == line2.p2key) {
            return this.angle(line1.p2.x, line1.p2.y, line2.p2.x, line2.p2.y, line2.p1.x, line2.p1.y);
        }
        else if (line1.p2key == line2.p1key) {
            return this.angle(line1.p1.x, line1.p1.y, line2.p1.x, line2.p1.y, line2.p2.x, line2.p2.y);
        }
        else if (line1.p2key == line2.p2key) {
            return this.angle(line1.p1.x, line1.p1.y, line2.p2.x, line2.p2.y, line2.p1.x, line2.p1.y);
        }
        return 0.0;
    };
    // 시계방향
    SVGBox.prototype.angle = function (x1, y1, x2, y2, x3, y3) {
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
        if (curl <= 0) {
            return angle / Math.PI * 180;
        }
        else {
            return (360 - angle / Math.PI * 180);
        }
    };
    SVGBox.prototype.grid = function (str) {
        //return Math.round(parseFloat(str)).toString(); // prince 문제 생김 // 비정확도
        //return parseFloat(str).toString(); // 사과가 문제 생김 // 정확도
        return (Math.round(parseFloat(str) * 100) / 100).toString();
    };
    return SVGBox;
}());
//# sourceMappingURL=SVGBox.js.map