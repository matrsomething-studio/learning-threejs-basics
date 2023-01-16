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

        this.bindEvents();
        this.resize();
        this.play();
    }

    resize() {
        this.resizeWindow();
        this.resizeCamera();
        this.resizeRenderer();
    }

    bindEvents() {
       // ThreeExperience event binding
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
        this.updateTime();
        this.updateMaterials();
        this.updateMeshes();
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
