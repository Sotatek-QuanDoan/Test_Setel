import React, { useState } from "react";
import products from "../../database-sample/products";
import ShopItem from "./ShopItem";
import axios from "axios";
import CartItem from "./CartItem";
import "dotenv";

const { REACT_APP_ORDER_API_URL } = process.env;

function Shop() {
  const [cart, setCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);

  function addToCart(id) {
    const findInProducts = products.find((p) => p.id === id);
    if (!findInProducts) return;
    const findInCart = cart.find((p) => p.id === id);

    let newCart = [...cart];
    let newTotalCart = totalCart;

    if (findInCart) {
      newCart = cart.map((o) => {
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

  function removeFromCart(id) {
    const findInProducts = products.find((p) => p.id === id);
    if (!findInProducts) return;
    const findInCart = cart.find((p) => p.id === id);

    if (findInCart) {
      let newCart = cart.filter((o) => o.id !== id);
      let newTotalCart = totalCart - findInCart.quantity * findInCart.price;

      setCart(newCart);
      setTotalCart(newTotalCart);
    }
  }

  function placeOrder() {
    axios
      .post(`${REACT_APP_ORDER_API_URL}/orders`, {
        order: cart,
      })
      .then((response) => {
        if (response.status === 201) {
          alert("Place order success!");

          setCart([]);
          setTotalCart(0);
        }
      })
      .catch(function (error) {
        console.log(error);
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
              products.map((o, i) => (
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

export default Shop;
