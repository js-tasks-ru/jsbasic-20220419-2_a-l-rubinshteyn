import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this._renderContainer();
    this._renderProducts(this.products);

  }

  _renderContainer() {
    this.elem = createElement(`
            <div class="products-grid">
          <div class="products-grid__inner">
          </div>
        </div>
       `);
  }

  _renderProducts(products) {
    this.elem.querySelector('.products-grid__inner').innerHTML = '';

    for (const product of products) {
      let productCard = new ProductCard(product);
      this.elem.querySelector('.products-grid__inner').append(productCard.elem);
    }
  }

  updateFilter(filters) {
    this.filters = Object.assign(this.filters, filters);
    let filteredProducts = Object.assign([], this.products);


    let i = 0;
    for (const prop in this.filters) {
      i++;
      if (Object.hasOwnProperty.call(this.filters, prop)) {
        const value = this.filters[prop];
        switch (prop) {
          case 'noNuts':
            filteredProducts = filteredProducts.filter((p) => {
              return !value ? true : p.nuts !== value;
            });
            break;
          case 'vegeterianOnly':
            filteredProducts = filteredProducts.filter((p) => {
              return !value ? true : p.vegeterian === value;
            });
            break;
          case 'maxSpiciness':
            filteredProducts = filteredProducts.filter((p) => {
              return p.spiciness <= value;
            });
            break;
          case 'category':
            filteredProducts = filteredProducts.filter((p) => {
              return !value ? true : p.category === value;
            });
            break;

          default:
            break;
        }
      }
    }

    this._renderProducts(filteredProducts);


  }


}
