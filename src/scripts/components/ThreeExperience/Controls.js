// Control(s)
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Components(s)
import ThreeObjects from './Objects';

// Class - ThreeControls - https://threejs.org/docs/?q=OrbitControls#examples/en/controls/OrbitControls
export default class ThreeControls extends ThreeObjects {
    constructor(options) {
        super(options);
        this.options = options;
        this.controls = null;

        this.createOrbit();
    }

    updateControls() {
        if (this.controls) {
            this.controls.update();
        }
    }

    createOrbit() {
        if (this.options.orbitControls) {
            this.controls = new OrbitControls(
                this.camera,
                this.renderer.domElement
            );
            this.controls.enableDamping = true;
        }
    }
}
