// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Class - ThreeBase
export default class ThreeBase {
    constructor(options) {
        this.options = options;
        this.container = document.querySelector(this.options.domSelector);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.clock = new THREE.Clock();
        this.time = { start: Date.now(), previous: 0, elapsed: 0, delta: 0 };
        
        // Mouse
        this.mouse = {
            pointer:  new THREE.Vector2(),
            evt: null,
            isDown: false
        };

        // Wheel
        this.wheel = {
            evt: null,
            isActive: false
        };
        
        // Scroll
        this.scroll = 0.0;

        // Speed
        this.speed = {
            friction: 0.9,
            scale: 0.0004,
            value: this.wheel.deltaY || 0.0            
        };

        this.updateBase();
    }

    setSpeed() {
        this.speed.value += this.wheel.evt.deltaY * this.speed.scale;
    }

    setCursor() {
        this.mouse.pointer.x = this.mouse.evt.clientX / this.width * 2 - 1;
        this.mouse.pointer.y = -(this.mouse.evt.clientY / this.height) * 2 + 1;
    }

    setScroll() {
        this.wheel.isActive = true;
        this.scroll -= this.wheel.evt.deltaY * 0.0085;
        
        setTimeout(() => {
            this.wheel.isActive = false;
        }, 150);
    }

    resizeWindow() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    updateBase() {
        this.speed.value *= this.speed.friction;
        this.time.elapsed = this.clock.getElapsedTime();
        this.time.delta = this.time.elapsed - this.time.previous;
        this.time.previous = this.time.elapsed;
    }
}
