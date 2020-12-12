import React from "react";
import {ListOrders} from "./List/ListOrders";

interface Props {
  match: any
}

export const Order:React.FC<Props> = (props) => {
  return (
    <div className="row">
      <ListOrders
        page={props.match.params.page || 1}
        key={window.location.pathname}
      />
    </div>
  );
}
