// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Components(s)
import ThreeRenderer from './Renderer';

function lerp (start, end, amt){
    return (1 - amt) * start + amt * end;
}

// Clamp number between two values with the following line:
function clamp (num, min, max) { 
    return Math.min(Math.max(num, min), max);
}

// Class - ThreeObjects - https://threejs.org/docs/
export default class ThreeObjects extends ThreeRenderer {
    constructor(options) {
        super(options);
        this.options = options;
    
        // Cards
        this.cardGroup = new THREE.Group();
        this.slideIndx = document.querySelector('#slide-indx');
        this.cardOptions = {
            total: 8,
            width: 2.15,
            height: 3.15,
            gap: .12,
            ranges: []
        };

        // Lerp
        this.position = 0;
        this.lerpAmt = 0.08; // Higher the value = faster
        this.sized = false;

        this.createCards();
    }

    createCards() {
        let cardGeo = null
        let card = null;

        if (this.cardOptions.gap < 0) {
            throw('Card gap must be 0 or greater');
        }

        for (let n =  0; n < this.cardOptions.total; n++) {
            cardGeo = new THREE.PlaneGeometry(this.cardOptions.width, this.cardOptions.height, 1, 1);
            let material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
            card = new THREE.Mesh(cardGeo, material);
            
            // Generate at nth position card width plus gap
            card.position.x = (n) * (this.cardOptions.width + this.cardOptions.gap);

            // Collect care range data
            this.cardOptions.ranges.push({ 
                start: (card.position.x - (this.cardOptions.width / 2)) - (this.cardOptions.gap / 2), 
                mid: card.position.x, 
                end: (card.position.x + (this.cardOptions.width / 2)) + (this.cardOptions.gap / 2)
            });
            
            this.cardGroup.add(card);
        }

        this.cardOptions.constrains = {
            start: -this.cardOptions.ranges[0].mid,
            end: -this.cardOptions.ranges[this.cardOptions.ranges.length - 1].mid
        };

        // Add to scene
        this.scene.add(this.cardGroup);
    }

    updateObjects() {
        if (this.scroll.force > this.cardOptions.constrains.start) {
            this.scroll.force = this.cardOptions.constrains.start;
        } 
        
        if ( this.scroll.force < this.cardOptions.constrains.end){
            this.scroll.force = this.cardOptions.constrains.end;
        }
        
        this.position = lerp(this.position, this.scroll.force, this.lerpAmt);
        this.cardGroup.position.x = this.position;
       
        // Determine current card index
        for (let n = 0; n < this.cardOptions.total; n++) {
            if (this.cardGroup.position.x <= -this.cardOptions.ranges[n].start && this.cardGroup.position.x >= -this.cardOptions.ranges[n].end) {
                this.indx = n + 1;
            }
        }

        // Update UI 
        this.slideIndx.innerHTML = `${this.indx} of ${this.cardOptions.total} `;
    }
}
