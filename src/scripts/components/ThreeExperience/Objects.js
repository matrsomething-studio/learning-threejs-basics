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
            width: 2.5,
            gap: 2.5
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

        for (let i =  1; i <= this.card.total; i++) {
            planeGeo = new THREE.PlaneGeometry(2, this.card.width, 1, 1);
            plane = new THREE.Mesh(planeGeo, this.materials.rgb);
            plane.position.x = (i === 1) ? 0 : plane.position.x + (i - 1) * this.card.gap;     
            this.meshes.push(plane);
            this.meshGroup.add(plane);
        }

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

            // 1 : 2.00
            // if (this.meshGroup.position.x <= -3.00 && this.meshGroup.position.x >= -1.00) {
            //     this.indx = 1;
            // } else if (this.meshGroup.position.x <= -1.00 && this.meshGroup.position.x >= -3.00) {
            //     this.indx = 2;
            // } else if (this.meshGroup.position.x <= -3.00 && this.meshGroup.position.x >= -5.00) {
            //     this.indx = 3;
            // } else if (this.meshGroup.position.x <= -5.00 && this.meshGroup.position.x >= -7.00){
            //     this.indx = 4;
            // }

            for (let i = 1; i <= this.card.total; i++) {
                let max = (this.card.gap * i + 1)  - this.card.gap;
                let min = max - this.card.gap;

                if (this.meshGroup.position.x <= -min && this.meshGroup.position.x >= -max) {
                    this.indx = i;
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
