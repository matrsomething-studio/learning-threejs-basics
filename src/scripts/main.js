// Style(s)
import '../styles/main.scss';


// Module(s)
import NoJS from './modules/NoJS';
import THREEJS_SCENE_MODULE from './modules/THREEJS_SCENE_MODULE';


// Main
const APP = (() => {
    let NO_JS = null;
    let THREEJS_SCENE_NAME = null;
    let RAFID = null;

    function raf() {
        THREEJS_SCENE_NAME.animate();
        RAFID = requestAnimationFrame(raf);
    }

    function bindWindowEvents() {
        window.addEventListener('resize', (e) => {
            THREEJS_SCENE_NAME.resize();
        });
    }

    function init() {
        NO_JS = new NoJS();
        THREEJS_SCENE_NAME = new THREEJS_SCENE_MODULE({ sceneContainer: '#scene', orbitControls: true });
        bindWindowEvents();
        requestAnimationFrame(raf);
    }
    
    return {
        init: init
    };
})();


// Load App
document.addEventListener('readystatechange', e => {
    if (e.target.readyState === 'complete') {
        APP.init();
    }
});
