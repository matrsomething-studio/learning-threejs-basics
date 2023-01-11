// GSAP - https://greensock.com/docs/v3/GSAP/Timeline
import { gsap, Quad } from 'gsap';

// Module(s)
import ThreeSketch from './ThreeSketchModule';

// Class - ThreeSceneModule
export default class ThreeSceneModule {
    constructor(options) {
        this.options = options;
        this.wheel = null;
        this.mouse = null;
        this.sketch = new ThreeSketch({ dom: document.querySelector(this.options.dom), orbitControls: this.options.orbitControls });

        this.bindEvents();
    }

    setWheel(wheel){
        this.wheel = wheel;
    }

    setMouse(mouse){
        this.mouse = mouse;
        this.sketch.mouse.x = this.mouse.x;
        this.sketch.mouse.y = this.mouse.y;
    }

    animate() {
        this.sketch.animate();
    }

    resize() {
        this.sketch.resize();
    }

    bindEvents() {
        console.log('Binding ThreeSceneModule Events');
    }
}