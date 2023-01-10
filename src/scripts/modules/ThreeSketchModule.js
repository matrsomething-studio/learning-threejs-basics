// https://threejs.org/
// https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// https://threejs.org/docs/#examples/en/loaders/GLTFLoader
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

// Shaders
import fragmentRGB from '../shaders/rgb/fragment.glsl';

// DAT GUI - https://github.com/dataarts/dat.gui
import * as dat from 'dat.gui';

// GSAP - https://greensock.com/docs/v3/GSAP/Timeline
import { gsap, Quad } from 'gsap';

// Controls -  https://threejs.org/docs/?q=OrbitControls#examples/en/controls/OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Class - ThreeSketchModule
export default class ThreeSketchModule {
    constructor(options) {
        this.options = options;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.time = 0;
        this.speed = 0;
        this.geometry = null;
        this.plane = null;
        this.meshGroup = new THREE.Group();
        this.meshes = [];
        this.materials = {};
        this.mouse = {x: 0, y: 0};
        // this.tl = gsap.timeline();
        
        this.setScene();
        this.setRenderer();
        this.setCamera();
        this.setControls();
        this.createMaterial();
        this.createObjects();
        this.createGUI();
        this.handleResize();
    }

    createGUI() {
        // DAT GUI - https://github.com/dataarts/dat.gui
        this.GUI = new dat.GUI();
        this.meshes.forEach((mesh, indx) => {
            let folder = this.GUI.addFolder(`Object 00${++indx}`);
            let cords = ['x', 'y', 'z'];

            cords.forEach(cord => {
                folder.add(mesh.position, cord, -1, 1, 0.01).name( `Translate ${cord}`  ); 
            });

            cords.forEach(cord => {
                folder.add(mesh.rotation, cord, 0, Math.PI * 2, 0.01).name( `Rotate ${cord}`  ); 
            });

            folder.add(mesh, 'visible', 0, 1, 0.01); 
            folder.open();
        });
    }

    setScene() {
        // Scene - https://threejs.org/docs/?q=Scene#api/en/scenes/Scene
        this.scene = new THREE.Scene();
    }

    setRenderer() {
        // Renderer - https://threejs.org/docs/#api/en/renderers/WebGLRenderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.sortObjects = false;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        this.container = this.options.dom;
        this.container.appendChild(this.renderer.domElement);
    }

    setCamera() {
        // Camera - https://threejs.org/docs/?q=PerspectiveCamera#api/en/cameras/PerspectiveCamera
        this.camera = new THREE.PerspectiveCamera(
            70,
            this.width / this.width,
            0.001,
            1000
        );
        this.camera.position.set(0, 0, 2);
        this.camera.lookAt(0, 0, 0);
    }

    setControls() {
        // Controls -  https://threejs.org/docs/?q=OrbitControls#examples/en/controls/OrbitControls
        if (this.options.orbitControls) {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        }
    }

    createObjects() {
        this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
        this.plane = new THREE.Mesh(this.geometry, this.materials.rgb);
        this.scene.add(this.plane);
        this.meshes.push(this.plane);
    }

    createMaterial() {
        let material = new THREE.ShaderMaterial({
            extensions: {
                derivatives: '#extension GL_OES_standard_derivatives : enable'
            },
            side: THREE.DoubleSide,
            uniforms: {
                iTime: { value: 0 },
                iResolution:  { value: new THREE.Vector3() },
                iMouse: { value: this.mouse }
            },
            // wireframe: true,
            transparent: true,
            // vertexShader: vertex,
            fragmentShader: fragmentRGB
        });

        this.materials.rgb = material;
    }

    handleResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;

        let a1, a2;
        this.imageAspect = 1080 / 1920;

        if (this.camera.aspect > this.imageAspect) {
            a1 = (this.width / this.height) * this.imageAspect;
            a2 = 1;
        } else {
            a1 = 1;
            a2 = (this.height / this.width) / this.imageAspect;
        }

        for (const [key, value] of Object.entries(this.materials)) {
            value.uniforms.iResolution.value.x = this.width;
            value.uniforms.iResolution.value.y = this.height;
            value.uniforms.iResolution.value.z = a1;
            value.uniforms.iResolution.value.w = a2;
        }
          
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    animate() {
        this.time += 0.05;

        for (const [key, value] of Object.entries(this.materials)) {
            value.uniforms.iResolution.value.set(this.width, this.height, 1);
            value.uniforms.iTime.value = this.time;
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}