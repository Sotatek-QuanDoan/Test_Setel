import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import ProductRow from "./ProductRow";
import OrderStatus from "../Common/OrderStatus";
import "dotenv";

const { REACT_APP_ORDER_API_URL } = process.env;

function OrderDetail(props) {
  const [order, setOrder] = useState({});

  useEffect(() => {
    const id = props.match.params.id;

    axios
      .get(`${REACT_APP_ORDER_API_URL}/orders/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setOrder(response.data);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  });

  const createdAt = moment(order.createdAt).format("YYYY-MM-DD hh:mm:ss");

  return (
    <div className="col-lg-12">
      <h1>ORDER DETAIL</h1>

      <div className="row">
        <div className="col-lg-6">
          <h4 className="float-left">Order #{order.orderId} &nbsp;</h4>
          <OrderStatus status={order.status} />
        </div>
        <div className="col-lg-6">
          <span>Created at: {createdAt}</span>
        </div>
        <div className="col-lg-12">
          <table className="table table-striped table-inverse table-responsive">
            <thead className="thead-inverse">
              <tr>
                <th>Image</th>
                <th>Product name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items &&
                order.items.map((o, i) => <ProductRow item={o} key={i} />)}
              <tr>
                <td colSpan="4" className="text-right">
                  <b>Total</b>
                </td>
                <td>
                  <b>{order && order.total}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
