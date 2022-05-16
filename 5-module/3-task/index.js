function initCarousel() {
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let arrowRight = document.querySelector('.carousel__arrow_right');
  
  //при открытии страницына первом слайде скрываем левую стрелку
  arrowLeft.style.display = 'none';

  arrowLeft.addEventListener('click', function () {
    translateSlider('left', arrowLeft, arrowRight);
  });

  arrowRight.addEventListener('click', function () {
    translateSlider('right', arrowLeft, arrowRight);
  });
}

function translateSlider(direction, arrowLeft, arrowRight) {
  let slidesCount = document.querySelectorAll('.carousel__slide').length;
  let currentSlide = document.querySelector('.container').dataset.carouselHolder;

  direction === 'right' ? currentSlide++ : currentSlide--;

  switch (currentSlide) {
    case 0:
      arrowLeft.style.display = 'none';
      break;
    case slidesCount - 1:
      arrowRight.style.display = 'none';
      break;
    default:
      arrowRight.style.display = arrowLeft.style.display = '';
      break;
  }

  let offset = (-1) * currentSlide * document.querySelector('.carousel__slide').offsetWidth;
  document.querySelector('.carousel__inner').style.transform = 'translateX(' + offset + 'px)';

  document.querySelector('.container').dataset.carouselHolder = currentSlide;

}
