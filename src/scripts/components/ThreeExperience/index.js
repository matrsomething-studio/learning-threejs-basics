// Components(s)
import ThreeControls from './Controls';

// Class - ThreeRenderer - https://threejs.org/docs/#api/en/renderers/WebGLRenderer
export default class ThreeExperience extends ThreeControls {
    constructor(options, args) {
        super(options);
        this.options = options;
        this.playing = false;
        this.rafID = null;

         // Speed
         this.speed = {
            value: this.wheel.deltaY || 0,
            scale: .0004,
            friction: .9,
        };

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

    setSpeed() {
        this.speed.value += (this.wheel.evt.deltaY * this.speed.scale);
        console.log(this.speed);
    }

    setCursor() {
        this.cursor.x = this.mouse.evt.clientX / this.width - 0.5;
        this.cursor.y = this.mouse.evt.clientY / this.height - 0.5;

        // For raycasting
        this.mouse.pointer.x = this.mouse.evt.clientX / this.width * 2 - 1
        this.mouse.pointer.y = - (this.mouse.evt.clientY / this.height) * 2 + 1
    }

    setScroll() {
        this.wheel.isActive = true;
        this.scroll -= this.wheel.evt.deltaY * 0.0085;
        
        setTimeout(() => {
            this.wheel.isActive = false;
        }, 150);
    }

    update() {
        this.speed.value *= this.speed.friction;
        this.updateBase();
        this.updateObjects(this.speed.value);
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

    // Event Handlers
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

            tl.to(card.material.uniforms.opacity, { 
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
            let clickedObject = intersects[0].object;

            tl.to(clickedObject.position, {
                y: -dy,
                duration: time,
                ease: 'expo.inOut',
            }, `-=${time}`);

            tl.to(clickedObject.material.uniforms.opacity, { 
                value: da, 
                duration: .25 
            }, `-=${time}`);

            tl.play(0);
        }
    }
}
