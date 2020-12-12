import React, { useState } from "react";
import { products } from "../../constants/products";
import { Product } from '../../interface/product.interface';
import * as orderService from '../../services/orders';
import CartItem from "./CartItem";
import ShopItem from "./ShopItem";

export const Shop:React.FC = () => {
  const [cart, setCart] = useState([] as any);
  const [totalCart, setTotalCart] = useState(0);

  function addToCart(id: string) {
    const findInProducts = products.find((p: Product) => p.id === id);
    if (!findInProducts) return;
    const findInCart = cart.find((p: Product) => p.id === id);

    let newCart: Product[] = [...cart];
    let newTotalCart: number = totalCart;

    if (findInCart) {
      newCart = cart.map((o: Product) => {
        if (o.id === id) return { ...o, quantity: ++o.quantity };
        return o;
      });

      newTotalCart = totalCart + findInProducts.price;
    } else {
      newCart = [...cart, { ...findInProducts, quantity: 1 }];
      newTotalCart = totalCart + findInProducts.price;
    }

    setCart(newCart);
    setTotalCart(newTotalCart);
  }

  function removeFromCart(id: string) {
    const findInProducts = products.find((p: Product) => p.id === id);
    if (!findInProducts) return;
    const findInCart = cart.find((p: Product) => p.id === id);

    if (findInCart) {
      let newCart = cart.filter((o: Product) => o.id !== id);
      let newTotalCart = totalCart - findInCart.quantity * findInCart.price;

      setCart(newCart);
      setTotalCart(newTotalCart);
    }
  }

  function placeOrder() {
    orderService.createOrder(cart)
      .then((response: any) => {
        if (response.status === 201) {
          alert("Place order success!");

          setCart([]);
          setTotalCart(0);
        }
      });
  }

  return (
    <div className="col-lg-12">
      <h1>SHOP</h1>

      <div className="row">
        <div className="col-lg-9">
          <h4>List products</h4>
          <div className="row">
            {products &&
              products.map((o: Product, i: number) => (
                <ShopItem item={o} key={i} addToCart={() => addToCart(o.id)} />
              ))}
          </div>
        </div>

        <div className="col-lg-3">
          <h4>Cart</h4>
          <div className="row">
            <table className="table table-striped table-inverse table-responsive">
              <thead className="thead-inverse">
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart &&
                  cart.map((o, i) => (
                    <CartItem
                      item={o}
                      key={i}
                      removeFromCart={() => removeFromCart(o.id)}
                    />
                  ))}
              </tbody>
            </table>

            <div>
              <div>Total: {totalCart}</div>
              <button className="btn btn-primary" onClick={() => placeOrder()}>
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
