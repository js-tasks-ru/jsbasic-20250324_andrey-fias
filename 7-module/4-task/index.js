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
      stepsContainer.appendChild(step);
    }

    this.updateSlider(this.value);

    const stepsSpans = this.elem.querySelectorAll('.slider__steps span');
    if (stepsSpans.length > 0) {
      stepsSpans[0].classList.add('slider__step-active');
    }

    this.thumb = this.elem.querySelector('.slider__thumb');
    this.thumb.ondragstart = () => false;
  }

  initEventListeners() {
    this.elem.addEventListener('click', (event) => this.onClick(event));
    this.thumb.addEventListener('pointerdown', (event) => this.onPointerDown(event));
  }

  onClick(event) {
    const newValue = this.calculateValue(event.clientX);
    this.updateSlider(newValue);
    this.dispatchChangeEvent();
  }

  onPointerDown(event) {
    event.preventDefault();
    this.elem.classList.add('slider_dragging');

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerMove = (event) => {
    event.preventDefault();
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) leftRelative = 0;
    if (leftRelative > 1) leftRelative = 1;

    const leftPercents = leftRelative * 100;

    this.thumb.style.left = `${leftPercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${leftPercents}%`;

    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    const newValue = Math.round(approximateValue);

    this.updateSlider(newValue, false);
  }

  onPointerUp = (event) => {
    const newValue = this.calculateValue(event.clientX);
    this.updateSlider(newValue);
    this.dispatchChangeEvent();

    this.elem.classList.remove('slider_dragging');

    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);
  }

  calculateValue(clientX) {
    const left = clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) leftRelative = 0;
    if (leftRelative > 1) leftRelative = 1;

    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;

    return Math.round(approximateValue);
  }

  updateSlider(value, updateThumb = true) {
    if (this.value === value && updateThumb) return;

    this.value = value;

    const segments = this.steps - 1;
    const valuePercents = (this.value / segments) * 100;

    if (updateThumb) {
      this.thumb.style.left = `${valuePercents}%`;
      this.elem.querySelector('.slider__progress').style.width = `${valuePercents}%`;
    }

    this.elem.querySelector('.slider__value').textContent = this.value;

    const stepsSpans = this.elem.querySelectorAll('.slider__steps span');
    stepsSpans.forEach(span => span.classList.remove('slider__step-active'));
    if (stepsSpans[this.value]) {
      stepsSpans[this.value].classList.add('slider__step-active');
    }
  }

  dispatchChangeEvent() {
    const customEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(customEvent);
  }
}
