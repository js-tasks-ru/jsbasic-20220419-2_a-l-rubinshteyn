import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {
        once: true
      });

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (!this.elem.offsetWidth && !this.elem.offsetHeight)
      //элемент не виден
      return;

    if (window.scrollY > this.elem.offsetTop && document.documentElement.clientWidth > 767) {
      //если элемент начал скрываться перемещаем его
      this.elem.style.position = 'fixed';
      this.elem.style.top = '50px';

      let containerRect = document.querySelector('.container').getBoundingClientRect();
  
      if ((this.elem.offsetWidth + 20 + 10) > (document.documentElement.clientWidth - containerRect.right)) {
        this.elem.style.left = (document.documentElement.clientWidth - this.elem.offsetWidth - 10) + 'px';
        this.elem.style.zIndex = 999;
      } else {
        this.elem.style.left = (containerRect.right + 20) + 'px';
      }

    }


  }
}
