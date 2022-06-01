export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

    debugger

    if (existingCartItem) {
      existingCartItem.count += amount;

      if (existingCartItem.count === 0) {
        
        this.cartItems = this.cartItems.filter((ci) => {
          return ci.product.id !== existingCartItem.product.id
        });
      }

      debugger
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
