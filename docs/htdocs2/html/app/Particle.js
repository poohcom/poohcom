import * as THREE from '../../build/three.module.js';
import { TextureAnimator } from './TextureAnimator.js';
export class Particle {
    constructor(texture) {
        this.vs = 1.0;
        this.vx = 0.02;
        this.vy = -0.1;
        this.time = 0.0;
        this.time2 = 0.0;
        this.speed = 0.2;
        var tex = texture.clone();
        tex.needsUpdate = true;
        //this.animator = new TextureAnimator( tex, 16, 16, 200, Math.random()*70 + 30 ); // texture, #horiz, #vert, #total, duration.
        //this.animator = new TextureAnimator( tex, 8, 16, 70, Math.random()*70 ); // texture, #horiz, #vert, #total, duration.
        this.animator = new TextureAnimator(tex, 8, 16, 70, Math.random() * 1); // texture, #horiz, #vert, #total, duration.
        var spriteMaterial = new THREE.SpriteMaterial({ map: tex, color: 0xffffff, transparent: true });
        this.runner = new THREE.Sprite(spriteMaterial);
        this.runner.scale.set(2, 2, 2);
        this.runner.position.set(0, 0, 0);
        this.reset();
    }
    Init() {
        this.animator.tileDisplayDuration = Math.random() * 70 + 30;
        // start
        // v
        this.runner.position.x = (Math.random() - 0.5) * 200;
        this.runner.position.y = (Math.random() - 0.5) * 40;
        this.runner.position.z = (Math.random() - 0.5) * 10 + 20;
        this.time = Math.random() * 1000;
        this.time2 = Math.random() * 1000;
        this.vs = Math.random();
        this.vs = this.vs * this.vs * this.vs * this.vs + 0.2;
        this.vx = (0.02 * (Math.random() - 0.5)) * this.speed;
        this.vy = (-0.04 * Math.random() - 0.04) * this.speed;
    }
    reset() {
        this.animator.tileDisplayDuration = Math.random() * 70 + 30;
        // start
        // v
        this.runner.position.x = (Math.random() - 0.5) * 200;
        //this.runner.position.y = (Math.random()-0.5)*50 + 50;
        this.runner.position.y = 20;
        this.runner.position.z = (Math.random() - 0.5) * 10 + 20;
        this.time = Math.random() * 1000;
        this.time2 = Math.random() * 1000;
        this.vs = Math.random();
        this.vs = this.vs * this.vs * this.vs * this.vs + 0.2;
        this.runner.scale.set(this.vs, this.vs, this.vs);
        this.vx = (0.02 * (Math.random() - 0.5)) * this.speed;
        this.vy = (-0.04 * Math.random() - 0.04) * this.speed;
        //this.runner.position.x = Math.random()*100-50;
        //this.runner.position.y = Math.random()*100-50;
    }
    update(milliSec) {
        this.time += milliSec;
        this.time2 += milliSec;
        var s = Math.sin(this.time / 1000.0 * Math.PI * 2.0 * 10.0) * this.vs;
        this.runner.scale.set(s, s, s);
        this.runner.position.x += this.vx + Math.sin(this.time / 1000.0 * Math.PI * 2.0 * this.vs) * 0.1 * this.speed;
        //this.runner.position.x +=this.vx;
        this.runner.position.y += this.vy + Math.sin(this.time2 / 1000.0 * Math.PI * 2.0 * this.vs) * 0.03 * this.speed;
        this.animator.update(milliSec);
        if (this.runner.position.y < -20) {
            return false;
        }
        return true;
    }
}
