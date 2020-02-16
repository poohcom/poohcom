import * as THREE from '../../build/three.module.js';

import { IScene } from './IScene.js';
import { SceneMain } from './SceneMain.js';
import { SceneCustom } from './SceneCustom.js';
import { SceneBackgound } from './SceneBackgound.js';
import { SceneBadge } from './SceneBadge.js';
import { SceneLabel } from './SceneLabel.js';
import { SceneLine } from './SceneLine.js';
import { ModelManager } from './ModelManager.js';
import { SceneTextInput } from './SceneTextInput.js';

export enum VIEW
{
    MAIN_VIEW = 0,
	CUSTOM_VIEW = 1,
	BADGE_VIEW = 2,
	LABEL_VIEW = 3,
	LINE_VIEW = 4,
    BACKGROUND_VIEW = 5,
    TEXTINPUT_VIEW = 6
}

export class SceneManager {

    private static _Instance: SceneManager;
    
    public static get Instance(): SceneManager {
		if (!SceneManager._Instance) 
		{
        	SceneManager._Instance = new SceneManager();
		}
		
        return SceneManager._Instance;
    }
	
	view:VIEW = VIEW.CUSTOM_VIEW;
    public SetView(view:VIEW):void
    {
		
		this.view = view;

		this.NowScene.Exit();
		switch(view)
		{
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

	// constructor() {
	// 	ModelManager.Instance.Init();
	// }

	private NowScene:IScene=new SceneCustom();

	public Init():void
	{
		//console.log("init");
		ModelManager.Instance.Init();
	}

	public OnClick():void
	{
		this.NowScene.OnClick();
	}

	public OnClickStart():void
	{
		this.NowScene.OnClickStart();
	}

	public Update():void
	{
		this.NowScene.Update();		
	}
	 public CheckIntersection():void {
		this.NowScene.CheckIntersection();		
	 }



}