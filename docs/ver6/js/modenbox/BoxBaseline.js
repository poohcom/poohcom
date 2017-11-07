// 
var MoveType;
(function (MoveType) {
    MoveType[MoveType["UP"] = 0] = "UP";
    MoveType[MoveType["DOWN"] = 1] = "DOWN";
    MoveType[MoveType["SIDE"] = 2] = "SIDE";
    MoveType[MoveType["NONE"] = 3] = "NONE";
})(MoveType || (MoveType = {}));
;
var BoxBaseline = (function () {
    function BoxBaseline() {
        //public move: string;
        this.centerX = 0;
        this.centerY = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.rx = 0;
        this.ry = 0;
        this.rz = 0;
        this.h = 0;
        this.lastRotateIndex = 0;
    }
    BoxBaseline.prototype.set = function (baseline, centerX, centerY) {
        this.centerX = centerX;
        this.centerY = centerY;
        var params = baseline.split("-");
        this.key = params[0];
        switch (params[1]) {
            case "X":
                this.x = parseFloat(params[2]); // 이동
                this.rx = parseFloat(params[3]); // 회전
                break;
            case "Y":
                this.y = parseFloat(params[2]);
                this.ry = parseFloat(params[3]);
                break;
            case "Z":
                this.z = parseFloat(params[2]);
                this.rz = parseFloat(params[3]);
                break;
            case "NX":
                this.x = -parseFloat(params[2]);
                this.rx = parseFloat(params[3]);
                break;
            case "NY":
                this.y = -parseFloat(params[2]);
                this.ry = parseFloat(params[3]);
                break;
            case "NZ":
                this.z = -parseFloat(params[2]);
                this.rz = parseFloat(params[3]);
                break;
        }
        if (params.length < 5)
            return;
        this.h = parseFloat(params[5]);
        this.lastRotateIndex = parseFloat(params[6]);
        switch (params[4]) {
            case "U":
                this.moveType = MoveType.UP;
                break;
            case "D":
                this.moveType = MoveType.DOWN;
                break;
            case "S":
                this.moveType = MoveType.SIDE;
                break;
            case "N":
                this.moveType = MoveType.NONE;
                break;
            case "VU":
                this.moveType = MoveType.UP;
                break;
            case "VD":
                this.moveType = MoveType.DOWN;
                break;
            case "VS":
                this.moveType = MoveType.SIDE;
                break;
            case "VN":
                this.moveType = MoveType.NONE;
                break;
        }
    };
    return BoxBaseline;
}());
//=> 각 도면 기준되는 면에 기준선을 둠으로써 회전하는 방향과 각도,
//    전체 기준면과 각 도면의 기준면이 x, y, z축방향으로 얼만큼 떨어져있는지
//선이름으로 표시할 예정
//    - 기본규칙
//BASEL INE1- X - A - B=> X축 기준 - A만큼 이동 - B도 회전
//BASEL INE1- Y - A - B=> Y축 기준 - A만큼 이동 - B도 회전< 1 SET ＞
//BASEL INE1- Z - A - B - M - H - R
//=> A: Z축 기준 - 기준점을 기준으로 Z방향으로 A 만큼 이동
//    => B : Z 축 기준으로 B도 회전
//        => M : 이동 방법(U or D or S or N)(참고로 이동거리는 기준선들의 A값으로 확인)
//이동방법은 U 또는 D 또는 S로 표기함. (N은 이동하지 않음)
//=>　H: 상자의 높이
//    => R : 현도면의 접는 순서 중 R번호의 순서까지 접은 후,
//        다음 도면이 접히고 회전하고 이동함.
//1번 도면이 접히는 중 R번호까지 접고 다음도면이 회전하고 이동을 시작함.
//U나 D방법으로 이동시 위나 아래로 움직이는 높이는 상자의 높이를 참고하여 이동
//ex) BASEL INE1- Z - 45 - 50 - U - 150 - 6
//A B M H R
//Z축을 기준으로 45도 회전을 하고 1번도면의 기준점에서 50이동
//현도면은 위로 이동하고 도면의 높이는 150임.
//현도면을 접을　때, 6번까지 접은 후에 다음도 면을 접고, 회전 및 이동함.
//- 적용예제
//BASEL INE1- X - 0 - 0
//BASEL INE1- Y - 0 - 180
//BASEL INE1- Z - 0 - 0 - V - 0 - 0
//=>　보통 베이스가 되는 면의 정보
//    => 디자인된 면이 바닥을 향해야하기 때문에
//Y축 기준으로 180도 회전하거나 X축 기준으로 180도 회전
//이동을 하지 않기 때문에 M자리에는 N으로 입력.
//BASEL INE2- X - 5 - 90=> 2번면의 최종기준점 x좌표는 베이스면의 기준점의 x좌표에서
//5mm이동한 위치 X축을 기준으로 90도 회전
//이때 회전은 화면상 도면의 아래부분이 위로 가는 방향으로...
//※ 그렇기 때문에 90도 회전하고 이동시 위로 올라간 후에
//베이스면의 기준점x좌표에서 + 5지점까지 이동하도록 지정
//BASEL INE2- NX - 5 - 270=> X축을 기준으로 270도 회전하되 x좌표는
//베이스면의 x좌표에서 - 5되는 부분
//BASEL INE2- Y - 10 - 45=> Y축을 기준으로 시계방향으로 45도 회전하고
//베이스면의 기준점에서 y축으로 10이동한 지점이 최종 Y좌표
//BASEL INE2- NY - 10 - 45=> Y축을 기준으로 시계방향으로 45도 회전하고
//베이스면의 기준점에서 y축으로 - 10이동한 지점이 최종 Y좌표
//BASEL INE2- Z - 10 - 0 - S - 120 - 290
//=> Z축 기준으로는 회전을 할 경우가 없을 듯 함.
//도면의 최종 z좌표만 확인
//기준점에서 Z방향으로 10이동된 위치가 이동 후 최종 위치
//M자리가 S이기 때문에 옆으로 이동
//2번 도면의 높이는 120이고
//2번 도면이 접힐 때, 7번순서까지 접히고 다음 도면이
//접히기 시작.
//(2번 도면이 다 접히고 다음도면이 접혀야 한다면
//2번 도면의 접히는 순서 마지막 번호를 입력)
// 면 
//# sourceMappingURL=BoxBaseline.js.map