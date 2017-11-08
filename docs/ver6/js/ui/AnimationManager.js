var AnimationManager = (function () {
    function AnimationManager() {
        this.speed = 1.0;
        this.endTime = 10;
        this.lastTime = 0;
        this.isPlay = true;
        if (AnimationManager._instance) {
            throw new Error("Error: Config instead of new.");
        }
        AnimationManager._instance = this;
        this.box3DList = new Array();
    }
    AnimationManager.instance = function () {
        if (AnimationManager._instance === null) {
            AnimationManager._instance = new AnimationManager();
        }
        return AnimationManager._instance;
    };
    AnimationManager.prototype.update = function () {
        if (this.isPlay == false) {
            for (var i = 0; i < this.box3DList.length; i++) {
                this.box3DList[i].update(Menu.instance().viewParams.time);
            }
            SceneManager.instance().selectPack.updateTime(Menu.instance().viewParams.time);
            return;
        }
        if (this.lastTime == 0) {
            this.lastTime = Date.now();
        }
        var diffTime = Date.now() - this.lastTime;
        this.lastTime = Date.now();
        Menu.instance().viewParams.time += diffTime * this.speed * 0.001;
        Menu.instance().viewParams.time = Math.min(Menu.instance().viewParams.time, this.endTime);
        for (var i = 0; i < this.box3DList.length; i++) {
            this.box3DList[i].update(Menu.instance().viewParams.time);
        }
        SceneManager.instance().selectPack.updateTime(Menu.instance().viewParams.time);
    };
    AnimationManager.prototype.addAnimate = function (box3d) {
        this.box3DList.push(box3d);
        this.sortAnimation();
    };
    AnimationManager.prototype.getMeshes = function (array) {
        for (var i = 0; i < this.box3DList.length; i++) {
            if (this.box3DList[i].root.visible == true) {
                this.box3DList[i].updateMatrixWorld(true);
                this.box3DList[i].getMeshes(array);
            }
        }
    };
    AnimationManager.prototype.sortAnimation = function () {
        var list = new Array();
        // box회전
        for (var i = 0; i < this.box3DList.length; i++) {
            for (var j = 0; j < this.box3DList[i].childList.length; j++) {
                if (this.box3DList[i].childList[j].isAnimation() == true) {
                    list.push(this.box3DList[i].childList[j].getAnimation());
                }
            }
        }
        // pack
        SceneManager.instance().selectPack.getAnimation(list);
        //
        this.aniList = list.sort(function (n1, n2) {
            if (n1.index > n2.index) {
                return 1;
            }
            if (n1.index < n2.index) {
                return -1;
            }
            return 0;
        });
        var index = 0;
        var startTime = 0;
        var durationTime = 1;
        for (var i = 0; i < this.aniList.length; i++) {
            if (this.aniList[i].index != index) {
                index = this.aniList[i].index;
                startTime += durationTime;
                this.aniList[i].setTime(startTime);
                durationTime = this.aniList[i].durationTime;
            }
            else {
                this.aniList[i].setTime(startTime);
                if (durationTime < this.aniList[i].durationTime) {
                    durationTime = this.aniList[i].durationTime;
                }
            }
        }
        Menu.instance().viewParams.time = 0.0;
        this.endTime = startTime + durationTime + 1;
        Menu.instance().timeGUI.max(this.endTime);
        this.lastTime = 0;
    };
    return AnimationManager;
}());
AnimationManager._instance = null;
//# sourceMappingURL=AnimationManager.js.map