// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Components(s)
import ThreeCamera from './Camera';

// Class - ThreeRenderer - https://threejs.org/docs/#api/en/renderers/WebGLRenderer
export default class ThreeRenderer extends ThreeCamera  {
    constructor(options) {
        super(options);
        this.options = options;
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.sortObjects = false;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.container.appendChild(this.renderer.domElement);
    }

    resizeRenderer() {
        this.renderer.setSize(this.width, this.height);
    }

    destory() {
        this.renderer.dispose();
    }
}