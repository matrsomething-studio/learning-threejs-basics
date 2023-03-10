// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Util(s)
import { lerp, clamp } from '../../utils/math';

// Components(s)
import ThreeRenderer from './Renderer';

// Shaders(s)
import vertexShader from '../../shaders/floating-image/vertex.glsl';
import fragmentShader from '../../shaders/floating-image/fragment.glsl';

// Class - ThreeObjects - https://threejs.org/docs/
export default class ThreeObjects extends ThreeRenderer {
    constructor(options) {
        super(options);

        // States
        this.isMoved = false;
    
        // Cards
        this.slideUI = document.querySelector('#slide-indx');
        this.slideIndx = 0;
        this.imgScale = 3;
        this.cards = {
            total: 4,
            width: 1.5 * this.imgScale, // Image ratio is w / h
            height: 1 * this.imgScale,
            gap: .10,
            ranges: [],
            constraints: {},
            group: new THREE.Group(),
            materials: []
        };

        // Lerp
        this.position = 0.0;
        this.lerpAmt = 0.085; // Higher the value = faster

        this.createCards();
    }

    createCards() {
        if (this.cards.gap < 0) {
            throw('Card gap must be 0 or greater');
        }

        const textureLoader = new THREE.TextureLoader();
        let texture = null;
        let material = null;
        let cardGeo = null
        let card = null;

        for (let n = 0; n < this.cards.total; n++) {
            // Load texture and create materials
            texture = textureLoader.load(`images/${n + 1}.jpg`);
            texture.needsUpdate = true;
            material = new THREE.ShaderMaterial({
                side: THREE.DoubleSide,
                uniforms: {
                  time: { type: 'f', value: 0.0 },
                  texture1: { type: 't', value: texture }
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader
            });

            this.cards.materials.push(material);

            // Generate cards
            cardGeo = new THREE.PlaneGeometry(this.cards.width, this.cards.height, 1, 1);
            card = new THREE.Mesh(cardGeo, material);
            
            // Place card at nth position using card width plus gap
            card.position.x = n * (this.cards.width + this.cards.gap);

            // Collect card range data
            this.cards.ranges.push({ 
                start: card.position.x - this.cards.width / 2 - this.cards.gap / 2,
                mid: card.position.x,
                end: card.position.x + this.cards.width / 2 + this.cards.gap / 2
            });    

            this.cards.group.add(card);
          
        }

        // Set cards start/end constraints
        this.cards.constraints.start = -this.cards.ranges[0].mid;
        this.cards.constraints.end = -this.cards.ranges[this.cards.ranges.length - 1].mid;

        // Add to scene
        this.scene.add(this.cards.group);
    }

    updateCards() {
        // Update material uniforms
        this.cards.materials.forEach((mat) => {
            mat.uniforms.time.value = this.time.elapsed * 2;
        });

        // Set cards +/- constraints
        this.scroll = clamp(this.scroll, this.cards.constraints.end, this.cards.constraints.start);

        // Set position
        this.position = lerp(this.position, this.scroll, this.lerpAmt);
        this.cards.group.position.x = this.position;

        // Determine current card index
        this.slideIndx = this.cards.ranges.findIndex((range) => {
            return this.cards.group.position.x <= -range.start && this.cards.group.position.x >= -range.end;
        }) + 1;
      
        // Update UI 
        this.slideUI.innerHTML = `${this.slideIndx} of ${this.cards.total}`;
    }

    updateObjects() {
        this.updateCards();
    }

    // Event Handlers
    handleObjectsOnClick() {
        const tl = gsap.timeline({ repeat: 0 });

        this.cards.group.children.forEach((card, indx) => {
            let dy = (this.isMoved) ? 0 : 15;
            let time = 0.55;
            tl.to(card.position, {
                // y: (indx % 2 === 0) ? dy : -dy,
                z: (indx % 2 === 0) ? dy : -dy,
                duration: time,
                ease: 'expo.inOut',
            }, `-=${time}`);
        });

        this.isMoved = !this.isMoved;

        tl.play(0);
    }
}
