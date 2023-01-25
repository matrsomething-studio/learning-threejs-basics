// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Util(s)
import { lerp } from '../../utils/math';

// Components(s)
import ThreeRenderer from './Renderer';

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
        this.position = 0.0;
        this.lerpAmt = 0.08; // Higher the value = faster

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

            // Collect card range data
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
        if (this.scroll > this.cardOptions.constrains.start) {
            this.scroll = this.cardOptions.constrains.start;
        } 
        
        if ( this.scroll < this.cardOptions.constrains.end){
            this.scroll = this.cardOptions.constrains.end;
        }
        
        this.position = lerp(this.position, this.scroll, this.lerpAmt);
        this.cardGroup.position.x = this.position;
       
        // Determine current card index
        for (let n = 0; n < this.cardOptions.total; n++) {
            if (this.cardGroup.position.x <= -this.cardOptions.ranges[n].start && this.cardGroup.position.x >= -this.cardOptions.ranges[n].end) {
                this.indx = n + 1;
            }           
        }

        // Update UI 
        this.slideIndx.innerHTML = `${this.indx} of ${this.cardOptions.total}`;
    }
}
