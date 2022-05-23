import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {

  _cardContainer;
  _addEvent;

  constructor(product) {

    this._cardContainer = new createElement(`
      <div class="card">
        <div class="card__top">
            <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
            <span class="card__price">€${product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
            <div class="card__title">${product.name}</div>
            <button type="button" class="card__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>
      </div>
    `);

    this._addEvent = new CustomEvent("product-add", { // имя события должно быть именно "product-add"
      detail: product.id, // Уникальный идентификатора товара из объекта товара
      bubbles: true // это событие всплывает - это понадобится в дальнейшем
    });


    let button = this._cardContainer.querySelector('.card__button');
    button.addEventListener('click', () => {
      button.dispatchEvent(this._addEvent)
    });

  }

  get elem() {
    return this._cardContainer;
  }
}
