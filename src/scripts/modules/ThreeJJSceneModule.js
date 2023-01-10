// Module(s)
import { gsap, Quad } from 'gsap';
import ThreeJSSketch from './ThreeJSSketchModule';

// Class - ScrollableTextGallery
export default class ThreeJSSceneModule {
    constructor(options) {
        this.options = options;
        this.sketch = new ThreeJSSketch({ dom: document.querySelector(this.options.sceneContainer), orbitControls: this.options.orbitControls });

        this.bindEvents();
        this.animate();
    }

    animate() {
        this.sketch.animate();
    }

    bindEvents() {
        console.log('Binding 3JS Scene Module Events');
    }

    resize() {
        this.sketch.handleResize();
    }
}