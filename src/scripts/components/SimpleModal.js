// Util(s)

// Class - SimpleModal
export default class SimpleModal {
    constructor(selector) {
        this.html = document.querySelector('html');
        this.openBtn = document.querySelector(`[${selector}]`);
        this.modal = document.getElementById(this.openBtn.dataset.modal);
        this.closeBtn = this.modal.querySelector('[data-modal-close]');
        this.isOpen = false;

        this.bindEvents();
    }

    open() {
        this.html.style.overflow = 'hidden';
        this.modal.classList.add('modal-open');
        this.isOpen = true;
    }

    close() {
        this.html.style.overflow = 'auto';
        this.modal.classList.remove('modal-open');
        this.isOpen = false;
    }

    bindEvents() {
        this.openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.open();
        });

        this.closeBtn.addEventListener('click', () => {
            this.close();
        });
    }
}