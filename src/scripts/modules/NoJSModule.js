// Module(s)

// Class - NoJSModule
export default class NoJSModule {
    constructor(options) {
        this.options = options;
        this.html = document.querySelector('html');

        if (this.options && this.options.hasOwnProperty('enable') && this.options.enable === true) {
            this.enable();
            return;
        }

        this.tests();
    }

    get isWebGLEnabled() {
        let canvas = document.createElement('canvas');

        if (typeof canvas.getContext === 'function') {
            return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        }
    };

    get isRetina() {
        return ('devicePixelRatio' in window && window.devicePixelRatio >= 1.5);
    };
    
    get isJSEnabled() {
        return !this.html.classList.contains('no-js') ? true : false;
    };

    get isTouchEnabled() { 
        return !!(( 'ontouchstart' in window ) ||  
            ( window.DocumentTouch && document instanceof window.DocumentTouch) ||
            ( navigator.maxTouchPoints > 0 ) || 
            ( navigator.msMaxTouchPoints > 0 )); 
    };

    tests() {
        if (!this.isJSEnabled) {
            this.html.classList.remove('no-js');
            this.html.classList.add('js');
        }

        if (this.isTouchEnabled) {
            this.html.classList.add('has-touch');
        }

        if (this.isRetina) {
            this.html.classList.add('is-retina');
        }

        if (this.isWebGLEnabled) {
            this.html.classList.add('has-webgl');
        }
    };
}