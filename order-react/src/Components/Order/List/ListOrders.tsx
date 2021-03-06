import React, { useState, useEffect } from "react";
import axios from "axios";
import "dotenv";
import { OrderRow } from "./OrderRow";
import { Pagination } from "../Common/Pagination";
import { Order } from '../../../interface/order.interface';
import { orderStore } from '../../../store/order.store';

const { REACT_APP_ORDER_API_URL } = process.env;

interface Props {
  page: number
}

export const ListOrders:React.FC<Props> = (props) => {
  const [orderState, setOrderState] = useState(orderStore.initialState);

  useEffect(() => {
    orderStore.subscribe(setOrderState);
    orderStore.init();
  }, []);

  useEffect(() => {
    getOrders(props.page);
  }, [props.page]);

  function getOrders(page: number) {
    axios
      .get(`${REACT_APP_ORDER_API_URL}/orders/user/1`, { params: { page } })
      .then((response) => {
        // handle success
        if (response.status === 200) {
          orderStore.getOrders({
            orders: response.data.list,
            totalPage: response.data.totalPage,
            currentPage: page
          });
        }
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
          {orderState.orders.length > 0 &&
            orderState.orders.map((o: Order, i) => (
              <OrderRow
                order={o}
                key={i}
              />
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              <Pagination totalPage={orderState.totalPage} currentPage={props.page} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
