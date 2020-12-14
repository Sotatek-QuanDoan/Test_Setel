import React from "react";
import { EnumOrderStatus } from '../../../enum/order_status.enum';

interface Props {
  id: string,
  status: EnumOrderStatus,
  cancel: any
}

export const BtnCancelOrder:React.FC<Props> = (props) => {
  let buttonCancel = (
    <button
      className="btn btn-small btn-danger"
      onClick={() => {
        if (window.confirm("Are you sure cancel the order?")) {
          props.cancel();
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
