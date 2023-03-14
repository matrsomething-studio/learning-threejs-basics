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
        this.speed.value += this.wheel.evt.deltaY * this.speed.scale;
    }

    setCursor() {
        this.cursor.x = this.mouse.evt.clientX / this.width - 0.5;
        this.cursor.y = this.mouse.evt.clientY / this.height - 0.5;

        // For raycasting
        this.mouse.pointer.x = this.mouse.evt.clientX / this.width * 2 - 1
        this.mouse.pointer.y = -(this.mouse.evt.clientY / this.height) * 2 + 1
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
            const clickedObject = intersects[0].object;

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

    testClick() {
        const tl = gsap.timeline({ repeat: 0 });
        const time = 0.55;
        const scaleFactor = 0.5;
        
        this.cards.materials.forEach((mat, index) => {    
            // (imageBounds.x (w) * scaleFactor) / imageBounds.y (h) 
            let scaledRatio =  mat.uniforms.imageBounds.value.x * scaleFactor / mat.uniforms.imageBounds.value.y;

            tl.to(mat.uniforms.scale.value, { 
                x: scaledRatio, 
                ease: 'expo.inOut',
                duration: time 
            }, `-=${time}`);

            tl.to(mat.uniforms.zoom, { 
                value: scaledRatio * 2, 
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
                duration: time,
                onComplete: () => {
                    // Collect card range data
                   this.cards.ranges.push({ 
                       start: card.position.x - this.cards.width / 2 - this.cards.gap / 2,
                       mid: card.position.x,
                       end: card.position.x + this.cards.width / 2 + this.cards.gap / 2
                   });

                    // Set cards start/end constraints
                   this.cards.constraints.start = -this.cards.ranges[0].mid;
                   this.cards.constraints.end = -this.cards.ranges[this.cards.ranges.length - 1].mid;
               }
            }, `-=${time}`);
        });
        
        tl.play(0);
    }

    testClick2() {
        const tl = gsap.timeline({ repeat: 0 });
        const time = 0.55;

        this.cards.materials.forEach((mat, index) => {       
            let scaledRatio =  mat.uniforms.imageBounds.value.x / mat.uniforms.imageBounds.value.y;     
            tl.to(mat.uniforms.scale.value, { 
                x: scaledRatio,
                ease: 'expo.inOut',
                duration: time
            }, `-=${time}`);

            tl.to(mat.uniforms.zoom, { 
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
                duration: time,
                onComplete: () => {
                    // Collect card range data
                   this.cards.ranges.push({ 
                       start: card.position.x - this.cards.width / 2 - this.cards.gap / 2,
                       mid: card.position.x,
                       end: card.position.x + this.cards.width / 2 + this.cards.gap / 2
                   });

                    // Set cards start/end constraints
                   this.cards.constraints.start = -this.cards.ranges[0].mid;
                   this.cards.constraints.end = -this.cards.ranges[this.cards.ranges.length - 1].mid;
               }
            }, `-=${time}`);

            tl.play(0);
        });
    }
}
