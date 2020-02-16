import { ModelManager } from './ModelManager.js';
export class SceneMain {
    Enter() {
        ModelManager.Instance.timeNumber = 0;
        ModelManager.Instance.ClearButton();
        ModelManager.Instance.InitCamera(-35.66 * 0.8, 50.9 * 0.8, 78.33 * 0.8);
        ModelManager.Instance.modelGroup.rotation.x = 0;
        ModelManager.Instance.modelGroup.rotation.y = 0;
        ModelManager.Instance.modelGroup.rotation.z = 0;
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
    Update() {
    }
    OnClickStart() {
    }
    OnClick() {
    }
    Exit() {
    }
    CheckIntersection() {
    }
}
