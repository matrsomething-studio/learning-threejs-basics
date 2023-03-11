// Control(s)
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Components(s)
import ThreeObjects from './Objects';
import ThreeDataGUI from './DataGUI';

// Class - ThreeControls - https://threejs.org/docs/?q=OrbitControls#examples/en/controls/OrbitControls
export default class ThreeControls extends ThreeObjects {
    constructor(options) {
        super(options);
        this.options = options;
        this.controls = null;

        this.createOrbit();
        this.setDataGUI();
    }

    setDataGUI() {
        if (this.options.showGUI) {
            this.gui = new ThreeDataGUI(this);
        }
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
            this.controls.enableZoom = false;
        }
    }

    // Event Handlers
    handleObjectsOnClick() {
        const tl = gsap.timeline({ repeat: 0 });
        const dy = (this.isMoved) ? 0 : 10;
        const da = (this.isMoved) ? 1 : 0;
        const time = 1.25;

        this.cards.group.children.forEach((card, indx) => {
            tl.to(card.position, {
                y: (indx % 2 === 0) ? dy : -dy,
                duration: time,
                ease: 'expo.inOut',
            }, `-=${time}`);

            tl.to(card.material.uniforms.opacity, { 
                value: da, 
                duration: .25 
            }, `-=${time}`);
        });

        this.isMoved = !this.isMoved;

        tl.play(0);
    }

    handleCardsOnClick() {
        const tl = gsap.timeline({ repeat: 0 });
        const dy = (this.isMoved) ? 0 : 15;
        const da = (this.isMoved) ? 1 : 0;
        const time = 0.55;
   
        this.raycaster.setFromCamera(this.mouse.pointer, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        
        if (intersects.length > 0) {
            let clickedObject = intersects[0].object;

            tl.to(clickedObject.position, {
                y: -dy,
                duration: time,
                ease: 'expo.inOut',
            }, `-=${time}`);

            tl.to(clickedObject.material.uniforms.opacity, { 
                value: da, 
                duration: .25 
            }, `-=${time}`);

            tl.play(0);
        }
    }
}
