import { ModelManager } from './ModelManager.js';
export class SceneLabel {
    constructor() {
        this.clickName = "";
    }
    Enter() {
        ModelManager.Instance.timeNumber = 0;
        ModelManager.Instance.ClearButton();
        ModelManager.Instance.InitCamera(-94 * 1.1, 19 * 1.1, 26 * 1.1);
        //ModelManager.Instance.InitCamera( -33.85,71.15,61.57);
        ModelManager.Instance.nike_tag_1.visible = false;
        ModelManager.Instance.nike_tag_2.visible = false;
        ModelManager.Instance.nike_tag_3.visible = false;
        ModelManager.Instance.check2_button.visible = true;
        //ModelManager.Instance.label_no_button.visible =false;
        ModelManager.Instance.label_a_button.visible = true;
        ModelManager.Instance.label_b_button.visible = true;
        ModelManager.Instance.label_c_button.visible = true;
        //ModelManager.Instance.scene.background = ModelManager.Instance.bgdefault;
        ModelManager.Instance.SetBackground(0);
        this.clickName = "label_c_button";
        this.OnClick();
    }
    Update() {
        var dt = ModelManager.Instance.clock.getDelta();
        ModelManager.Instance.timeNumber += dt;
        if (ModelManager.Instance.timeNumber < 1) {
            ModelManager.Instance.UpdateRotateLabel(ModelManager.Instance.timeNumber);
        }
        else if (ModelManager.Instance.timeNumber >= 1) {
            ModelManager.Instance.modelGroup.rotation.x = 0;
            ModelManager.Instance.modelGroup.rotation.y = 0;
            ModelManager.Instance.modelGroup.rotation.z = 0;
        }
    }
    OnClickStart() {
    }
    OnClick() {
        console.log(this.clickName);
        // if (this.clickName =="label_no_button")
        // {
        //     ModelManager.Instance.nike_tag_1.visible = false;
        //     ModelManager.Instance.nike_tag_2.visible = false;
        //     ModelManager.Instance.nike_tag_3.visible = false;
        //     ModelManager.Instance.SetPos( ModelManager.Instance.check2_button ,ModelManager.Instance.label_no_button );
        // }
        if (this.clickName == "label_a_button") {
            ModelManager.Instance.nike_tag_1.visible = true;
            ModelManager.Instance.nike_tag_2.visible = false;
            ModelManager.Instance.nike_tag_3.visible = false;
            //ModelManager.Instance.nike_logo.material.color = 0xFF0000;
            ModelManager.Instance.nike_logo.material.color.set(0xF1EA00);
            ModelManager.Instance.SetPos(ModelManager.Instance.check2_button, ModelManager.Instance.label_a_button);
        }
        if (this.clickName == "label_b_button") {
            ModelManager.Instance.nike_tag_1.visible = false;
            ModelManager.Instance.nike_tag_2.visible = true;
            ModelManager.Instance.nike_tag_3.visible = false;
            //ModelManager.Instance.nike_logo.material.color = 0x00FF00;
            ModelManager.Instance.nike_logo.material.color.set(0xbc2c26);
            ModelManager.Instance.SetPos(ModelManager.Instance.check2_button, ModelManager.Instance.label_b_button);
        }
        if (this.clickName == "label_c_button") {
            ModelManager.Instance.nike_tag_1.visible = false;
            ModelManager.Instance.nike_tag_2.visible = false;
            ModelManager.Instance.nike_tag_3.visible = true;
            ModelManager.Instance.nike_logo.material.color.set(0xffffff);
            ModelManager.Instance.SetPos(ModelManager.Instance.check2_button, ModelManager.Instance.label_c_button);
        }
    }
    Exit() {
        ModelManager.Instance.ClearButton();
    }
    CheckIntersection() {
        if (!ModelManager.Instance.mesh)
            return;
        ModelManager.Instance.raycaster.setFromCamera(ModelManager.Instance.pos_mouse, ModelManager.Instance.camera2D);
        var intersects = ModelManager.Instance.raycaster.intersectObjects([
            //ModelManager.Instance.label_no_button,
            ModelManager.Instance.label_a_button,
            ModelManager.Instance.label_b_button,
            ModelManager.Instance.label_c_button
        ]);
        if (intersects.length > 0) {
            this.clickName = intersects[0].object.name;
            ModelManager.Instance.intersection.intersects = true;
            return;
        }
        else {
            ModelManager.Instance.intersection.intersects = false;
        }
    }
}
