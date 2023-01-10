// Usage
/*
<a data-modal="MODAL-ID" href="#" target="_blank">Learn More/a>

<div class="modal modal-full-viewport" id="MODAL-ID" role="dialog" tabindex="-1">
    <button class="modal-close" data-modal-close="" aria-label="Close"></button>
    <div class="modal-content">
    </div>
</div>
*/


// Util(s)

// Class - SimpleModal
export default class SimpleModal {
    constructor(el) {
        this.HTML = document.querySelector('html');
        this.modalCTA = document.querySelector(`[${el}]`);
        this.modal = document.getElementById(this.modalCTA.dataset.modal);
        this.modalCloseBtn = this._modal.querySelector('[data-modal-close]');
        this.isModalOpen = false;

        this.bindEvents();
    }

    openModal() {
        this.modal.classList.add('modal-open');
        this.HTML.style.overflow = 'hidden';
        this.isModalOpen = true;
    }

    closeModal() {
        this.modal.classList.remove('modal-open');
        this.html.style.overflow = 'auto';
        this.isModalOpen = false;
    }

    bindEvents() {
        this.modalCTA.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal();
        });

        this.modalCloseBtn.addEventListener('click', () => {
            this.closeModal();
        });
    }
}