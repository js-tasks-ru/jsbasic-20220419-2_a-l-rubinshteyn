import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {

  _container;

  get elem() {
    return this._container;
  }

  constructor(categories) {
    this.categories = categories;

    this._container = createElement(`
     <div class="ribbon">
    <!--Кнопка прокрутки влево-->
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <!--Ссылки на категории-->
    <nav class="ribbon__inner">
    ${categories.map(category => `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`).join('') }
    </nav>

    <!--Кнопка прокрутки вправо-->
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible" >
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
    `);

    //скрываем кнопку налево вначале
    this._container.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
    
    //вешаем события скрола на стрелки
    this._initHandlers();
  }


  _initHandlers() {
    this._container.querySelector('.ribbon__arrow_left').addEventListener('click', function () {
      document.querySelector('.ribbon__inner').scrollBy(-350, 0);
    });

    this._container.querySelector('.ribbon__arrow_right').addEventListener('click', function () {
      document.querySelector('.ribbon__inner').scrollBy(350, 0);
    });

    this._container.querySelector('.ribbon__inner').addEventListener('scroll', function () {
      let arrowLeft = document.querySelector('.ribbon__arrow_left');
      let arrowRight = document.querySelector('.ribbon__arrow_right');


      let ribbonInner = document.querySelector('.ribbon__inner');
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;

      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      if (this.scrollLeft < 1) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      } else if (scrollRight < 1) {
        arrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        arrowLeft.classList.add('ribbon__arrow_visible');
        arrowRight.classList.add('ribbon__arrow_visible');
      }
    });

    this.value = '';
    this._container.querySelector('.ribbon__item').classList.add('ribbon__item_active');

    this._container.querySelectorAll('.ribbon__item').forEach(i => i.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelectorAll('.ribbon__item').forEach(function (i) {
        i.classList.remove('ribbon__item_active');
      });

      e.target.classList.add('ribbon__item_active');

      let ribbonSelectEvent = new CustomEvent('ribbon-select', {
        detail: e.target.dataset.id,
        bubbles: true
      })

      e.target.dispatchEvent(ribbonSelectEvent);

    }));;

  }
}
