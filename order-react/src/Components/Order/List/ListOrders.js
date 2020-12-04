import React, { useState, useEffect } from "react";
import axios from "axios";
import "dotenv";
import OrderRow from "./OrderRow";
import Pagination from "../Common/Pagination";

const { REACT_APP_ORDER_API_URL } = process.env;

function ListOrders(props) {
  const [orders, setOrders] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentpage] = useState(+props.page || 1);

  useEffect(() => {
    getOrders(currentPage);
  }, []);

  function cancelOrder(id) {
    axios
      .post(`${REACT_APP_ORDER_API_URL}/orders/${id}/cancel`, {})
      .then((response) => {
        if (
          response.status === 201 &&
          response.data === "Cancel order success."
        ) {
          const orderRefresh = orders.map((o) => {
            if (o.orderId === id) {
              o.status = "cancelled";
            }

            return o;
          });

          setOrders(orderRefresh);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getOrders(page) {
    axios
      .get(`${REACT_APP_ORDER_API_URL}/orders/user/1`, { params: { page } })
      .then((response) => {
        // handle success
        if (response.status === 200) {
          setOrders(response.data.list);
          setTotalPage(response.data.totalPage);
          setCurrentpage(page);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  return (
    <div className="col-lg-12">
      <h1>ORDER LIST</h1>
      <table className="table table-striped table-inverse table-responsive">
        <thead className="thead-inverse">
          <tr>
            <th>Time</th>
            <th>Order ID</th>
            <th>Total value</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((o, i) => (
              <OrderRow
                order={o}
                key={i}
                cancel={() => cancelOrder(o.orderId)}
              />
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5">
              <Pagination totalPage={totalPage} currentPage={currentPage} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ListOrders;
