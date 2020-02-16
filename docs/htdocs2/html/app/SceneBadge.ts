import { IScene } from './IScene.js';
import { SceneManager } from './SceneManager.js';
import { ModelManager } from './ModelManager.js';

export class SceneBadge implements IScene
{

    public Enter():void
    {
        ModelManager.Instance.timeNumber =0;
        ModelManager.Instance.ClearButton();
        //ModelManager.Instance.InitCamera(0,270,0);
        //ModelManager.Instance.InitCamera(-41.9,88.5,20.06);

        ModelManager.Instance.InitCamera(-93,21,30);

        ModelManager.Instance.nike_botton_1.visible = true;
        ModelManager.Instance.nike_botton_2.visible = true;

        ModelManager.Instance.effect_1.visible = true;
        ModelManager.Instance.effect_002.visible = true;

        ModelManager.Instance.nike_tag_1.visible = false;
        ModelManager.Instance.nike_tag_2.visible = false;
        ModelManager.Instance.nike_tag_3.visible = false;
        
        //
        
        

        //ModelManager.Instance.shoelace_DOWN.visible = false;
        //ModelManager.Instance.shoelace_UP.visible = false;

        // ui
        ModelManager.Instance.check1_button.visible =true;
        ModelManager.Instance.badge_a_button.visible =true;
        ModelManager.Instance.badge_b_button.visible =true;



        this.badgeType="badge_a_button";

        
        ModelManager.Instance.SetBackground(0);

        ModelManager.Instance.SetPos( ModelManager.Instance.check1_button ,ModelManager.Instance.badge_a_button );
          ModelManager.Instance.nike_botton_1.material = ModelManager.Instance.GetMaterialAlpha(ModelManager.Instance.nike_badge_A_diffuse, ModelManager.Instance.nike_badge_A_Normal);
          ModelManager.Instance.nike_botton_2.material = ModelManager.Instance.GetMaterialAlpha(ModelManager.Instance.nike_badge_B_diffuse, ModelManager.Instance.nike_badge_B_Normal);
            
    }

    i:number = 0;

    badgeType:string="badge_a_button";

    clickName:string="";

    button1Visible:boolean=true;
    button2Visible:boolean=true;


    nike_botton_1:string="badge_a_button";
    nike_botton_2:string="badge_b_button";

    //button3Visible:boolean=false;
    //button4Visible:boolean=false;
    
    public Update():void
    {
        var dt:number = ModelManager.Instance.clock.getDelta()
        ModelManager.Instance.timeNumber += dt;

        if (ModelManager.Instance.timeNumber<1)
		{
            //ModelManager.Instance.modelGroup.rotation.z = -ModelManager.Instance.timeNumber * Math.PI *2.0 ;
            
            ModelManager.Instance.UpdateRotateBadge( ModelManager.Instance.timeNumber );

            //ModelManager.Instance.modelGroup.rotation.y = -ModelManager.Instance.timeNumber * Math.PI *2.0 -270 * Math.PI/ 180  ;

		}else if  (ModelManager.Instance.timeNumber >=1)
		{
            //ModelManager.Instance.modelGroup.rotation.y =-270 * Math.PI/ 180;
            ModelManager.Instance.modelGroup.rotation.x = 0;
            ModelManager.Instance.modelGroup.rotation.y = 0;
            ModelManager.Instance.modelGroup.rotation.z = 0;
        }

        this.i++;
        if ( this.button1Visible==true )
        {
            ModelManager.Instance.nike_botton_1.material.opacity = 1;
        }else{
            ModelManager.Instance.nike_botton_1.material.opacity = 0;
            //ModelManager.Instance.nike_botton_1.material.opacity = Math.sin(this.i / 18)* 0.3 + 0.7 ;
        }

        if ( this.button2Visible==true )
        {
            ModelManager.Instance.nike_botton_2.material.opacity = 1;
        }else{
            ModelManager.Instance.nike_botton_2.material.opacity = 0;
            //ModelManager.Instance.nike_botton_2.material.opacity = Math.sin(this.i / 18)* 0.3 + 0.7 ;
        }

        ModelManager.Instance.effect_1.material.opacity = Math.sin(this.i / 18)* 0.3 + 0.7 ;
        ModelManager.Instance.effect_002.material.opacity = Math.sin(this.i / 18)* 0.3 + 0.7 ;

    }

    
    public OnClickStart():void
    {

    }

