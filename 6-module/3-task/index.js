import createElement from '../../assets/lib/create-element.js';

export default class Carousel {


  _carouselContainer;


  constructor(slides) {

    this._carouselContainer = createElement(`
      <div class="carousel">
        <!--Кнопки переключения-->
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
        </div>
       </div>
    `);


    slides.forEach(slide => {
      let slideObject = createElement(`
    <div class="carousel__slide" data-id="penang-shrimp">
      <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slide.price.toFixed(2)}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
`);
      
      let addBasket = new CustomEvent("product-add", { // имя события должно быть именно "product-add"
        detail: slide.id, // Уникальный идентификатора товара из объекта слайда
        bubbles: true // это событие всплывает - это понадобится в дальнейшем
      });

      slideObject.addEventListener('click', () => {
        slideObject.dispatchEvent(addBasket);
      });
      
      this._carouselContainer.querySelector('.carousel__inner').append(slideObject);
    });


    this.initCarousel();
  }

  initCarousel() {
    let arrowLeft = this._carouselContainer.querySelector('.carousel__arrow_left');
    let arrowRight = this._carouselContainer.querySelector('.carousel__arrow_right');

    //при открытии страницына первом слайде скрываем левую стрелку
    arrowLeft.style.display = 'none';

    arrowLeft.addEventListener('click', () => {
      this.translateSlider('left', arrowLeft, arrowRight);
    });

    arrowRight.addEventListener('click', ()=> {
      this.translateSlider('right', arrowLeft, arrowRight);
    });
  }

  currentSlide = 0;

  translateSlider(direction, arrowLeft, arrowRight) {
    let slidesCount = this._carouselContainer.querySelectorAll('.carousel__slide').length;
    
    direction === 'right' ? this.currentSlide++ : this.currentSlide--;

    switch (this.currentSlide) {
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

    let offset = (-1) * this.currentSlide * document.querySelector('.carousel__slide').offsetWidth;
    this._carouselContainer.querySelector('.carousel__inner').style.transform = 'translateX(' + offset + 'px)';

  }

  get elem() {
    return this._carouselContainer;
  }
}
