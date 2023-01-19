// Components(s)
import ThreeControls from './Controls';

// GSAP - https://greensock.com/docs/v3/GSAP/Timeline
import { gsap, Quad } from 'gsap';

// Class - ThreeRenderer - https://threejs.org/docs/#api/en/renderers/WebGLRenderer
export default class ThreeExperience extends ThreeControls {
    constructor(options, items) {
        super(options);
        this.options = options;
        this.tl = gsap.timeline();
        this.playing = false;
        this.rafID = null;
        this.speed = {
            value: this.wheel.deltaY || 0,
            scale: .00095,
            friction: 0.82,
        };
        this.pos = 0;
        this.resize();
        this.play();
    }

    resize() {
        this.resizeWindow();
        this.resizeCamera();
        this.resizeRenderer();
    }

    setSpeed() {
        this.speed.value += (this.wheel.deltaY * this.speed.scale);
    }

    lerp(a, b, t) {
        return ((1 - t) * a + t * b);
    }

    play() {
        if (!this.playing) {
            this.playing = true;
            this.update();
        }
    }

    stop() {
        if (this.playing) {
            this.playing = false;
            window.cancelAnimationFrame(this.rafID);
        }
    }

    update() {
        this.speed.value *= this.speed.friction;
        this.pos = this.lerp(this.pos, this.speed.value, .08);

        this.updateTime();
        this.updateMaterials();
        this.updateMeshes(this.pos);
        // this.updateLights();
        // this.updateControls();
        this.updateRenderer();
        this.rafID = requestAnimationFrame(this.update.bind(this));
    }

    destroy() {
        this.stop();
        this.destroyRenderer();
        this.destroyCamera();
        this.destroyScene();
    }
}
