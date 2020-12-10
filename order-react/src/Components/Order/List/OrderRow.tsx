import React from "react";
import {BtnViewOrder} from "./BtnViewOrder";
import {BtnCancelOrder} from "./BtnCancelOrder";
import {OrderStatus} from "../Common/OrderStatus";
import moment from "moment";
import { Order } from '../../../interface/order.interface';

interface Props {
  order: Order,
  cancel: any
}

export const OrderRow:React.FC<Props> = (props) => {
  const createdAt = moment(props.order.createdAt).format("YYYY-MM-DD hh:mm:ss");

  return (
    <tr>
      <td>{createdAt}</td>
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
