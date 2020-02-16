export class Ball {
    constructor(mesh) {
        this.time = -0.5;
        this.dur = 2;
        this.h = 10;
        this.count = 0;
        this.mesh = mesh;
        this.startX = mesh.position.x;
        this.startY = mesh.position.y;
        this.startZ = mesh.position.z;
    }
    reset() {
        this.time = -0.5;
        this.h = 10;
        this.count = 0;
    }
    update(milliSec) {
        this.time += milliSec / 1000.0;
        if (this.time > 0.5) {
            this.time = -0.5;
            this.h = this.h - 3.0;
            this.h = Math.max(0, this.h);
            this.count++;
            if (this.count == 3) {
                this.h = 0;
            }
        }
        var t = this.time * this.dur;
        t = t * t * this.h;
        this.mesh.position.set(this.startX, this.startY - t + this.h, this.startZ);
    }
}
