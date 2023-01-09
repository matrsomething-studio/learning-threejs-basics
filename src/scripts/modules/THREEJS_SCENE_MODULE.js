// Module(s)
import { gsap, Quad } from 'gsap';
import ThreeJSSketch from './ThreeJSSketch';

// Class - ScrollableTextGallery
export default class THREEJS_SCENE_MODULE {
    constructor(options) {
        // Props
        this.options = options;
        this.sketch = new ThreeJSSketch({ dom: document.querySelector(this.options.sceneContainer), orbitControls: this.options.orbitControls });

        // Methods
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
};