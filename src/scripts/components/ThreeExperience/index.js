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
        // Friction is persiant force always applied
        this.speed.value *= this.speed.friction;

        this.updateTime();
        this.updateMaterials();
        this.updateMeshes(this.speed.value);
        this.updateLights();
        this.updateControls();
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
