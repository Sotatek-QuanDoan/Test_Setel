import React from "react";

function OrderStatus(props) {
  let labelOrderStatus = "";
  switch (props.status) {
    case "created":
      labelOrderStatus = (
        <span className="badge badge-info">{props.status}</span>
      );
      break;

    case "confirmed":
      labelOrderStatus = (
        <span className="badge badge-warning">{props.status}</span>
      );
      break;

    case "delivered":
      labelOrderStatus = (
        <span className="badge badge-success">{props.status}</span>
      );
      break;

    case "cancelled":
      labelOrderStatus = (
        <span className="badge badge-danger">{props.status}</span>
      );
      break;

    default:
      break;
  }

  return <span>{labelOrderStatus}</span>;
}

export default OrderStatus;
