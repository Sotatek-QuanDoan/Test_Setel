import React, { useState, useEffect } from "react";
import axios from "axios";
import "dotenv";
import {OrderRow} from "./OrderRow";
import {Pagination} from "../Common/Pagination";
import { Order } from '../../../interface/order.interface';
import { EnumOrderStatus } from "../../../enum/order_status.enum";

const { REACT_APP_ORDER_API_URL } = process.env;

interface Props {
  page: number
}

export const ListOrders:React.FC<Props> = (props) => {
  const [orders, setOrders] = useState([] as any);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentpage] = useState(+props.page || 1);

  useEffect(() => {
    getOrders(currentPage);
  }, [currentPage]);

  function cancelOrder(id: string) {
    axios
      .post(`${REACT_APP_ORDER_API_URL}/orders/${id}/cancel`, {})
      .then((response) => {
        if (
          response.data.orderId === id &&
          response.data.status === EnumOrderStatus.ORDER_CANCELLED
        ) {
          const orderRefresh: Order[] = orders.map((o: Order) => {
            if (o.orderId === id) {
              o.status = EnumOrderStatus.ORDER_CANCELLED;
            }

            return o;
          });

          setOrders(orderRefresh);
        }
      });
  }

  function getOrders(page: number) {
    axios
      .get(`${REACT_APP_ORDER_API_URL}/orders/user/1`, { params: { page } })
      .then((response) => {
        // handle success
        if (response.status === 200) {
          setOrders(response.data.list);
          setTotalPage(response.data.totalPage);
          setCurrentpage(page);
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
            <td colSpan={5}>
              <Pagination totalPage={totalPage} currentPage={currentPage} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
