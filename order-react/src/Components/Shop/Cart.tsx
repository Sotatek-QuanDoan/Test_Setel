import React from "react";
import { CartItem } from "./CartItem";
import { CartIF } from '../../interface/cart.interface';
import { cartStore } from '../../store/cart.store';
import "dotenv";
import axios from 'axios';

const { REACT_APP_ORDER_API_URL } = process.env;

function placeOrder(order) {
  axios
    .post(`${REACT_APP_ORDER_API_URL}/orders`, {
      userId: '1',
      order,
    })
    .then((response: any) => {
      if (response.status === 201) {
        alert("Place order success!");

        cartStore.clearCart();
      }
    });
}

export const Cart:React.FC<CartIF> = (props) => {
  return (
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
            {props.cart &&
              props.cart.map((o, i) => (
                <CartItem
                  item={o}
                  key={i}
                />
              ))}
          </tbody>
        </table>

        <div>
          <div>Total: {props.totalCart}</div>
          <button className="btn btn-primary" onClick={() => placeOrder(props.cart)}>
            Place order
          </button>
        </div>
      </div>
    </div>
  );
}