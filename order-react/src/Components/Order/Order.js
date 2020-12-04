import React from "react";
import ListOrders from "./List/ListOrders";

function Order(props) {
  return (
    <div className="row">
      <ListOrders
        page={props.match.params.page || 1}
        key={window.location.pathname}
      />
    </div>
  );
}

export default Order;
