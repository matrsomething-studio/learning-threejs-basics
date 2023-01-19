// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// Components(s)
import ThreeRenderer from './Renderer';
import ThreeDataGUI from './DataGUI';

// Shader(s)
import vertexRGB from '../../shaders/rgb/vertex.glsl';
import fragmentRGB from '../../shaders/rgb/fragment.glsl';

// Class - ThreeObjects - https://threejs.org/docs/?q=Scene#api/en/scenes/Scene
export default class ThreeObjects extends ThreeRenderer {
    constructor(options) {
        super(options);
        this.options = options;
        this.meshes = [];
        this.meshGroup = new THREE.Group();
        this.lights = [];
        this.materials = {};
        
        // Slider
        this.indx = 1;
        this.slideIndx = document.querySelector('#slide-indx');
        this.card = {
            total: 4,
            width: 2,
            height: 2.5,
            gap: 1.01
        };

        this.setMaterials();
        this.setMeshes();
        this.setLights();
        this.setDataGUI();
    }

    setDataGUI() {
        if (this.options.showGUI) {
            this.gui = new ThreeDataGUI(this);
        }
    }

    setMaterials() {
        this.materials.rgb = new THREE.ShaderMaterial({
            extensions: {
                derivatives: '#extension GL_OES_standard_derivatives : enable',
            },
            side: THREE.DoubleSide,
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: new THREE.Vector3() },
                iMouse: { value: this.mouse },
            },
            // wireframe: true,
            // vertexShader: vertexRGB,
            transparent: true,
            fragmentShader: fragmentRGB,
        });
    }

    setMeshes() {
        let planeGeo = null
        let plane = null;

        if (this.card.gap < 1.0) {
            throw('Card gap must be >= 1.00');
        }

        for (let n =  1; n <= this.card.total; n++) {
            planeGeo = new THREE.PlaneGeometry(this.card.width, this.card.height, 1, 1);
            plane = new THREE.Mesh(planeGeo);
            
            // Generate card at nth positon plus card gap
            plane.position.x = (n === 1) ? 0 : plane.position.x + (n - 1) * (this.card.width * this.card.gap);     
            
            this.meshes.push(plane);
            this.meshGroup.add(plane);
        }

        // Set the slider flush left at {0, 0}
        this.meshGroup.position.x = this.card.width / 2;
        this.scene.add(this.meshGroup);
    }

    setLights() {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.scene.add(directionalLight);
        this.lights.push(directionalLight);
    }

    updateMaterials() {
        if (this.materials) {
            this.materials.rgb.uniforms.iResolution.value.set(this.width, this.height, 1);
            this.materials.rgb.uniforms.iTime.value = this.time.elapsed;
        }
    }

    updateMeshes(speed) {
        if (this.meshes.length > 0) {
            this.meshGroup.position.x -= speed;
            
            // this.meshGroup.position.x = 1.00;

             // 1 : (card.width + card.gap)
             // (x <= min && x >= max)
            if (this.meshGroup.position.x <= 1.00 && this.meshGroup.position.x >= -1.00) {
                this.indx = 1;
            } else if (this.meshGroup.position.x <= -1.00 && this.meshGroup.position.x >= -3.00) {
                this.indx = 2;
            } else if (this.meshGroup.position.x <= -3.00 && this.meshGroup.position.x >= -5.00 ) {
                this.indx = 3;
            } else if ( this.meshGroup.position.x <= -5.00 && this.meshGroup.position.x >= -7.00){
                this.indx = 4;
            }

            for (let n = 1; n <= this.card.total; n++) {
                let min = (n === 1) ? 1.00 : -((this.card.width * n) - (this.card.width * .5) - this.card.gap);
                let max = min - this.card.gap;

                console.log('Index', n);
                // console.log('Min', min);
                console.log('Max', max);

                if (this.meshGroup.position.x <= min && this.meshGroup.position.x >= max) {
                    this.indx = n;
                } 
            }

            this.slideIndx.innerHTML = `${this.indx} of ${this.card.total}`;;
        }
    }

    updateLights() {
        if (this.lights.length > 0) {
            // Update Lights
        }
    }
}
