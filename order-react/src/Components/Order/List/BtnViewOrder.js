import React from "react";
import { Link } from "react-router-dom";

function btnViewOrder(props) {
  return (
    <Link to={props.od_link}>
      <button className="btn btn-small btn-info">
        <i className="fa fa-eye" aria-hidden="true"></i> View
      </button>
    </Link>
  );
}

export default btnViewOrder;
