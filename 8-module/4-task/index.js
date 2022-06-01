import Modal from '../../7-module/2-task/index.js';
import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';


export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {

    if (!product) return;

    let existingCartItem = this.cartItems.find(obj => {
      return obj.product.id === product.id;
    })

    if (existingCartItem) {
      existingCartItem.count++;
      this.onProductUpdate(existingCartItem);
    } else {
      let newCartItem = {
        product: product,
        count: 1
      }

      this.cartItems.push(newCartItem);

      this.onProductUpdate(newCartItem);
    }

  }

  updateProductCount(productId, amount) {
    let existingCartItem = this.cartItems.find(cartItem => {
      return cartItem.product.id === productId;
    })

    if (existingCartItem) {
      existingCartItem.count += amount;

      if (existingCartItem.count === 0) {

        this.cartItems = this.cartItems.filter((ci) => {
          return ci.product.id !== existingCartItem.product.id
        });
      }

      this.onProductUpdate(existingCartItem);
    }
  }

  isEmpty() {
    return !Boolean(this.cartItems.length)
  }

  getTotalCount() {
    return this.cartItems.reduce(function (summ, cartItem) {
      return summ + cartItem.count;
    }, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(function (summ, cartItem) {
      return summ + cartItem.product.price * cartItem.count;
    }, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price*count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    this.modal.setBody(createElement(`
      <div>
      ${this.cartItems.map((ci) => {
        return this.renderProduct(ci.product, ci.count).outerHTML;
      }).join('')}
      
      ${this.renderOrderForm().outerHTML}
      </div>
      `));

    this.modal.open();

    this.modal.elem.querySelector('.cart-form').onsubmit = this.onSubmit.bind(this);
    this.modal.elem.querySelectorAll('.cart-counter__button_minus').forEach(m => {

      m.addEventListener('click', (e) => {
        let productId = e.currentTarget.closest('[data-product-id]').dataset.productId;
        this.updateProductCount(productId, -1);
      });
    });

    this.modal.elem.querySelectorAll('.cart-counter__button_plus').forEach(p => {
      p.addEventListener('click', (e) => {
        let productId = e.currentTarget.closest('[data-product-id]').dataset.productId;
        this.updateProductCount(productId, 1);
      });
    });
  }

  onProductUpdate(cartItem) {

    //проверяем открыто ли модальное окно
    if (document.body.classList.contains('is-modal-open')) {

     
      let modalBody = document.querySelector('.modal');
      let elem = modalBody.querySelector(`[data-product-id='${cartItem.product.id}']`);

      if (cartItem.count === 0) {
        //удаляем товар
        elem.parentNode.removeChild(elem);
      } else {
        // Элемент, который хранит количество товаров с таким productId в корзине
        let productCount = modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);

        productCount.innerText = cartItem.count;
        
        // Элемент с общей стоимостью всех единиц этого товара
        let productPrice = modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);
        productPrice.innerText = '€' + (cartItem.product.price * cartItem.count).toFixed(2);
      }

      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
      infoPrice.innerHTML = '€' + this.getTotalPrice().toFixed(2);
    }

    this.cartIcon.update(this);

     if (this.cartItems.length === 0) {
       this.modal.close();
       return;
     }
  }

  onSubmit(event) {

    event.preventDefault();

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(event.target)
    }).then(() => {
 
      this.modal.setTitle('Success!');
      this.cartItems = [];
      this.cartIcon.update(this);
      this.modal.setBody(createElement(`<div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
`))
    });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
