import { Subject } from "rxjs";
import { products } from "../database-sample/products";
import { Product } from "../interface/product.interface";
import { CartIF } from "../interface/cart.interface";

const subject = new Subject(); // observer & observable

const initialState: CartIF = {
  cart: [],
  totalCart: 0,
};

let state = initialState;

export const cartStore = {
  initialState,
  init: () => {
    subject.next(state);
  },
  subscribe: (setState) => subject.subscribe(setState),
  addToCart: (id) => {
    const findInProducts = products.find((p: Product) => p.id === id);
    if (!findInProducts) return;
    const findInCart = state.cart.find((p: Product) => p.id === id);

    let newCart: Product[] = [...state.cart];
    let newTotalCart: number = state.totalCart;

    if (findInCart) {
      newCart = state.cart.map((o: Product) => {
        if (o.id === id) return { ...o, quantity: ++o.quantity };
        return o;
      });

      newTotalCart = state.totalCart + findInProducts.price;
    } else {
      newCart = [...state.cart, { ...findInProducts, quantity: 1 }];
      newTotalCart = state.totalCart + findInProducts.price;
    }

    state = {
      cart: newCart,
      totalCart: newTotalCart,
    };

    subject.next(state);
  },
  removeFromCart: (id) => {
    const findInProducts = products.find((p: Product) => p.id === id);
    if (!findInProducts) return;
    const findInCart = state.cart.find((p: Product) => p.id === id);

    if (findInCart) {
      const newCart = state.cart.filter((o: Product) => o.id !== id);
      const newTotalCart =
        state.totalCart - findInCart.quantity * findInCart.price;

      state = {
        cart: newCart,
        totalCart: newTotalCart,
      };

      subject.next(state);
    }
  },
  clearCart: () => {
    state = {
      cart: [],
      totalCart: 0,
    };

    subject.next(state);
  },
};
