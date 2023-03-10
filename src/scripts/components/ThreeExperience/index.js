// Components(s)
import ThreeControls from './Controls';

// Class - ThreeRenderer - https://threejs.org/docs/#api/en/renderers/WebGLRenderer
export default class ThreeExperience extends ThreeControls {
    constructor(options, args) {
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
        this.cursor.x = this.mouse.evt.clientX / this.width - 0.5;
        this.cursor.y = this.mouse.evt.clientY / this.height - 0.5;

        this.mouse.pointer.x = this.cursor.x;
        this.mouse.pointer.y = this.cursor.y;
    }

    setScroll() {
        this.wheel.isActive = true;
        this.scroll -= this.wheel.evt.deltaY * 0.0085;
        
        setTimeout(() => {
            this.wheel.isActive = false;
        }, 150);
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
