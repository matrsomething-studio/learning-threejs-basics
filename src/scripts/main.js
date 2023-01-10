// Style(s)
import '../styles/main.scss';

// Components(s)
import SimpleModalComponent from './components/SimpleModal';

// Module(s)
import NoJSModule from './modules/NoJSModule';
import ThreeSceneModule from './modules/ThreeSceneModule';

// App
const App = (() => {
    let NoJS = null;
    let SimpleModal = null;
    let ThreeScene = null;
    let isPlaying = false;
    let requestID = null;

    function raf() {
        ThreeScene.animate();
        requestID = requestAnimationFrame(raf);
    }

    function play() {
        if (!isPlaying) {
            raf();
            isPlaying = true;
        }
    }

    function stop() {
        if (isPlaying) {
            cancelAnimationFrame(requestID);
            isPlaying = false;
        }
    }

    function bindWindowEvents() {
        window.addEventListener('resize', (e) => {
            ThreeScene.resize();
        });

        window.addEventListener('keydown', function(e){
            if (e.key === 'Escape') {
                SimpleModal.close();
            }
        });

        window.addEventListener('mousemove', function(e){
            ThreeScene.setMouse(e.clientX, e.clientY);
        });
    }

    function createObjects() {
        NoJS = new NoJSModule();
        ThreeScene = new ThreeSceneModule({ dom: '#scene', orbitControls: true });
        SimpleModal = new SimpleModalComponent('data-modal="MODAL-ID"');
    }

    function init() {
        createObjects();
        bindWindowEvents();
        play();
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
