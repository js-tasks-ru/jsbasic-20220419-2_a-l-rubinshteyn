import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {

  _sliderContainer;
  _steps;

  get elem() {
    return this._sliderContainer;
  }

  constructor({
    steps,
    value = 0
  }) {

    this.value = value;
    this._steps = steps;
    this._sliderContainer = createElement(`
  
      <div class="slider">

        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb" style="left: 50%;">
          <span class="slider__value">2</span>
        </div>

        <!--Заполненная часть слайдера-->
        <div class="slider__progress" style="width: 50%;"></div>

        <!--Шаги слайдера-->
        <div class="slider__steps">
        
        ${this._getSpanList(value)}
        
        </div>
      </div>
    `);

    let segments = steps - 1;
    let leftPercents = `${value / segments * 100}%`;

    this.elem.querySelector('.slider__thumb').style.left = leftPercents;
    this.elem.querySelector('.slider__progress').style.width = leftPercents;
    this.elem.querySelector('.slider__value').innerText = value;

    this.elem.addEventListener('click', this._moveThumb);

    let thumb = this.elem.querySelector('.slider__thumb');

    thumb.addEventListener('pointerdown', function (event) {
      event.preventDefault();

      const slider = document.querySelector('.slider');
      slider.classList.add('slider_dragging');

      let shiftX = event.clientX - thumb.getBoundingClientRect().left;

      document.addEventListener('pointermove', onMouseMove);
      document.addEventListener('pointerup', onMouseUp);

      function onMouseMove(event) {

        const slider = document.querySelector('.slider');
        let left = event.clientX - slider.getBoundingClientRect().left;
        let leftRelative = left / slider.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }

        let leftPercents = leftRelative * 100;
        thumb.style.left = leftPercents + '%';
        this.querySelector('.slider__progress').style.width = leftPercents + '%';

        let segments = this.querySelectorAll('.slider__steps span').length - 1;
        let approximateValue = leftRelative * segments;

        let number = Math.round(approximateValue);
        document.querySelectorAll('.slider__steps>span').forEach((span) => {
          span.classList.remove('slider__step-active');
        })

        document.querySelectorAll('.slider__steps>span')[number].classList.add('slider__step-active');

        document.querySelector('.slider__value').innerText = number;
      }

      function onMouseUp() {
        const slider = document.querySelector('.slider');
        slider.classList.remove('slider_dragging');

        let event = new CustomEvent('slider-change', {
          detail: +document.querySelector('.slider__value').innerText,
          bubbles: true
        });

        slider.dispatchEvent(event);

        document.removeEventListener('pointerup', onMouseUp);
        document.removeEventListener('pointermove', onMouseMove);
      }
    });


    thumb.ondragstart = () => false;
  }

  _moveThumb(e) {

    let left = e.clientX - this.getBoundingClientRect().left
    let leftRelative = left / this.offsetWidth;
    let segments = this.querySelectorAll('.slider__steps span').length - 1;
    let approximateValue = leftRelative * segments;

    let number = Math.round(approximateValue);

    this.querySelectorAll('.slider__steps>span').forEach((span) => {
      span.classList.remove('slider__step-active');
    })

    this.querySelectorAll('.slider__steps>span')[number].classList.add('slider__step-active');

    this.querySelector('.slider__value').innerText = number;

    let leftPercents = `${number / segments * 100}%`;

    this.querySelector('.slider__thumb').style.left = leftPercents;
    this.querySelector('.slider__progress').style.width = leftPercents;

    let event = new CustomEvent('slider-change', {
      detail: number,
      bubbles: true
    });

    this.dispatchEvent(event);
  }

  _moveAction() {

  }

  _getSpanList(value) {
    let spanList = '';
    for (let i = 0; i < this._steps; i++) {
      if (i === value) {
        spanList += '<span class="slider__step-active"></span>\n';
      } else {
        spanList += '<span></span>\n';
      }
    }
    return spanList;
  }
}
