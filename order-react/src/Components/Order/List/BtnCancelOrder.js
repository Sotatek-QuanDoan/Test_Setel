import React from "react";

function btnCancelOrder(props) {
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

  if (["cancelled"].indexOf(props.status) > -1) {
    buttonCancel = <div></div>;
  }

  return buttonCancel;
}

export default btnCancelOrder;
