// Class - SimpleModal
export default class SimpleModal {
    constructor(options) {
        this.options = options;
        this.html = document.querySelector('html');
        this.openBtn = document.querySelector(`[${this.options.domSelector}]`);
        this.modal = document.getElementById(this.openBtn.dataset.modal);
        this.closeBtn = this.modal.querySelector('[data-modal-close]');
        this.isOpen = false;

        this.bind();
    }

    open() {        
        this.modal.classList.add('modal-open');
        this.isOpen = true;

        if (this.options.overflowHide) {
            this.html.style.overflow = 'hidden';
        }
    }

    close() {
        this.modal.classList.remove('modal-open');
        this.isOpen = false;

        if (this.options.overflowHide) {
            this.html.style.overflow = 'auto';
        }
    }

    bind() {
        this.openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.open();
        });

        this.closeBtn.addEventListener('click', () => {
            this.close();
        });
    }
}