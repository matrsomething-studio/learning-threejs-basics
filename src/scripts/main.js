// Import styles
import '../styles/main.scss';

// Import components
import KnowJS from './components/KnowJS';
import ThreeExperience from './components/ThreeExperience';

// Define App
const App = {
  JSKnow: null,
  ThreeExp: null,

  init() {
    this.JSKnow = new KnowJS();
    this.ThreeExp = new ThreeExperience({
      domSelector: '#webgl',
      orbitControls: false
    });

    this.bindEvents();
  },

  bindEvents() {
    const zoomBtn = document.querySelector('[data-btn="zoom"]');

    zoomBtn.addEventListener('mouseover', (e) => {
      this.ThreeExp.testMouseIn();
    });

    zoomBtn.addEventListener('mouseout', (e) => {
      this.ThreeExp.testMouseOut();
    });

    zoomBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.ThreeExp.handleObjectsOnClick();
    });

    window.addEventListener('resize', () => {
      this.ThreeExp.resize();
    });

    window.addEventListener('mousemove', (e) => {
      this.ThreeExp.mouse.evt = e;
      this.ThreeExp.setCursor();
    });

    window.addEventListener('mousedown', () => {
      this.ThreeExp.mouse.isDown = true;
    });

    window.addEventListener('mouseup', () => {
      this.ThreeExp.mouse.isDown = false;
    });

    window.addEventListener('wheel', (e) => {
      this.ThreeExp.wheel.evt = e;
      this.ThreeExp.setScroll();
      this.ThreeExp.setSpeed();
    });

    document.addEventListener('click', () => {
      this.ThreeExp.handleCardsOnClick();
    });
  }
};

// Load App
document.addEventListener('readystatechange', (e) => {
  if (e.target.readyState === 'complete') {
    App.init();
  }
});