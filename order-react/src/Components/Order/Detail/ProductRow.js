import React from "react";
import "./ProductRow.css";

function ProductRow(props) {
  return (
    <tr className="order-product">
      <td>
        <img src={props.item.image} />
      </td>
      <td>{props.item.name}</td>
      <td>{props.item.price}</td>
      <td>{props.item.quantity}</td>
      <td>{props.item.price * props.item.quantity}</td>
    </tr>
  );
}

export default ProductRow;
