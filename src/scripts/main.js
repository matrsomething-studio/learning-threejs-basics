// Style(s)
import '../styles/main.scss';


// Module(s)
import NoJSModule from './modules/NoJSModule';
import ThreeSceneModule from './modules/ThreeSceneModule';


// App
const App = (() => {
    let NoJS = null;
    let ThreeScene = null;
    let rafID = null;

    function raf() {
        ThreeScene.animate();
        rafID = requestAnimationFrame(raf);
    }

    function bindWindowEvents() {
        window.addEventListener('resize', (e) => {
            ThreeScene.resize();
        });
    }

    function createObjects() {
        NoJS = new NoJSModule();
        ThreeScene = new ThreeSceneModule({ sceneContainer: '#scene', orbitControls: true });
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
