import React from "react";
import { Product } from '../../interface/product.interface';
import { cartStore } from '../../store/cart.store';

interface Props {
  item: Product,
}

export const CartItem:React.FC<Props> = (props) => {
  return (
    <tr>
      <td>
        <img src={props.item.image} className="img-fluid" alt={props.item.name} />
        <br />
        {props.item.name}
      </td>
      <td>{props.item.price}</td>
      <td>{props.item.quantity}</td>
      <td>
        <button
          className="btn btn-danger btn-xs"
          onClick={() => cartStore.removeFromCart(props.item.id)}
        >
          x
        </button>
      </td>
    </tr>
  );
}
