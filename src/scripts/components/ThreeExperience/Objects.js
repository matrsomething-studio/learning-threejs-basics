// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Components(s)
import ThreeRenderer from './Renderer';

import { lerp } from '../../utils/math';

// Class - ThreeObjects - https://threejs.org/docs/?q=Scene#api/en/scenes/Scene
export default class ThreeObjects extends ThreeRenderer {
    constructor(options) {
        super(options);
        this.options = options;
        this.meshes = [];
        this.meshGroup = new THREE.Group();

        // Cards
        this.indx = 1;
        this.slideIndx = document.querySelector('#slide-indx');
        this.card = {
            total: 20,
            width: .5,
            height: 1.75,
            gap: .1,
            ranges: [],
            moveCamera : false
        };

        this.setMeshes();
    }

    setMeshes() {
        let planeGeo = null
        let plane = null;

        if (this.card.gap < 0) {
            throw('Card gap must be 0 or greater');
        }

        for (let n =  1; n <= this.card.total; n++) {
            planeGeo = new THREE.PlaneGeometry(this.card.width, this.card.height, 1, 1);
            plane = new THREE.Mesh(planeGeo);
            
            // Generate at nth position card width plus gap
            plane.position.x = (n - 1) * (this.card.width + this.card.gap);

            // Collect care range data
            this.card.ranges.push({ 
                start: (plane.position.x - (this.card.width / 2)) - (this.card.gap / 2), 
                mid: plane.position.x, 
                end: (plane.position.x + (this.card.width / 2)) + (this.card.gap / 2)
            });
            
            this.meshes.push(plane);
            this.meshGroup.add(plane);
        }

        // Set the cards flush left at {0, 0}
        // this.meshGroup.position.x = this.card.width / 2;

        this.scene.add(this.meshGroup);
    }

    updateMeshes(speed) {
        if (this.meshes.length > 0) {            
            if (this.card.moveCamera) {
                this.camera.position.x -= speed;
            } else {
                this.meshGroup.position.x -= speed;
            }

            // Determine current card index
            for (let n = 0; n < this.card.total; n++) {
                if (this.card.moveCamera) {
                    if (this.camera.position.x >= this.card.ranges[n].start && this.camera.position.x <= this.card.ranges[n].end) {
                        this.indx = n + 1;
                    } 
                } else {
                    if (this.meshGroup.position.x <= -this.card.ranges[n].start && this.meshGroup.position.x >= -this.card.ranges[n].end) {
                        this.indx = n + 1;
                    } 
                }
            }

            // Update UI
            this.slideIndx.innerHTML = `${this.indx} of ${this.card.total}`;
        }
    }
}
