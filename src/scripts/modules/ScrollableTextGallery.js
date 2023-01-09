// Module(s)
import { gsap, Quad } from 'gsap';
import ThreeJSSketch from './ThreeJSSketch';

// Class - ScrollableTextGallery
export default class ScrollableTextGallery {
    constructor(options) {
        // Props
        this.options = options;
        this.sketch = new ThreeJSSketch({ dom: document.querySelector(this.options.sceneContainer) });

        // Methods
        this.bindEvents();
        this.animate();
    }

    animate() {
        // Update
        this.sketch.animate();
    }

    bindEvents() {
        console.log('Binding events');
    }

    resize() {
        this.sketch.handleResize();
    }
};