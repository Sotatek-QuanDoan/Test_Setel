import React from "react";
import { EnumOrderStatus } from '../../../enum/order_status.enum';

interface Props {
  status: string,
}

export const OrderStatus:React.FC<Props> = (props) => {
  let labelOrderStatus = <span></span>;
  switch (props.status) {
    case EnumOrderStatus.ORDER_CREATED:
      labelOrderStatus = (
        <span className="badge badge-info">{props.status}</span>
      );
      break;

    case EnumOrderStatus.ORDER_CONFIRMED:
      labelOrderStatus = (
        <span className="badge badge-warning">{props.status}</span>
      );
      break;

    case EnumOrderStatus.ORDER_DELIVERED:
      labelOrderStatus = (
        <span className="badge badge-success">{props.status}</span>
      );
      break;

    case EnumOrderStatus.ORDER_CANCELLED:
      labelOrderStatus = (
        <span className="badge badge-danger">{props.status}</span>
      );
      break;

    default:
      break;
  }

  return <span>{labelOrderStatus}</span>;
}
