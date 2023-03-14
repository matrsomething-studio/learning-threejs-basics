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

        // UI
        this.slideUI = document.querySelector('#slide-indx');
        this.slideIndx = 0;

        // Image Settings
        this.imgSettings = {
            scale: 2.5,
            w: 300,
            h: 420
        };

        // Cards
        this.cards = {
            total: 10,
            width: 1.0 * this.imgSettings.scale, // Image ratio is w / h
            height: 1.4 * this.imgSettings.scale,
            gap: 0.10,
            ranges: [],
            constraints: {},
            group: new THREE.Group(),
            materials: []
        };

        // Lerp
        this.position = 100.0; // How far off the screen group before tween in
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
            texture = textureLoader.load(`images/1440-900/${n + 1}-small.jpg`);
            texture.needsUpdate = true;
            material = new THREE.ShaderMaterial({
                transparent: true,
                uniforms: {
                    uImageBounds: { value: new THREE.Vector2(this.imgSettings.w, this.imgSettings.h) },
                    uOffset: { value: new THREE.Vector2(0.0, 0.0) },
                    uOpacity: { value: 1.0 },
                    uScale: { value: new THREE.Vector2(this.imgSettings.w / this.imgSettings.h, 1.0) },
                    uScroll: { value: 0.0 },
                    uTexture: { value: texture },
                    uTime: { value: 0.0 },
                    uZoom: { value: 1.0 }
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

            // Unique data-set for content fetching
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
            mat.uniforms.uTime.value = this.time.elapsed * 2.0;
            mat.uniforms.uScroll.value = this.speed.value * 0.45;
            mat.uniforms.uOffset.value.set(this.speed.value * 0.15, this.speed.value * 0.25);
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
}
