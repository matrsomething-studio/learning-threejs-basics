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
      orbitControls: 1,
      showGUI: false,
    });

    this.bindEvents();
  },

  bindEvents() {
    window.addEventListener('resize', () => {
      this.ThreeExp.resize();
    });

    
    document.querySelector('[data-btn="zoom"]').addEventListener('mouseout', (e) => {
      this.ThreeExp.testClick2();
    });

    document.querySelector('[data-btn="zoom"]').addEventListener('mouseover', (e) => {
      this.ThreeExp.testClick();
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

    document.querySelector('[data-btn="zoom"]').addEventListener('click', (e) => {
      e.preventDefault();
      this.ThreeExp.handleObjectsOnClick();
    });

    document.addEventListener('click', () => {
      this.ThreeExp.handleCardsOnClick();
    });
  },
};

// Load App
document.addEventListener('readystatechange', (e) => {
  if (e.target.readyState === 'complete') {
    App.init();
  }
});


// Import Highway
import Highway from '@dogstudio/highway';

// Fade
class Fade extends Highway.Transition {
  in({ from, to, done }) {
    // Reset Scroll
    window.scrollTo(0, 0);

    // Remove Old View
    from.remove();

    // Animation
    gsap.fromTo(to, 0.5,
      { opacity: 0 },
      {
        opacity: 1,
        onComplete: done
      }
    );
  }

  out({ from, done }) {
    // Animation
    gsap.fromTo(from, 0.5,
      { opacity: 1 },
      {
        opacity: 0,
        onComplete: done
      }
    );
  }
}


// Call Highway.Core once.
const H = new Highway.Core({
  transitions: {
    default: Fade
  }
});