import React from "react";
import "./ProductRow.css";
import { Product } from '../../../interface/product.interface';

interface Props {
  item: Product
}

export const ProductRow:React.FC<Props> = (props) => {
  return (
    <tr className="order-product">
      <td>
        <img src={props.item.image} alt={props.item.name} />
      </td>
      <td>{props.item.name}</td>
      <td>{props.item.price}</td>
      <td>{props.item.quantity}</td>
      <td>{props.item.price * props.item.quantity}</td>
    </tr>
  );
}
