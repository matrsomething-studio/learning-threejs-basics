// Docs - https://threejs.org/ & https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// https://threejs.org/docs/#examples/en/loaders/GLTFLoader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
        this.lights = [];
        this.materials = {};
        this.textureLoader = new THREE.TextureLoader();
        // this.GLTFLoader = new GLTFLoader();

        this.setMaterials();
        this.setMeshes();
        // this.setImports();
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
            vertexShader: vertexRGB,
            transparent: true,
            fragmentShader: fragmentRGB,
        });
    }

    setMeshes() {
        const planeGeo = new THREE.PlaneGeometry(1, 1, 1, 1);
        const plane = new THREE.Mesh(planeGeo, this.materials.rgb);

        this.scene.add(plane);
        this.meshes.push(plane);
    }

    setImports() {
        this.GLTFLoader.load('data/scene.gltf', (gltf) => {
            const scene = gltf.scene;
            scene.scale.set(0.05, 0.05, 0.05);
            scene.position.set(2, 0.0, 0.0);
            this.scene.add(scene);
        });
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

    updateMeshes() {
        if (this.meshes.length > 0) {
            // Update Meshes
        }
    }

    updateLights() {
        if (this.lights.length > 0) {
            // Update Lights
        }
    }
}
