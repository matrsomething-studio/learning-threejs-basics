// Components(s)
import ThreeControls from './Controls';

// Class - ThreeRenderer - https://threejs.org/docs/#api/en/renderers/WebGLRenderer
export default class ThreeExperience extends ThreeControls {
    constructor(options, args) {
        super(options);
        this.playing = false;
        this.rafID = null;

        // States
        this.isMoved = false;
        this.resize();
        this.play();
    }

    resize() {
        this.resizeWindow();
        this.resizeCamera();
        this.resizeRenderer();
    }

    play() {
        if (!this.playing) {
            this.playing = true;
            this.update();
        }
    }

    stop() {
        if (this.playing) {
            this.playing = false;
            window.cancelAnimationFrame(this.rafID);
        }
    }

    update() {
        this.updateBase();
        this.updateObjects();
        this.updateControls();
        this.updateRenderer();
        this.rafID = requestAnimationFrame(this.update.bind(this));
    }

    destroy() {
        this.stop();
        this.destroyRenderer();
        this.destroyCamera();
        this.destroyScene();
    }

    // REFACTOR AND CLEAN UP
    handleObjectsOnClick() {
        const tl = gsap.timeline({ repeat: 0 });
        const dy = (this.isMoved) ? 0 : 10;
        const da = (this.isMoved) ? 1 : 0;
        const time = 1.25;

        this.cards.group.children.forEach((card, indx) => {
            tl.to(card.position, {
                y: (indx % 2 === 0) ? dy : -dy,
                duration: time,
                ease: 'expo.inOut',
            }, `-=${time}`);

            tl.to(card.material.uniforms.uOpacity, { 
                value: da, 
                duration: .25 
            }, `-=${time}`);
        });

        this.isMoved = !this.isMoved;

        tl.play(0);
    }

    handleCardsOnClick() {
        const tl = gsap.timeline({ repeat: 0 });
        const dy = (this.isMoved) ? 0 : 15;
        const da = (this.isMoved) ? 1 : 0;
        const time = 0.55;
    
        this.raycaster.setFromCamera(this.mouse.pointer, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        
        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;

            tl.to(clickedObject.position, {
                y: -dy,
                duration: time,
                ease: 'expo.inOut',
            }, `-=${time}`);

            tl.to(clickedObject.material.uniforms.uOpacity, { 
                value: da, 
                duration: .25 
            }, `-=${time}`);

            tl.play(0);
        }
    }

    testMouseIn() {
        const tl = gsap.timeline({ repeat: 0 });
        const time = 0.75;
        const scaleFactor = 0.5;
        
        this.cards.materials.forEach((mat, index) => {    
            let scaledRatio =  mat.uniforms.uImageBounds.value.x * scaleFactor / mat.uniforms.uImageBounds.value.y;

            tl.to(mat.uniforms.uScale.value, { 
                x: scaledRatio, 
                ease: 'expo.inOut',
                duration: time 
            }, `-=${time}`);

            tl.to(mat.uniforms.uZoom, { 
                value: scaledRatio * 2.25, 
                ease: 'expo.inOut',
                duration: time 
            }, `-=${time}`);
        });
        
        this.cards.group.children.forEach((card, index) => {
            tl.to(card.scale, { 
                x: scaleFactor,
                ease: 'expo.inOut',
                duration: time
            }, `-=${time}`);

            tl.to(card.position, { 
                x: index * (this.cards.width / 2.0 + this.cards.gap),
                ease: 'expo.inOut',
                duration: time
            }, `-=${time}`);
        });
        
        tl.play(0);
    }

    testMouseOut() {
        const tl = gsap.timeline({ repeat: 0 });
        const time = 0.75;

        this.cards.materials.forEach((mat, index) => {       
            let scaledRatio =  mat.uniforms.uImageBounds.value.x / mat.uniforms.uImageBounds.value.y;     
            tl.to(mat.uniforms.uScale.value, { 
                x: scaledRatio,
                ease: 'expo.inOut',
                duration: time
            }, `-=${time}`);

            tl.to(mat.uniforms.uZoom, { 
                value: 1, 
                ease: 'expo.inOut',
                duration: time 
            }, `-=${time}`);
        });

        this.cards.group.children.forEach((card, index) => {            
            tl.to(card.scale, { 
                x: 1.0,
                ease: 'expo.inOut',
                duration: time
            }, `-=${time}`);

            tl.to(card.position, { 
                x: index * (this.cards.width + this.cards.gap),
                ease: 'expo.inOut',
                duration: time
            }, `-=${time}`);

            tl.play(0);
        });
    }
}
