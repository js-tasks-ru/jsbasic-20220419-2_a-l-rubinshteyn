import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });

    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
  }

  async render() {


    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);



    //получаем товары
    this.products = await fetch('products.json').then((r) => r.json());
    //fltering products
    this.productsGrid = new ProductsGrid(this.products);


    console.log(`noNuts: ${document.getElementById('nuts-checkbox').checked}`);
    console.log(`vegeterian-checkbox: ${document.getElementById('vegeterian-checkbox').checked}`);
    console.log(`maxSpiciness: ${this.stepSlider.value}`);
    console.log(`category: ${this.ribbonMenu.value}`);


    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.querySelector('[data-products-grid-holder]').innerHTML = '';
    document.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem);


    this.subscribeEvents();

    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  subscribeEvents() {
   
    document.body.addEventListener('product-add', (customEvent) => {
      this.cart.addProduct(this.products.find(p => p.id == customEvent.detail));
    });

    document.body.addEventListener('slider-change', (customEvent) => {

      this.productsGrid.updateFilter({
        maxSpiciness: customEvent.detail // значение остроты из события 'slider-change'
      });

    });

    document.body.addEventListener('ribbon-select', (customEvent) => {

      this.productsGrid.updateFilter({
        category: customEvent.detail // значение остроты из события 'slider-change'
      });
    });

    document.getElementById('nuts-checkbox').addEventListener('change', () => {
      this.productsGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked // новое значение чекбокса
      });
    });

    document.getElementById('vegeterian-checkbox').addEventListener('change', () => {
      this.productsGrid.updateFilter({
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked // новое значение чекбокса
      });
    });



  }
}
