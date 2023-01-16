// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Components(s)
import ThreeBase from './Base';

// Class - ThreeScene - https://threejs.org/docs/?q=Scene#api/en/scenes/Scene
export default class ThreeScene extends ThreeBase {
    constructor(options) {
        super(options);
        this.options = options;
        this.scene = new THREE.Scene();
        this.scene.background = null;
        this.scene.backgroundBlurriness = 0;
        this.scene.backgroundIntensity = 1;
        this.scene.environment = null;
        this.scene.fog = new THREE.Fog(0x191919, 1.0, 10.0);
        this.scene.overrideMaterial = null;
    }

    destroyScene() {
        if (this.scene) {
            this.scene = undefined;
        }
    }
}
