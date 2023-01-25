// Style(s)
import '../styles/main.scss';

// Components(s)
import KnowJS from './components/KnowJS';
import ThreeExperience from './components/ThreeExperience';

// App - https://prettier.io/
const App = (() => {
    let JSKnow = null;
    let DemoModal = null;
    let DemoExp = null;

    function bindEvents() {
        window.addEventListener('resize', (e) => {
            DemoExp.resize();
        });

        window.addEventListener('mousemove', (e) => {
            DemoExp.mouse = e;
            DemoExp.cursor.x = e.clientX / DemoExp.width - 0.5;
            DemoExp.cursor.y = e.clientY / DemoExp.height - 0.5;
        });

        window.addEventListener('wheel', (e) => {
            DemoExp.wheel = e;
            DemoExp.setScroll();
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // DemoModal.close();
                DemoExp.sizeCards();
            }
        });
    }

    function init() {
        JSKnow = new KnowJS();
        DemoExp = new ThreeExperience({
            domSelector: '#scene',
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
