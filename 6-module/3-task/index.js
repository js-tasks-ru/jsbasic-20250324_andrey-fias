import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlide = 0;
    this.elem = this.render();
    this.initCarousel();
    this.addEventListeners();
  }

  render() {
    const slideItems = this.slides.map(slide => `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `).join('');

    const carouselTemplate = `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display: none">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${slideItems}
        </div>
      </div>
    `;

    return createElement(carouselTemplate);
  }

  initCarousel() {
    this.inner = this.elem.querySelector('.carousel__inner');
    this.arrowRight = this.elem.querySelector('.carousel__arrow_right');
    this.arrowLeft = this.elem.querySelector('.carousel__arrow_left');
  }

  addEventListeners() {
    this.arrowRight.addEventListener('click', () => this.moveSlide(1));
    this.arrowLeft.addEventListener('click', () => this.moveSlide(-1));
    this.elem.addEventListener('click', (event) => {
      const button = event.target.closest('.carousel__button');
      if (button) {
        const slide = event.target.closest('.carousel__slide');
        const productId = slide.dataset.id;
        this.elem.dispatchEvent(
          new CustomEvent('product-add', {
            detail: productId,
            bubbles: true,
          })
        );
      }
    });
  }

  moveSlide(direction) {
    const slideWidth = this.inner.offsetWidth;
    const maxIndex = this.slides.length - 1;
    this.currentSlide += direction;
    this.inner.style.transform = `translateX(-${this.currentSlide * slideWidth}px)`;
    this.arrowLeft.style.display = this.currentSlide === 0 ? 'none' : '';
    this.arrowRight.style.display = this.currentSlide === maxIndex ? 'none' : '';
  }
}

