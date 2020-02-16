import { IScene } from './IScene.js';
import { ModelManager } from './ModelManager.js';

export class SceneTextInput implements IScene
{
    public Enter():void
    {
        ModelManager.Instance.ClearButton();
        //ModelManager.Instance.redline.visible =true;
        //ModelManager.Instance.InitCamera(61,58,52.58);
    } 

    public Update():void
    {

    }
    public OnClickStart():void
    {
    }

    public OnClick():void
    {
        //this.SaveImageCrop(0,0,window.innerWidth,window.innerWidth);
        //this.SaveImage();
        //this.redline.scale.set(  w / 752 * 507 , h / 1116 * 596, 1 );

        //this.SaveImageCrop(window.innerWidth/4*window.devicePixelRatio,window.innerHeight/2*window.devicePixelRatio-window.innerWidth/4*window.devicePixelRatio,window.innerWidth/2*window.devicePixelRatio,window.innerWidth/2*window.devicePixelRatio);
        //var top:number = window.innerHeight/2*window.devicePixelRatio - window.innerHeight*window.devicePixelRatio / 1116 * 596 / 2 ;

        //var top:number = window.innerHeight/2*window.devicePixelRatio - window.innerHeight*window.devicePixelRatio / 1116 * 496 / 2 ;
        
        //var h:number = window.innerHeight*window.devicePixelRatio / 1116 * 596;

        // var left:number = window.innerWidth*window.devicePixelRatio / 752 * 124;

        // var w:number = window.innerWidth*window.devicePixelRatio / 752 * 507;
        // var h:number = w / 920 * 1080;
        // var top:number = window.innerHeight/2*window.devicePixelRatio - h/2;


        var left:number = window.innerWidth*window.devicePixelRatio / 342 * 25;
        var w:number = window.innerWidth*window.devicePixelRatio / 342 * 292;
        var h:number = w / 920 * 1080;
        var top:number = window.innerHeight/2*window.devicePixelRatio - h/2 *0.9 ;

        // 920x1080
        


        this.SaveImageCrop(left,
            top,
            w,
            h);
        
    }

    public SaveImageCrop(left:number,top:number,width:number,height:number) :void
    {
        let destCanvas:any = document.createElement('canvas');
        destCanvas.width = width;
        destCanvas.height = height;
        destCanvas.getContext("2d").drawImage(
            ModelManager.Instance.renderer.domElement,
            left,top,width,height,  // source rect with content to crop
            0,0,width,height);      // newCanvas, same size as source rect

            var strMime = "image/jpeg";
        var img = destCanvas.toDataURL(strMime);
        this.saveFile(img.replace(strMime,  "image/octet-stream"), "nike.jpg");
    }

    public SaveImage():void
    {
        var imgData, imgNode;
        try {
            var strMime = "image/jpeg";
            imgData = ModelManager.Instance.renderer.domElement.toDataURL(strMime);
            this.saveFile(imgData.replace(strMime,  "image/octet-stream"), "nike.jpg");
    
        } catch (e) {
            console.log(e);
            return;
        }
    }

    private saveFile(strData:string, filename:string):void{
        var link = document.createElement('a');
        if (typeof link.download === 'string') {
            document.body.appendChild(link); //Firefox requires the link to be in the body
            link.download = filename;
            link.href = strData;
            link.click();
            document.body.removeChild(link); //remove the link when done
        } else {
            //location.replace(uri);
        }
    }

    public Exit():void
    {
        //ModelManager.Instance.redline.visible =false;
        ModelManager.Instance.ClearButton();
    }

    public CheckIntersection():void {
    }

}







