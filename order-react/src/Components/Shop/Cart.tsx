import React from "react";
import CartItem from "./CartItem";
import { Product } from '../../interface/product.interface';

interface Props {
  cart: Product[],
  totalCart: number,
  removeFromCart: any
}

const Cart:React.FC<Props> = (props) => {
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
              props.cart.map((o: Product, i: number) => (
                <CartItem
                  item={o}
                  key={i}
                  removeFromCart={() => props.removeFromCart(o.id)}
                />
              ))}
          </tbody>
        </table>

        <div>
          <div>Total: {props.totalCart}</div>
          <button className="btn btn-primary">Place order</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
