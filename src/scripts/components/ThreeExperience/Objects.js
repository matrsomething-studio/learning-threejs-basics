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
        this.indx = 0;
        this.slideIndx = document.querySelector('#slide-indx');

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

        for (let i =  1; i <= 3; i++) {
            planeGeo = new THREE.PlaneGeometry(2, 2.5, 1, 1);
            plane = new THREE.Mesh(planeGeo, this.materials.rgb);
            plane.position.x = (i === 1) ? 0 : plane.position.x + (i - 1) * 2.5;     
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
            let i = .5;

            // (this.meshGroup.children).forEach(el => {
            //     el.scale.set(Math.abs((1 * speed))  + 1, Math.abs((1.5**i * speed)) + 1, 1);
            //     i += .5;
            // });

            this.meshGroup.position.x -= speed;
            // this.meshGroup.position.x = -3.76;
            // this.meshGroup.position.x = -6.26;

            if (this.meshGroup.position.x >= -1.25) {
                this.indx = 0;
            } else if (this.meshGroup.position.x <= -1.26 && this.meshGroup.position.x >= -3.75) {
                this.indx = 1;
            } else if (this.meshGroup.position.x <= -3.76 && this.meshGroup.position.x >= -6.26) {
                this.indx = 2;
            }else if (this.meshGroup.position.x <= -3.76 && this.meshGroup.position.x >= -6.26) {
                this.indx = 2;
            }

            this.slideIndx.innerHTML = this.indx + 1;
        }
    }

    updateLights() {
        if (this.lights.length > 0) {
            // Update Lights
        }
    }
}
