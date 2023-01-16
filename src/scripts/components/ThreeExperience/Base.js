// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Class - ThreeBase
export default class ThreeBase {
    constructor(options) {
        this.options = options;
        this.container = document.querySelector(this.options.domSelector);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.imageAspect = this.options.imageAspect || 1080 / 1920;
        this.clock = new THREE.Clock();
        this.time = { start: Date.now(), previous: 0, elapsed: 0, delta: 0 };
        this.mouse = null;
        this.cursor = { x: 0, y: 0 };
        this.wheel = 0;

        this.updateTime();
    }

    resizeWindow() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    updateTime() {
        if (this.time) {
            this.time.elapsed = this.clock.getElapsedTime();
            this.time.delta = this.time.elapsed - this.time.previous;
            this.time.previous = this.time.elapsed;
        }
    }
}
