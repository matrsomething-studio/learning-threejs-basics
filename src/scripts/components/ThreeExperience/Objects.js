// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Components(s)
import ThreeRenderer from './Renderer';

const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

// Class - ThreeObjects - https://threejs.org/docs/?q=Scene#api/en/scenes/Scene
export default class ThreeObjects extends ThreeRenderer {
    constructor(options) {
        super(options);
        this.options = options;
        this.meshGroup = new THREE.Group();

        // Cards
        this.indx = 1;
        this.progress = 0;
        this.duration = this.width;
        this.slideIndx = document.querySelector('#slide-indx');
        this.card = {
            total: 30,
            width: .5,
            height: 1.9,
            gap: .12,
            ranges: []
        };

        this.setMeshes();
    }

    setMeshes() {
        let planeGeo = null
        let plane = null;

        if (this.card.gap < 0) {
            throw('Card gap must be 0 or greater');
        }

        for (let n =  0; n < this.card.total; n++) {
            planeGeo = new THREE.PlaneGeometry(this.card.width, this.card.height, 1, 1);
            plane = new THREE.Mesh(planeGeo);
            
            // Generate at nth position card width plus gap
            plane.position.x = (n) * (this.card.width + this.card.gap);

            // Collect care range data
            this.card.ranges.push({ 
                start: (plane.position.x - (this.card.width / 2)) - (this.card.gap / 2), 
                mid: plane.position.x, 
                end: (plane.position.x + (this.card.width / 2)) + (this.card.gap / 2)
            });
            
            this.meshGroup.add(plane);
            
        }
        console.log(this.card.ranges);
        // Set the cards flush left at {0, 0}
        // this.meshGroup.position.x = this.card.width / 2;

        this.scene.add(this.meshGroup);
    }

    updateMeshes(speed) {     
        this.meshGroup.position.x -= speed;

        // Constrain scroll
        let endConstraint = -this.card.ranges[this.card.ranges.length - 1].end;

        if (this.meshGroup.position.x <= 0.0 && this.meshGroup.position.x >= endConstraint) {
            this.meshGroup.position.x -= speed;
        } else if (this.meshGroup.position.x >= 0.0) {
            this.meshGroup.position.x = 0.0;
        } else {
            this.meshGroup.position.x = endConstraint;
        }

        // Determine current card index
        for (let n = 0; n < this.card.total; n++) {
            if (this.meshGroup.position.x <= -this.card.ranges[n].start && this.meshGroup.position.x >= -this.card.ranges[n].end) {
                this.indx = n + 1;
            } 
        }

        // UI update 
        this.slideIndx.innerHTML = `${this.indx} of ${this.card.total}`;
    }
}
