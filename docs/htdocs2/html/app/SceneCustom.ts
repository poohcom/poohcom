import { IScene } from './IScene.js';
import { SceneManager } from './SceneManager.js';
import { ModelManager } from './ModelManager.js';
// /import { Vector3 } from '../../src/Three.js';

export class SceneCustom implements IScene
{
	IsEnd:boolean = false;
	IsTurn:boolean = false;
    public Enter():void
    {
		ModelManager.Instance.timeNumber = 0;
		ModelManager.Instance.ClearButton();

		//ModelManager.Instance.InitCamera(-0.6745,0.260,-2.05);
		ModelManager.Instance.InitCamera(-35.66*0.8,50.9*0.8,78.33*0.8);

		ModelManager.Instance.modelGroup.rotation.x=0;
		ModelManager.Instance.modelGroup.rotation.y=0;
		ModelManager.Instance.modelGroup.rotation.z=0;

        ModelManager.Instance.removeDecals();

        ModelManager.Instance.nike_botton_1.visible = false;
        ModelManager.Instance.nike_botton_2.visible = false;

		ModelManager.Instance.shoelace_DOWN.visible = false;
        ModelManager.Instance.shoelace_UP.visible = false;
		
        ModelManager.Instance.nike_tag_1.visible = false;
        ModelManager.Instance.nike_tag_2.visible = false;
		ModelManager.Instance.nike_tag_3.visible = false;

		ModelManager.Instance.nike_logo.material.color.set(0xffffff);
		
		ModelManager.Instance.SetBackground(0);
	}
	
    public Update():void
    {
		var dt:number = ModelManager.Instance.clock.getDelta()
		
		var prevR:number = 0.5-Math.cos( ModelManager.Instance.timeNumber * Math.PI )*0.5;
		var prevRR:number = prevR*prevR;

		ModelManager.Instance.timeNumber += dt/4.0; // 6초 

		if ( ModelManager.Instance.timeNumber<1 && this.IsTurn ==true)
		{
			var r:number = 0.5-Math.cos( ModelManager.Instance.timeNumber * Math.PI )*0.5;
			var rr:number = r*r;
			var dr:number = rr - prevRR;
			ModelManager.Instance.UpdateRotateCustom(dr * Math.PI *2.0 );
		}else if (ModelManager.Instance.timeNumber >=1 && this.IsEnd==false)
		{
			ModelManager.Instance.modelGroup.rotation.x =0;
			ModelManager.Instance.modelGroup.rotation.y =0;
			ModelManager.Instance.modelGroup.rotation.z =0;
			ModelManager.Instance.GoFuncton('.step1');
			this.IsEnd = true;
			this.IsTurn =false;
		}
		//console.log("x:"+ModelManager.Instance.camera.position.x +":" +ModelManager.Instance.camera.position.y +":" +
		//ModelManager.Instance.camera.position.z);
    }

    public OnClick():void
    {
		if ( ModelManager.Instance.timeNumber >= 1.0)
		{
			ModelManager.Instance.shoot();
		}
    }

	public OnClickStart():void
    {
		//console.log("OnClickStart");
		this.IsTurn=true;
		ModelManager.Instance.timeNumber =0;
    }


    public Exit():void
    {
        ModelManager.Instance.ClearButton();
    }

	public CheckIntersection():void 
	{

		if (!ModelManager.Instance.mesh) return;

		ModelManager.Instance.raycaster.setFromCamera(ModelManager.Instance.pos_mouse, ModelManager.Instance.camera);

		var intersects = ModelManager.Instance.raycaster.intersectObjects([ModelManager.Instance.mesh] );

		if (intersects.length > 0) {

			var p = intersects[0].point;
			ModelManager.Instance.mouseHelper.position.copy(p);
			ModelManager.Instance.intersection.point.copy(p);

			var n = intersects[0].face.normal.clone();
			n.transformDirection(ModelManager.Instance.mesh.matrixWorld);
			n.multiplyScalar(10);
			n.add(intersects[0].point);

			ModelManager.Instance.intersection.normal.copy(intersects[0].face.normal);
			ModelManager.Instance.mouseHelper.lookAt(n);

			// var positions = this.line.geometry.attributes.position;
			// positions.setXYZ(0, p.x, p.y, p.z);
			// positions.setXYZ(1, n.x, n.y, n.z);
			// positions.needsUpdate = true;

			ModelManager.Instance.intersection.intersects = true;

		} else {
			ModelManager.Instance.intersection.intersects = false;
		}
	}
}

