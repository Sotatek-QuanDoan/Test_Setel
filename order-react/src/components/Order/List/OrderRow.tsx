import React from "react";
import { Order } from '../../../interface/order.interface';
import { formatDate } from "../../../shared/helpers";
import { OrderStatus } from "../Common/OrderStatus";
import { BtnCancelOrder } from "./BtnCancelOrder";
import { BtnViewOrder } from "./BtnViewOrder";

interface Props {
  order: Order,
  cancel: any
}

export const OrderRow:React.FC<Props> = (props) => {
  return (
    <tr>
      <td>{formatDate(props.order.createdAt)}</td>
      <td>{props.order.orderId}</td>
      <td>{props.order.total}</td>
      <td>
        <OrderStatus status={props.order.status} />
      </td>
      <td>
        <BtnViewOrder od_link={`/order/details/${props.order.orderId}`} />
        <BtnCancelOrder
          id={props.order.orderId}
          status={props.order.status}
          cancel={() => props.cancel()}
        />
      </td>
    </tr>
  );
}
