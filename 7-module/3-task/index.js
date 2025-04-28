export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.render();
    this.initEventListeners();
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.className = 'slider';
    this.elem.innerHTML = `
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: 0%;"></div>
      <div class="slider__steps"></div>
    `;

    const stepsContainer = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement('span');
      if (i === this.value) {
        step.classList.add('slider__step-active');
      }
      stepsContainer.appendChild(step);
    }
  }

  initEventListeners() {
    this.elem.addEventListener('click', (event) => this.onClick(event));
  }

  onClick(event) {
    const sliderRect = this.elem.getBoundingClientRect();
    const clickX = event.clientX - sliderRect.left;
    const relativeClickX = clickX / this.elem.offsetWidth;

    const segments = this.steps - 1;
    const approximateValue = relativeClickX * segments;
    const newValue = Math.round(approximateValue);

    this.updateSlider(newValue);
    this.dispatchChangeEvent();
  }

  updateSlider(value) {
    this.value = value;

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const valueSpan = this.elem.querySelector('.slider__value');

    const segments = this.steps - 1;
    const valuePercents = (value / segments) * 100;

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    valueSpan.textContent = value;

    const stepsSpans = this.elem.querySelectorAll('.slider__steps span');
    stepsSpans.forEach(span => span.classList.remove('slider__step-active'));
    stepsSpans[value].classList.add('slider__step-active');
  }

  dispatchChangeEvent() {
    const customEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(customEvent);
  }
}
