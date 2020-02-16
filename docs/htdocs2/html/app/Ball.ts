import * as THREE from '../../build/three.module.js';

export class Ball
{
    startX:number;
    startY:number;
    startZ:number;
    mesh:THREE.Mesh;

    time:number = -0.5 ;
    dur:number =2;
    h:number = 10;
    count:number = 0;

    constructor(mesh:THREE.Mesh) 
    {
        this.mesh = mesh;
        this.startX = mesh.position.x;
        this.startY = mesh.position.y;
        this.startZ = mesh.position.z;
    }

    public reset():void
    {
        this.time = -0.5;
        this.h=10;
        this.count=0;
    }

    public update(milliSec:number):void
    {
        this.time+=milliSec/1000.0;
        if ( this.time > 0.5 )
        {
            this.time = -0.5;
            this.h = this.h -3.0;
            this.h = Math.max(0,this.h);
            this.count++;
            if ( this.count==3)
            {
                this.h=0;
            }
       }

        var t = this.time * this.dur;
        t = t*t * this.h;

        this.mesh.position.set(this.startX,this.startY-t+this.h,this.startZ);
    }

}
