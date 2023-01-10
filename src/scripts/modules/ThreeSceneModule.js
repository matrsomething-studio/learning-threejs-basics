// Module(s)
import ThreeSketch from './ThreeSketchModule';
import { gsap, Quad } from 'gsap';

// Class - ThreeSceneModule
export default class ThreeSceneModule {
    constructor(options) {
        this.options = options;
        this.sketch = new ThreeSketch({ dom: document.querySelector(this.options.dom), orbitControls: this.options.orbitControls });

        this.bindEvents();
        this.animate();
    }

    setMouse(x, y){
        this.sketch.mouse.x = x;
        this.sketch.mouse.y = y;
    }

    animate() {
        this.sketch.animate();
    }

    resize() {
        this.sketch.handleResize();
    }

    bindEvents() {
        console.log('Binding ThreeSceneModule Events');
    }
}