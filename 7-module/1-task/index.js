import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    this.initEventListeners();
  }

  render() {
    return createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
          ${this.categories.map(this.createCategory).join('')}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);
  }

  createCategory(category) {
    return `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`;
  }

  initEventListeners() {
    this.arrowLeft.addEventListener('click', () => this.scroll(-350));
    this.arrowRight.addEventListener('click', () => this.scroll(350));
    this.ribbonInner.addEventListener('scroll', () => this.updateArrowsVisibility());
    this.ribbonInner.addEventListener('click', (event) => this.onCategoryClick(event));
  }

  scroll(offset) {
    this.ribbonInner.scrollBy(offset, 0);
  }

  updateArrowsVisibility() {
    const scrollLeft = this.ribbonInner.scrollLeft;
    const scrollWidth = this.ribbonInner.scrollWidth;
    const clientWidth = this.ribbonInner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    this.arrowLeft.classList.toggle('ribbon__arrow_visible', scrollLeft > 0);
    this.arrowRight.classList.toggle('ribbon__arrow_visible', scrollRight >= 1);
  }

  onCategoryClick(event) {
    const item = event.target.closest('.ribbon__item');
    if (!item) return;

    event.preventDefault();

    const previousActive = this.ribbonInner.querySelector('.ribbon__item_active');
    if (previousActive) previousActive.classList.remove('ribbon__item_active');

    item.classList.add('ribbon__item_active');

    this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
      detail: item.dataset.id,
      bubbles: true
    }));
  }
}
