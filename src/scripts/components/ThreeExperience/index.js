// Components(s)
import ThreeControls from './Controls';

// Class - ThreeRenderer - https://threejs.org/docs/#api/en/renderers/WebGLRenderer
export default class ThreeExperience extends ThreeControls {
    constructor(options, items) {
        super(options);
        this.options = options;
        this.playing = false;
        this.rafID = null;

        this.resize();
        this.play();
    }

    resize() {
        this.resizeWindow();
        this.resizeCamera();
        this.resizeRenderer();
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

    setCursor() {
        this.cursor.x = this.mouse.clientX / this.width - 0.5;
        this.cursor.y = this.mouse.clientY / this.height - 0.5;
    }

    setScroll() {
        this.scroll -= this.wheel.deltaY * 0.0085;
    }

    update() {
        this.updateBase();
        this.updateObjects();
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
