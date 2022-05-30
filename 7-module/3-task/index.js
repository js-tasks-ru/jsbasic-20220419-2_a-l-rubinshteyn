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

    this._sliderContainer.querySelector('.slider__thumb').style.left = leftPercents;
    this._sliderContainer.querySelector('.slider__progress').style.width = leftPercents;
    this._sliderContainer.querySelector('.slider__value').innerText = value;

    this._sliderContainer.addEventListener('click', function (e) {
      //let itemWidth = this.offsetWidth / steps;
      let left = e.clientX - this.getBoundingClientRect().left
      let leftRelative = left / this.offsetWidth;
      let segments = steps - 1;
      let approximateValue = leftRelative * segments;

      let number = Math.round(approximateValue);

      document.querySelectorAll('.slider__steps>span').forEach((span) => {
        span.classList.remove('slider__step-active');
      })

      document.querySelectorAll('.slider__steps>span')[number].classList.add('slider__step-active');

      document.querySelector('.slider__value').innerText = number;

      let leftPercents = `${number / segments * 100}%`;

      document.querySelector('.slider__thumb').style.left = leftPercents;
      document.querySelector('.slider__progress').style.width = leftPercents;

      let event = new CustomEvent('slider-change', {
        detail: number,
        bubbles: true
      });

      this.dispatchEvent(event);

    });
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
