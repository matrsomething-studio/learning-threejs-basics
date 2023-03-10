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
        this.material = null;
        this.slideUI = document.querySelector('#slide-indx');
        this.slideIndx = 0;
        this.cardGroup = new THREE.Group();
        this.cards = {
            total: 4,
            width: 1.6 * 3,
            height: 1 * 3,
            gap: 0.10,
            ranges: [],
            constraints: {
                start: null,
                end: null
            }
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
        const texture = textureLoader.load('images/5.jpg');
        texture.needsUpdate = true;
        this.material = new THREE.ShaderMaterial({
            uniforms: {
              time: { type: "f", value: 0 },
              scale: { value: new THREE.Vector2(1.0, 1.0) },
              texture1: { value: texture, type: 't' }
            },
            vertexShader: `
           varying vec2 vUv;
           uniform float time;
           float sineSpeed = 1.0;
           float sineIntensity = 0.05;
           
           void main() {
              vUv = (uv - vec2(0.5)) * (0.8 - 0.02) + vec2(0.5);
              // vUv = uv;
              // vUv.y -= sin(time * sineSpeed) * sineIntensity;
              vUv.x -= sin(time * sineSpeed) * sineIntensity;

              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
            fragmentShader: `
              uniform sampler2D texture1;
              varying vec2 vUv;
              void main() {
                gl_FragColor = texture2D(texture1, vUv);
              }
            `
        });
        let cardGeo = null
        let card = null;

        for (let n =  0; n < this.cards.total; n++) {
            cardGeo = new THREE.PlaneGeometry(this.cards.width, this.cards.height, 1, 1);
            card = new THREE.Mesh(cardGeo, this.material);
            
            // Generate card at nth position using card width plus gap
            card.position.x = n * (this.cards.width + this.cards.gap);

            // Collect card range data
            this.cards.ranges.push({ 
                start: card.position.x - this.cards.width / 2 - this.cards.gap / 2,
                mid: card.position.x,
                end: card.position.x + this.cards.width / 2 + this.cards.gap / 2
            });    

            this.cardGroup.add(card);
        }

        // Set cards start/end constraints
        this.cards.constraints.start = -this.cards.ranges[0].mid;
        this.cards.constraints.end = -this.cards.ranges[this.cards.ranges.length - 1].mid;

        // Add to scene
        this.scene.add(this.cardGroup);
    }

    updateCards() {
        this.material.uniforms.time.value = this.time.elapsed * 2;

        // Set cards +/- constraints
        this.scroll = clamp(this.scroll, this.cards.constraints.end, this.cards.constraints.start);

        // Set position
        this.position = lerp(this.position, this.scroll, this.lerpAmt);
        this.cardGroup.position.x = this.position;

        // Determine current card index
        this.slideIndx = this.cards.ranges.findIndex((range) => {
            return this.cardGroup.position.x <= -range.start && this.cardGroup.position.x >= -range.end;
        }) + 1;
      
        // Update UI 
        this.slideUI.innerHTML = `${this.slideIndx} of ${this.cards.total}`;
    }

    updateObjects() {
        this.updateCards();
    }
}
