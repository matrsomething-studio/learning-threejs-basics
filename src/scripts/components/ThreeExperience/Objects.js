// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Util(s)
import { lerp, clamp } from '../../utils/math';

// Components(s)
import ThreeRenderer from './Renderer';

// Class - ThreeObjects - https://threejs.org/docs/
export default class ThreeObjects extends ThreeRenderer {
    constructor(options) {
        super(options);
        this.options = options;
    
        // Cards
        this.slideUI = document.querySelector('#slide-indx');
        this.slider = document.querySelector('#slider');
        this.slideIndx = 0;
        this.cardGroup = new THREE.Group();
        this.cards = {
            total: 20,
            width: 0.5,
            height: 1.75,
            gap: 0.10,
            ranges: []
        };

        // Lerp
        this.position = 0.0;
        this.lerpAmt = 0.085; // Higher the value = faster

        this.createCards();
    }

    createCards() {
        let cardGeo = null
        let card = null;
        let material = new THREE.MeshBasicMaterial( { color: 0x220022 } );

        if (this.cards.gap < 0) {
            throw('Card gap must be 0 or greater');
        }

        for (let n =  0; n < this.cards.total; n++) {
            cardGeo = new THREE.PlaneGeometry(this.cards.width, this.cards.height, 1, 1);
            card = new THREE.Mesh(cardGeo, material);
            
            // Generate card at nth position using card width plus gap
            card.position.x = n * (this.cards.width + this.cards.gap);

            // Collect card range data
            this.cards.ranges.push({ 
                start: (card.position.x - (this.cards.width / 2)) - (this.cards.gap / 2), 
                mid: card.position.x, 
                end: (card.position.x + (this.cards.width / 2)) + (this.cards.gap / 2)
            });    

            this.cardGroup.add(card);
        }

        // Set slider start/end constraints
        this.cards.constraints = {
            start: -this.cards.ranges[0].mid,
            end: -this.cards.ranges[this.cards.ranges.length - 1].mid
        };

        this.slider.max = this.cards.constraints.start;
        this.slider.min = this.cards.constraints.end;

        // Set the cards flush left at {0, 0}
        // this.cardGroup.position.x = this.cards.width / 2;

        // Add to scene
        this.scene.add(this.cardGroup);
    }

    updateCards() {
        // Set slider +/- constraints
        if (this.scroll > this.cards.constraints.start) {
            this.scroll = this.cards.constraints.start;
        } 
        
        if ( this.scroll < this.cards.constraints.end){
            this.scroll = this.cards.constraints.end;
        }

        // Create new x movement
        if (this.mouse.isDown) {
            this.position = lerp(this.position, this.slider.value, this.lerpAmt);
            this.scroll = this.slider.value;
        } else {
            this.position = lerp(this.position, this.scroll, this.lerpAmt);
            this.slider.value = this.position;
        }
        
        this.cardGroup.position.x = this.position;

        // Do stuff to all cards
        this.cardGroup.children.forEach((card, n) => {
            // Determine current card index
            if (this.cardGroup.position.x <= -this.cards.ranges[n].start && this.cardGroup.position.x >= -this.cards.ranges[n].end) {
                this.slideIndx = n + 1;
            }
        });
      
        // Update UI 
        this.slideUI.innerHTML = `${this.slideIndx} of ${this.cards.total}`;
    }

    updateObjects() {
        this.updateCards();
    }
}
