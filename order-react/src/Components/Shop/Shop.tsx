import React, { useState, useEffect } from "react";
import { ListProducts } from "./ListProducts";
import { Cart } from "./Cart";
import { cartStore } from "../../store/cart.store";

export const Shop: React.FC = () => {
  const [cartState, setCartState] = useState(cartStore.initialState);

  useEffect(() => {
    cartStore.subscribe(setCartState);
    cartStore.init();
  }, []);

  return (
    <div className="col-lg-12">
      <h1>SHOP</h1>

      <div className="row">
        <ListProducts />
        <Cart cart={cartState.cart} totalCart={cartState.totalCart} />
      </div>
    </div>
  );
};
