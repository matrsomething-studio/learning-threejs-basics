// GSAP - https://greensock.com/docs/v3/GSAP/Timeline
import { gsap, Quad } from 'gsap';

// Module(s)
import ThreeSketch from './ThreeSketchModule';

// Class - ThreeSceneModule
export default class ThreeSceneModule {
    constructor(options) {
        this.options = options;
        this.sketch = new ThreeSketch(this.options);
        this.wheel = null;
        this.mouse = null;
        
        this.bindEvents();
    }

    setWheel(wheel){
        this.wheel = wheel;
    }

    setMouse(mouse){
        this.mouse = mouse;

        this.sketch.mouse.x = this.mouse.clientX;
        this.sketch.mouse.y = this.mouse.clientY ;

        this.sketch.mouse.cursor.x = this.mouse.clientX / this.sketch.width - 0.5;
        this.sketch.mouse.cursor.y = this.mouse.clientY / this.sketch.height - 0.5;
    }

    animate() {
        // this.sketch.camera.position.x = -this.sketch.mouse.cursor.x;
        // this.sketch.camera.position.y = -this.sketch.mouse.cursor.y;
        
        this.sketch.animate();
    }

    resize() {
        this.sketch.resize();
    }

    bindEvents() {
        console.log('Binding ThreeSceneModule Events');
    }
}