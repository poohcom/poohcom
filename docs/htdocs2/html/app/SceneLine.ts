import { IScene } from './IScene.js';
import { ModelManager } from './ModelManager.js';

export class SceneLine implements IScene
{
    
    clickName:string="line_a_button";


    public Enter():void
    {
        ModelManager.Instance.timeNumber =0;
        ModelManager.Instance.ClearButton();
        ModelManager.Instance.InitCamera(-28,10,95);

        ModelManager.Instance.shoelace_DOWN.visible = false;
        ModelManager.Instance.shoelace_UP.visible = false;

        ModelManager.Instance.nike_tag_1.visible = false;
        ModelManager.Instance.nike_tag_2.visible = false;
		ModelManager.Instance.nike_tag_3.visible = false;


        //ModelManager.Instance.nike_botton_1.visible = false;
        //ModelManager.Instance.nike_botton_2.visible = false;

        // ui
        ModelManager.Instance.check2_button.visible =true;
        ModelManager.Instance.line_a_button.visible =true;
        ModelManager.Instance.line_b_button.visible =true;
        ModelManager.Instance.line_c_button.visible =true;
        ModelManager.Instance.line_d_button.visible =true;

        ModelManager.Instance.SetBackground(0);

        this. OnClick();
    }

    public Update():void
    {

        var dt:number = ModelManager.Instance.clock.getDelta()
        ModelManager.Instance.timeNumber += dt;

		if ( ModelManager.Instance.timeNumber<1)
		{
			//ModelManager.Instance.modelGroup.rotation.y = -ModelManager.Instance.timeNumber * Math.PI *2.0 ;
            
            ModelManager.Instance.UpdateRotateLine(ModelManager.Instance.timeNumber );

		}else if  (ModelManager.Instance.timeNumber >=1)
		{
			ModelManager.Instance.modelGroup.rotation.x =0;
			ModelManager.Instance.modelGroup.rotation.y =0;
			ModelManager.Instance.modelGroup.rotation.z =0;
			
		}
    }
    public OnClickStart():void
    {
    }

    public OnClick():void
    {
        // if ( ModelManager.Instance.timeNumber < 1.0)
		// {
        //     return;
        // }
            
        console.log(this.clickName);
        if (this.clickName=="line_a_button")
        {
            ModelManager.Instance.SetPos( ModelManager.Instance.check2_button ,ModelManager.Instance.line_a_button );
            // up   white
            ModelManager.Instance.shoelace_DOWN.visible = false;
            ModelManager.Instance.shoelace_UP.visible = true;

            ModelManager.Instance.shoelace_UP.material = ModelManager.Instance.GetMaterial(
                ModelManager.Instance.nike_shoelace_BC_WH,
                ModelManager.Instance.nike_shoelace_N
                );
        }

        if (this.clickName=="line_b_button")
        {
            
            ModelManager.Instance.SetPos( ModelManager.Instance.check2_button ,ModelManager.Instance.line_b_button );
            // up black
            ModelManager.Instance.shoelace_DOWN.visible = false;
            ModelManager.Instance.shoelace_UP.visible = true;

            ModelManager.Instance.shoelace_UP.material = ModelManager.Instance.GetMaterial(
                ModelManager.Instance.nike_shoelace_BC_BK,
                ModelManager.Instance.nike_shoelace_N
                );

        }

        if (this.clickName=="line_c_button")
        {
            ModelManager.Instance.SetPos( ModelManager.Instance.check2_button ,ModelManager.Instance.line_c_button );
                // down white
            ModelManager.Instance.shoelace_DOWN.visible = true;
            ModelManager.Instance.shoelace_UP.visible = false;
            ModelManager.Instance.shoelace_DOWN.material = ModelManager.Instance.GetMaterial(
                ModelManager.Instance.nike_shoelace_BC_WH,
                ModelManager.Instance.nike_shoelace_N
                );

        }

        if (this.clickName=="line_d_button")
        {
            
            ModelManager.Instance.SetPos( ModelManager.Instance.check2_button ,ModelManager.Instance.line_d_button );
            // down black
            ModelManager.Instance.shoelace_DOWN.visible = true;
            ModelManager.Instance.shoelace_UP.visible = false;

            ModelManager.Instance.shoelace_DOWN.material = ModelManager.Instance.GetMaterial(
                ModelManager.Instance.nike_shoelace_BC_BK,
                ModelManager.Instance.nike_shoelace_N
                );

        }
    }

    public Exit():void
    {
        ModelManager.Instance.ClearButton();
    }

    public CheckIntersection():void {

        if (!ModelManager.Instance.mesh) return;

        ModelManager.Instance.raycaster.setFromCamera(ModelManager.Instance.pos_mouse, ModelManager.Instance.camera2D);

        var intersects = ModelManager.Instance.raycaster.intersectObjects(
            [
                ModelManager.Instance.line_a_button,
                ModelManager.Instance.line_b_button,
                ModelManager.Instance.line_c_button,
                ModelManager.Instance.line_d_button
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



