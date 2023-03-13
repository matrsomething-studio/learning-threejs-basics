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
        this.s = 0;
    
        // Cards
        this.slideUI = document.querySelector('#slide-indx');
        this.slideIndx = 0;
        this.imgScale = 3;
        this.cards = {
            total: 5,
            width: 1.5 * this.imgScale, // Image ratio is w / h
            height: 1 * this.imgScale,
            gap: .10,
            ranges: [],
            constraints: {},
            group: new THREE.Group(),
            materials: []
        };

        // Lerp
        this.position = 100;
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
                transparent: true,
                uniforms: {
                  time: { value: 0.0 },
                  texture1: { value: texture },
                  opacity: { value: 1.0 },
                  scroll: { value: 0.0 },
                  uOffset: { value: new THREE.Vector2(0.0, 0.0) },
                  scale: { value: new THREE.Vector2(1.5, 1.0) },
                  imageBounds: { value: new THREE.Vector2(700, 467) },
                  zoom: { value: 1.0 }
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader
            });

            // Collect generated materials
            this.cards.materials.push(material);

            // Generate cards
            cardGeo = new THREE.PlaneGeometry(this.cards.width, this.cards.height, 10, 10);
            card = new THREE.Mesh(cardGeo, material);
            
            // Place card at nth position using card width plus gap
            card.position.x = n * (this.cards.width + this.cards.gap);

            // Unique data-set
            card.uid = `uid-card-${n+1}`;

            // Collect card range data
            this.cards.ranges.push({ 
                start: card.position.x - this.cards.width / 2 - this.cards.gap / 2,
                mid: card.position.x,
                end: card.position.x + this.cards.width / 2 + this.cards.gap / 2
            });

            // Add card to group set
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
        this.cards.materials.forEach((mat, index) => {
            mat.uniforms.time.value = this.time.elapsed * 2;
            mat.uniforms.scroll.value = this.s;
            mat.uniforms.uOffset.value.set(this.s * 0.15, this.s * 0.25);
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

    updateObjects(speed) {
        this.s = speed;
        this.updateCards();
    }
}
