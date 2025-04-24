function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const inner = carousel.querySelector('.carousel__inner');
  const slides = inner.children;
  const arrowLeft = carousel.querySelector('.carousel__arrow_left');
  const arrowRight = carousel.querySelector('.carousel__arrow_right');

  let currentIndex = 0;

  function update() {
    const slideWidth = inner.offsetWidth;
    inner.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

    arrowLeft.style.display = currentIndex === 0 ? 'none' : '';
    arrowRight.style.display =
      currentIndex === slides.length - 1 ? 'none' : '';
  }

  arrowLeft.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      update();
    }
  });

  arrowRight.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      update();
    }
  });

  update();
}
