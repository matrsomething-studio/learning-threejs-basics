// Style(s)
import '../styles/main.scss';

// Components(s)
import KnowJS from './components/KnowJS';
import ThreeExperience from './components/ThreeExperience';

// App - https://prettier.io/
const App = (() => {
    let JSKnow = null;
    let CardExp = null;

    function bindEvents() {
        window.addEventListener('resize', (e) => {
            CardExp.resize();
        });

        window.addEventListener('mousemove', (e) => {
            CardExp.mouse = e;
            CardExp.setCursor();
        });

        window.addEventListener('wheel', (e) => {
            CardExp.wheel = e;
            CardExp.setScroll();
        });
    }

    function init() {
        JSKnow = new KnowJS();
        CardExp = new ThreeExperience({
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
