import React from "react";

function CartItem(props) {
  return (
    <tr>
      <td>
        <img src={props.item.image} className="img-fluid" alt="" />
        <br />
        {props.item.name}
      </td>
      <td>{props.item.price}</td>
      <td>{props.item.quantity}</td>
      <td>
        <button
          className="btn btn-danger btn-xs"
          onClick={() => props.removeFromCart()}
        >
          x
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
