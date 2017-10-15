
class AnimationManager {

    private static _instance: AnimationManager = null;

	

    public speed: number = 1.0;
    public endTime: number = 10;
    public lastTime: number = 0;
    public isPlay: boolean = true;


    public static instance(): AnimationManager {
        if (AnimationManager._instance === null) {
            AnimationManager._instance = new AnimationManager();
        }
        return AnimationManager._instance;
    }

    constructor() {
        if (AnimationManager._instance) {
            throw new Error("Error: Config instead of new.");
        }
        AnimationManager._instance = this;

        this.box3DList = new Array<Box3D>();
    }


    public update(): void {

        if (this.isPlay == false) {
            for (var i: number = 0; i < this.box3DList.length; i++) {
                this.box3DList[i].update(Menu.instance().viewParams.time);
            }

            SceneManager.instance().selectPack.updateTime(Menu.instance().viewParams.time);

            return;
        }

        if (this.lastTime == 0) {
            this.lastTime = Date.now();
        }

        var diffTime: number = Date.now() - this.lastTime;
        this.lastTime = Date.now();

        Menu.instance().viewParams.time += diffTime * this.speed * 0.001;
        Menu.instance().viewParams.time = Math.min(Menu.instance().viewParams.time, this.endTime);
        
        for (var i: number = 0; i < this.box3DList.length; i++)
        {
            this.box3DList[i].update(Menu.instance().viewParams.time);
        }

        SceneManager.instance().selectPack.updateTime(Menu.instance().viewParams.time);

    }


    private box3DList: Array<Box3D>;

    private aniList: Array<Animation>;
    public addAnimate(box3d: Box3D):void
    {
        this.box3DList.push(box3d);
        this.sortAnimation();
    }


    public sortAnimation(): void {

        var list:Array<Animation> = new Array<Animation>();

        // box회전
        for (var i: number = 0; i < this.box3DList.length; i++)
        {
            for (var j: number = 0; j < this.box3DList[i].childList.length; j++)
            {
                if (this.box3DList[i].childList[j].isAnimation() == true)
                {
                    list.push(this.box3DList[i].childList[j].getAnimation());
                }
            }
        }


        // pack
        SceneManager.instance().selectPack.getAnimation(list);

        //
        this.aniList = list.sort(
            (n1, n2) => {
                if (n1.index > n2.index) {
                    return 1;
                }

                if (n1.index < n2.index) {
                    return -1;
                }

                return 0;
            }
        );

        var index: number = 0;
        var startTime: number = 0;
        var durationTime: number = 1;
        for (var i: number = 0; i < this.aniList.length; i++) {

            if (this.aniList[i].index != index)
            {
                index = this.aniList[i].index;
                startTime += durationTime;
                this.aniList[i].setTime(startTime);

                durationTime = this.aniList[i].durationTime;

            } else {
                this.aniList[i].setTime(startTime);

                if (durationTime < this.aniList[i].durationTime)
                {
                    durationTime = this.aniList[i].durationTime;
                }
            }
        }

        Menu.instance().viewParams.time = 0.0;
        
        this.endTime = startTime + durationTime + 1;
        Menu.instance().timeGUI.max(this.endTime);
        this.lastTime = 0;
        

    }
}

