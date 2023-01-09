// Style(s)
import '../styles/main.scss';


// Module(s)
import NoJS from './modules/NoJS';
import ScrollableTextGallery from './modules/ScrollableTextGallery';


// Main
const APP = (() => {
    let NO_JS = null;
    let SCROLLING_TEXT_GALLERY = null;
    let RAFID = null;

    function raf() {
        SCROLLING_TEXT_GALLERY.animate();
        RAFID = requestAnimationFrame(raf);
    }

    function bindWindowEvents() {
        window.addEventListener('resize', (e) => {
            SCROLLING_TEXT_GALLERY.resize();
        });
    }

    function init() {
        NO_JS = new NoJS();
        SCROLLING_TEXT_GALLERY = new ScrollableTextGallery({ sceneContainer: '#scene' });
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
