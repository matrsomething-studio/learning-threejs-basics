// https://threejs.org/
// https://r105.threejsfundamentals.org/
import * as THREE from 'three';

// https://threejs.org/docs/#examples/en/loaders/GLTFLoader
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

// Shaders
import fragmentRGB from '../shaders/rgb/fragment.glsl';

// DAT GUI - https://github.com/dataarts/dat.gui
import * as dat from 'dat.gui';

// Controls -  https://threejs.org/docs/?q=OrbitControls#examples/en/controls/OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Class - ThreeSketchModule
export default class ThreeSketchModule {
    constructor(options) {
        this.options = options;
        this.container = document.querySelector(this.options.domSelector);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.clock = new THREE.Clock();
        this.time = 0;
        this.meshGroup = new THREE.Group();
        this.meshes = [];
        this.lights = [];
        this.materials = {};
        this.mouse = {x: 0, y: 0, cursor: {x: 0, y: 0} };
        
        this.setScene();
        this.setRenderer();
        this.setCamera();
        this.setControls();
        this.createMaterials();
        this.createObjects();
        this.createGUI();
        this.resize();
    }

    getTime() {
        return this.time;
    }

    createGUI() {
        if (!this.options.showGUI) {
            return;
        }

        // DAT GUI - https://github.com/dataarts/dat.gui
        this.GUI = new dat.GUI();
        const cords = ['x', 'y', 'z'];

        // Meshes
        this.meshes.forEach((mesh, indx) => {
            let folder = this.GUI.addFolder(`${mesh.geometry.type} 00${++indx}`);

            cords.forEach(cord => {
                folder.add(mesh.position, cord, -1, 1, 0.01).name( `Translate ${cord}` ); 
                folder.add(mesh.rotation, cord, 0, Math.PI * 2, 0.01).name( `Rotate ${cord}` ); 
                folder.add(mesh.scale, cord, 0, 1, 0.01).name( `Scale ${cord}` ); 
            });

            folder.add(mesh, 'visible', 0, 1, 0.01); 

            if (indx === 1) {
                folder.open();
            }
        });
        
        // Lights
        this.lights.forEach((light, indx) => {
            let folder = this.GUI.addFolder(`${light.type} 00${++indx}`);

            cords.forEach(cord => {
                folder.add(light.position, cord, -1, 1, 0.01).name( `Translate ${cord}` ); 
            });

            folder.add(light, 'intensity', 0, 1, 0.1);
            folder.add(light, 'visible', 0, 1, 0.01); 
        });
    }

    setScene() {
        // Scene - https://threejs.org/docs/?q=Scene#api/en/scenes/Scene
        this.scene = new THREE.Scene();
    }

    setRenderer() {
        // Renderer - https://threejs.org/docs/#api/en/renderers/WebGLRenderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.sortObjects = false;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

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
        this.camera.updateProjectionMatrix();
        this.camera.position.set(0, 0, 3);
        this.camera.lookAt(0, 0, 0);
    }

    setControls() {
        // Controls -  https://threejs.org/docs/?q=OrbitControls#examples/en/controls/OrbitControls
        if (this.options.orbitControls) {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        }
    }

    createObjects() {
        // Plane
        const planeGeo = new THREE.PlaneGeometry(1, 1, 1, 1);
        const plane = new THREE.Mesh(planeGeo, this.materials.rgb);

        this.scene.add(plane);
        this.meshes.push(plane);

        // Plane Instance
        const planeInstance = new THREE.InstancedMesh(planeGeo, this.materials.rgb, 1);
        planeInstance.position.y += -1.05;

        this.scene.add(planeInstance);
        this.meshes.push(planeInstance);

        // BoxGeometry
        const boxGeo = new THREE.BoxGeometry( 1, 1, 1 );
        const box = new THREE.Mesh(boxGeo, this.materials.rgb);
        box.position.x -= 1.5;

        this.scene.add(box);
        this.meshes.push(box);  

        // Sphere
        const sphereGeo = new THREE.SphereGeometry( .5, 32, 16 );
        const sphere = new THREE.Mesh(sphereGeo, new THREE.MeshStandardMaterial( { color: 0x2e2e2e }));
        sphere.position.y += 1;

        this.scene.add(sphere);
        this.meshes.push(sphere);  

         // Light
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        this.scene.add( directionalLight );
        this.lights.push(directionalLight);  
    }

    createMaterials() {
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
            // vertexShader: vertex,
            transparent: true,
            fragmentShader: fragmentRGB
        });

        this.materials.rgb = material;
    }

    resize() {
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
        this.time = this.clock.getElapsedTime();

        for (const [key, value] of Object.entries(this.materials)) {
            value.uniforms.iResolution.value.set(this.width, this.height, 1);
            value.uniforms.iTime.value = this.time;
        }

        if (this.controls) {
            this.controls.update();
        }

        this.renderer.render(this.scene, this.camera);
    }
}