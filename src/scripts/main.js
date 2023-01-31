// Style(s)
import '../styles/main.scss';

// Components(s)
import KnowJS from './components/KnowJS';
import ThreeExperience from './components/ThreeExperience';

// App - https://prettier.io/
const App = (() => {
    let JSKnow = null;
    let ThreeExp = null;

    function bindEvents() {
        window.addEventListener('resize', (e) => {
            ThreeExp.resize();
        });

        window.addEventListener('mousemove', (e) => {
            ThreeExp.mouse.evt = e;
            ThreeExp.setCursor();
        });
        
        window.addEventListener('mousedown', (e) => {
            ThreeExp.mouse.isDown = true;  
        });

        window.addEventListener('mouseup', (e) => {
            ThreeExp.mouse.isDown = false;
        });

        window.addEventListener('wheel', (e) => {
            ThreeExp.wheel.evt = e;
            ThreeExp.setScroll();  
        });
    }

    function init() {
        JSKnow = new KnowJS();
        ThreeExp = new ThreeExperience({
            domSelector: '#webgl',
            orbitControls: false,
            showGUI: false
        });

        bindEvents();
    }

    return {
        init: init,
    };
})();

// Load App
document.addEventListener('readystatechange', (e) => {
    if (e.target.readyState === 'complete') {
        App.init();
    }
});
