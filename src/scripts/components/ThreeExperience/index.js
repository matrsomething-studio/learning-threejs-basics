// Components(s)
import ThreeControls from './Controls';

// Class - ThreeRenderer - https://threejs.org/docs/#api/en/renderers/WebGLRenderer
export default class ThreeExperience extends ThreeControls {
    constructor(options, items) {
        super(options);
        this.options = options;
        this.playing = false;
        this.rafID = null;

        // Speed
        this.speed = {
            value: this.wheel.deltaY || 0,
            scale: .0004,
            friction: .9,
        };
        
        this.resize();
        this.play();
    }

    resize() {
        // this.setMeshes();
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
        this.speed.value *= this.speed.friction;

        this.updateTime();
        this.updateMeshes(this.speed.value);
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
