import React from "react";
import { EnumOrderStatus } from '../../../enum/order_status.enum';
import axios from 'axios';
import "dotenv";
import { orderStore } from '../../../store/order.store';

const { REACT_APP_ORDER_API_URL } = process.env;

interface Props {
  id: string,
  status: EnumOrderStatus,
}

function cancelOrder(id: string) {
  axios
    .post(`${REACT_APP_ORDER_API_URL}/orders/${id}/cancel`, {})
    .then((response) => {
      if (
        response.data.orderId === id &&
        response.data.status === EnumOrderStatus.ORDER_CANCELLED
      ) {
        orderStore.cancelOrder(response.data.orderId);
      }
    });
}

export const BtnCancelOrder:React.FC<Props> = (props) => {
  let buttonCancel = (
    <button
      className="btn btn-small btn-danger"
      onClick={() => {
        if (window.confirm("Are you sure cancel the order?")) {
          // props.cancel();
          cancelOrder(props.id);
        }
      }}
    >
      <i className="fa fa-close" aria-hidden="true"></i> Cancel
    </button>
  );

  if ([EnumOrderStatus.ORDER_CANCELLED, EnumOrderStatus.ORDER_DELIVERED].indexOf(props.status) > -1) {
    buttonCancel = <div></div>;
  }

  return buttonCancel;
}
