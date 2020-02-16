import { SceneMain } from './SceneMain.js';
import { SceneCustom } from './SceneCustom.js';
import { SceneBackgound } from './SceneBackgound.js';
import { SceneBadge } from './SceneBadge.js';
import { SceneLabel } from './SceneLabel.js';
import { SceneLine } from './SceneLine.js';
import { ModelManager } from './ModelManager.js';
import { SceneTextInput } from './SceneTextInput.js';
export var VIEW;
(function (VIEW) {
    VIEW[VIEW["MAIN_VIEW"] = 0] = "MAIN_VIEW";
    VIEW[VIEW["CUSTOM_VIEW"] = 1] = "CUSTOM_VIEW";
    VIEW[VIEW["BADGE_VIEW"] = 2] = "BADGE_VIEW";
    VIEW[VIEW["LABEL_VIEW"] = 3] = "LABEL_VIEW";
    VIEW[VIEW["LINE_VIEW"] = 4] = "LINE_VIEW";
    VIEW[VIEW["BACKGROUND_VIEW"] = 5] = "BACKGROUND_VIEW";
    VIEW[VIEW["TEXTINPUT_VIEW"] = 6] = "TEXTINPUT_VIEW";
})(VIEW || (VIEW = {}));
export class SceneManager {
    constructor() {
        this.view = VIEW.CUSTOM_VIEW;
        // constructor() {
        // 	ModelManager.Instance.Init();
        // }
        this.NowScene = new SceneCustom();
    }
    static get Instance() {
        if (!SceneManager._Instance) {
            SceneManager._Instance = new SceneManager();
        }
        return SceneManager._Instance;
    }
    SetView(view) {
        this.view = view;
        this.NowScene.Exit();
        switch (view) {
            case VIEW.MAIN_VIEW:
                this.NowScene = new SceneMain();
                break;
            case VIEW.CUSTOM_VIEW: // 
                this.NowScene = new SceneCustom();
                break;
            case VIEW.BADGE_VIEW: // 배지
                this.NowScene = new SceneBadge();
                break;
            case VIEW.LABEL_VIEW: // 
                this.NowScene = new SceneLabel();
                break;
            case VIEW.LINE_VIEW: // 
                this.NowScene = new SceneLine();
                break;
            case VIEW.BACKGROUND_VIEW: // 뱃그라운드
                this.NowScene = new SceneBackgound();
                break;
            case VIEW.TEXTINPUT_VIEW: // 
                this.NowScene = new SceneTextInput();
                break;
        }
        this.NowScene.Enter();
    }
    Init() {
        //console.log("init");
        ModelManager.Instance.Init();
    }
    OnClick() {
        this.NowScene.OnClick();
    }
    OnClickStart() {
        this.NowScene.OnClickStart();
    }
    Update() {
        this.NowScene.Update();
    }
    CheckIntersection() {
        this.NowScene.CheckIntersection();
    }
}
