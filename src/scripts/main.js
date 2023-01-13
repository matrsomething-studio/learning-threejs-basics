// Style(s)
import '../styles/main.scss';

// Components(s)
import SimpleModal from './components/SimpleModal';
import KnowJS from './components/KnowJS';
import ThreeExperience from './components/ThreeExperience';

// App
const App = (() => {
    let JSKnow = null;
    let DemoModal = null;
    let DemoExp = null;
    let playing = false;
    let rafID = null;

    function update() {
        DemoExp.update();
        rafID = requestAnimationFrame(update);
    }

    function play() {
        if (!playing) {
            update();
            playing = true;
        }
    }

    function stop() {
        if (playing) {
            cancelAnimationFrame(rafID);
            playing = false;
        }
    }

    function bind() {
        window.addEventListener('resize', (e) => {
            DemoExp.resize();
        });

        window.addEventListener('keydown', (e) =>{
            if (e.key === 'Escape') {
                DemoModal.close();
            }
        });

        window.addEventListener('mousemove', (e) =>{
            DemoExp.mouse = e;
            DemoExp.cursor.x = e.clientX / DemoExp.width - 0.5;
            DemoExp.cursor.y = e.clientY / DemoExp.height - 0.5;
        });

        window.addEventListener('wheel', (e) =>{
            DemoExp.wheel = e;
        });
    }

    function create() {
        JSKnow = new KnowJS();
        DemoModal = new SimpleModal({ domSelector: 'data-modal="MODAL-ID"', overflowHide: false });
        DemoExp = new ThreeExperience({ domSelector: '#scene', orbitControls: true, showGUI: true });
    }

    function init() {
        create();
        bind();
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
