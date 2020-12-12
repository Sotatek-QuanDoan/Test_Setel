import React from "react";
import { OrderStatus as Status } from '../../../enum/order.enum';

interface Props {
  status: string,
}

export const OrderStatus:React.FC<Props> = (props) => {
  let labelOrderStatus = <span></span>;
  switch (props.status) {
    case Status.CREATED:
      labelOrderStatus = (
        <span className="badge badge-info">{props.status}</span>
      );
      break;

    case Status.CONFIRMED:
      labelOrderStatus = (
        <span className="badge badge-warning">{props.status}</span>
      );
      break;

    case Status.DELIVERED:
      labelOrderStatus = (
        <span className="badge badge-success">{props.status}</span>
      );
      break;

    case Status.CANCELLED:
      labelOrderStatus = (
        <span className="badge badge-danger">{props.status}</span>
      );
      break;

    default:
      break;
  }

  return <span>{labelOrderStatus}</span>;
}