    public OnClick():void
    {
        console.log("click:"+this.clickName);
        if (this.clickName =="nike_botton_1")
        {

            
            if ( this.button1Visible == true && this.nike_botton_1 == this.badgeType )
            {
                this.button1Visible = false;
            }else{
                this.button1Visible = true;
            }

            this.nike_botton_1 = this.badgeType;

            //this.button1Visible = !this.button1Visible;

           // if (this.button1Visible==true)
            {
                if (this.badgeType=="badge_a_button")
                {
                    ModelManager.Instance.nike_botton_1.material = ModelManager.Instance.GetMaterialAlpha(ModelManager.Instance.nike_badge_A_diffuse, ModelManager.Instance.nike_badge_A_Normal);
                }else{
                    ModelManager.Instance.nike_botton_1.material = ModelManager.Instance.GetMaterialAlpha(ModelManager.Instance.nike_badge_B_diffuse, ModelManager.Instance.nike_badge_B_Normal);
                }
            }

            
        }

        if (this.clickName =="nike_botton_2")
        {

            if ( this.button2Visible == true && this.nike_botton_2 == this.badgeType )
            {
                this.button2Visible = false;
            }else{
                this.button2Visible = true;
            }

            this.nike_botton_2 = this.badgeType;


            //this.button2Visible = !this.button2Visible;

           // if (this.button2Visible==true)
            {
                if (this.badgeType=="badge_a_button")
                {
                    ModelManager.Instance.nike_botton_2.material = ModelManager.Instance.GetMaterialAlpha(ModelManager.Instance.nike_badge_A_diffuse, ModelManager.Instance.nike_badge_A_Normal);
                }else{
                    ModelManager.Instance.nike_botton_2.material = ModelManager.Instance.GetMaterialAlpha(ModelManager.Instance.nike_badge_B_diffuse, ModelManager.Instance.nike_badge_B_Normal);
                }
            }

        }


        if (this.clickName =="badge_a_button")
        {

            ModelManager.Instance.SetPos( ModelManager.Instance.check1_button ,ModelManager.Instance.badge_a_button );
            
            this.badgeType="badge_a_button";
            this.SetBadge();
        }

        if (this.clickName =="badge_b_button")
        {
            
            ModelManager.Instance.SetPos( ModelManager.Instance.check1_button ,ModelManager.Instance.badge_b_button );
            this.badgeType="badge_b_button";
            this.SetBadge();
        }
    }
    private SetBadge():void
    {
        if (this.button1Visible==false)
        {
            if (this.badgeType=="badge_a_button")
            {
                ModelManager.Instance.nike_botton_1.material = ModelManager.Instance.GetMaterialAlpha(ModelManager.Instance.nike_badge_A_diffuse, ModelManager.Instance.nike_badge_A_Normal);
            }else{
                ModelManager.Instance.nike_botton_1.material = ModelManager.Instance.GetMaterialAlpha(ModelManager.Instance.nike_badge_B_diffuse, ModelManager.Instance.nike_badge_B_Normal);
            }
        }

        if (this.button2Visible==false)
        {
            if (this.badgeType=="badge_a_button")
            {
                ModelManager.Instance.nike_botton_2.material = ModelManager.Instance.GetMaterialAlpha(ModelManager.Instance.nike_badge_A_diffuse, ModelManager.Instance.nike_badge_A_Normal);
            }else{
                ModelManager.Instance.nike_botton_2.material = ModelManager.Instance.GetMaterialAlpha(ModelManager.Instance.nike_badge_B_diffuse, ModelManager.Instance.nike_badge_B_Normal);
            }
        }

    }

    public Exit():void
    {
        ModelManager.Instance.effect_1.visible = false;
        ModelManager.Instance.effect_002.visible = false;


        ModelManager.Instance.ClearButton();
                
        if (this.button1Visible==false)
        {
            ModelManager.Instance.nike_botton_1.visible = false;
        }

        if (this.button2Visible==false)
        {
            ModelManager.Instance.nike_botton_2.visible = false;
        }

    }

    public CheckIntersection():void {

        if (!ModelManager.Instance.mesh) return;

        ModelManager.Instance.raycaster.setFromCamera(ModelManager.Instance.pos_mouse, ModelManager.Instance.camera2D);

        var intersects = ModelManager.Instance.raycaster.intersectObjects(
            [
                ModelManager.Instance.badge_a_button,
                ModelManager.Instance.badge_b_button
            ] );

		if (intersects.length > 0) {
        
            this.clickName = intersects[0].object.name;

			ModelManager.Instance.intersection.intersects = true;
            return;
		} else {
			
        }


		ModelManager.Instance.raycaster.setFromCamera(ModelManager.Instance.pos_mouse, ModelManager.Instance.camera);

		var intersects2 = ModelManager.Instance.raycaster.intersectObjects(
            [
                ModelManager.Instance.nike_botton_1,
                ModelManager.Instance.nike_botton_2
            ] );

		if (intersects2.length > 0) {

           // console.log("click1:"+intersects[0].object.name);

            this.clickName = intersects2[0].object.name;

			ModelManager.Instance.intersection.intersects = true;

		} else {
			ModelManager.Instance.intersection.intersects = false;
        }
        
    }
}







