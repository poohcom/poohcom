import { IScene } from './IScene.js';
import { ModelManager } from './ModelManager.js';
export class SceneBackgound implements IScene
{
    index:number = 1;
    clickName:string="";
    max_index:number = 9;

    public Enter():void
    {
        ModelManager.Instance.ClearButton();
        ModelManager.Instance.InitCamera(61,58,52.58);
        //ModelManager.Instance.InitCamera(0,0,0);

        ModelManager.Instance.bg_prev_button.visible =true;
        ModelManager.Instance.bg_next_button.visible =true;

        //ModelManager.Instance.redline.visible =true;
        

        ModelManager.Instance.SetBackground(1);
    }

    public Update():void
    {
        //console.log("a"+ModelManager.Instance.controls.getPolarAngle() +":"+ ModelManager.Instance.controls.getAzimuthalAngle() );


        //console.log("c"+ModelManager.Instance.camera.position.x +":"+ModelManager.Instance.camera.position.y +":" +ModelManager.Instance.camera.position.z);
    }

    public OnClickStart():void
    {

    }
    
    public OnClick():void
    {
        console.log(this.clickName);

        if (this.clickName=="bg_prev_button")
        {
            this.index--; // 1~7
            if ( this.index<1)
            {
                this.index=this.max_index;
            }

        }

        if (this.clickName=="bg_next_button")
        {
            this.index++;
            if ( this.index>this.max_index)
            {
                this.index=1;
            }
        }

        ModelManager.Instance.SetBackground(this.index);
        //ModelManager.Instance.SetBackground(1);

        // if (this.clickName=="bg_next_button")
        // {
        //     this.index++;
        //     if ( this.index>5)
        //     {
        //         this.index=0;
        //     }
        // }

        // switch(this.index)
        // {
        //     case 0:
        //     ModelManager.Instance.scene.background = ModelManager.Instance.bg4;
        //     break;
        //     case 1:
        //     ModelManager.Instance.scene.background = ModelManager.Instance.bg5;
        //     break;
        //     case 2:
        //     ModelManager.Instance.scene.background = ModelManager.Instance.bg6;
        //     break;
        //     case 3:
        //     ModelManager.Instance.scene.background = ModelManager.Instance.bg7;
        //     break;
        //     case 4:
        //     ModelManager.Instance.scene.background = ModelManager.Instance.bg8;
        //     break;
        // }

        
    }

    public Exit():void
    {
        ModelManager.Instance.ClearButton();
        //ModelManager.Instance.redline.visible =false;
    }

    public CheckIntersection():void {

        if (!ModelManager.Instance.mesh) return;

        ModelManager.Instance.raycaster.setFromCamera(ModelManager.Instance.pos_mouse, ModelManager.Instance.camera2D);

        var intersects = ModelManager.Instance.raycaster.intersectObjects(
            [
                ModelManager.Instance.bg_prev_button,
                ModelManager.Instance.bg_next_button
            ] );

		if (intersects.length > 0) {
        
            this.clickName = intersects[0].object.name;

			ModelManager.Instance.intersection.intersects = true;
            return;
		} else {
			ModelManager.Instance.intersection.intersects = false;
        }
    }
}







