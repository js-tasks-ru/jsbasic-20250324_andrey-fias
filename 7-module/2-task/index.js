import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.handleEscape);
  }

  setTitle(title) {
    const titleElem = this.elem.querySelector('.modal__title');
    titleElem.textContent = title;
  }

  setBody(node) {
    const bodyElem = this.elem.querySelector('.modal__body');
    bodyElem.innerHTML = ''; // Очищаем содержимое
    bodyElem.append(node);
  }

  addEventListeners() {
    const closeButton = this.elem.querySelector('.modal__close');
    closeButton.addEventListener('click', () => this.close());
    this.handleEscape = (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    };

    document.addEventListener('keydown', this.handleEscape);
  }
}
