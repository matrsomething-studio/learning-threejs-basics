// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Components(s)
import ThreeScene from './Scene';

// Class - ThreeCamera - https://threejs.org/docs/?q=PerspectiveCamera#api/en/cameras/PerspectiveCamera
export default class ThreeCamera extends ThreeScene {
    constructor(options) {
        super(options);
        this.options = options;
       
        // Define camera
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height);
        this.camera.position.set(0, 0, 4);
        this.camera.lookAt(0, 0, 0);

        // Define raycaster
        this.raycaster = new THREE.Raycaster();
        this.rayOrigin = new THREE.Vector3(-this.camera.position.z, 0, 0);
        this.rayDirection = new THREE.Vector3(10, 0, 0);
        this.rayDirection.normalize();

        this.resizeCamera();
    }

    resizeCamera() {
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    destroyCamera() {
        if (this.camera) {
            this.camera = undefined;
        }
    }
}
