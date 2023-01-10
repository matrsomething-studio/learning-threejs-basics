// Style(s)
import '../styles/main.scss';


// Module(s)
import NoJSModule from './modules/NoJSModule';
import ThreeJJSceneModule from './modules/ThreeJJSceneModule';


// Main
const App = (() => {
    let NoJS = null;
    let ThreeJSScene = null;
    let rafID = null;

    function raf() {
        ThreeJSScene.animate();
        rafID = requestAnimationFrame(raf);
    }

    function bindWindowEvents() {
        window.addEventListener('resize', (e) => {
            ThreeJSScene.resize();
        });
    }

    function createObjects() {
        NoJS = new NoJSModule();
        ThreeJSScene = new ThreeJJSceneModule({ sceneContainer: '#scene', orbitControls: true });
    }

    function init() {
        createObjects();
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
        App.init();
    }
});
