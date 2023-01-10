// Module(s)
import { gsap, Quad } from 'gsap';
import ThreeSketch from './ThreeSketchModule';

// Class - ThreeSceneModule
export default class ThreeSceneModule {
    constructor(options) {
        this.options = options;
        this.sketch = new ThreeSketch({ dom: document.querySelector(this.options.dom), orbitControls: this.options.orbitControls });

        this.bindEvents();
        this.animate();
    }

    animate() {
        this.sketch.animate();
    }

    bindEvents() {
        console.log('Binding ThreeSceneModule Events');
    }

    resize() {
        this.sketch.handleResize();
    }
}