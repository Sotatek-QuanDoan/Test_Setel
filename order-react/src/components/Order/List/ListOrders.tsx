import React, { useEffect, useState } from "react";
import { OrderStatus } from "../../../enum/order.enum";
import { Order } from '../../../interface/order.interface';
import * as orderService from '../../../services/orders';
import { Pagination } from "../Common/Pagination";
import { OrderRow } from "./OrderRow";

interface Props {
  page: number
}

export const ListOrders:React.FC<Props> = (props) => {
  const [orders, setOrders] = useState([] as any);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(+props.page || 1);

  useEffect(() => {
    getOrders(currentPage);
  }, [currentPage]);

  function cancelOrder(id: string) {
    orderService.cancelOrder(id)
      .then((response) => {
        if (
          response.data.orderId === id &&
          response.data.status === OrderStatus.CANCELLED
        ) {
          const orderRefresh: Order[] = orders.map((o: Order) => {
            if (o.orderId === id) {
              o.status = OrderStatus.CANCELLED;
            }

            return o;
          });

          setOrders(orderRefresh);
        }
      }).catch(err=>{
        console.log(err);
        alert('Cancel order failed')
      });
  }

  function getOrders(page: number) {
    orderService.getOrders(page)
      .then((response) => {
        if (response.status === 200) {
          setOrders(response.data.list);
          setTotalPage(response.data.totalPage);
          setCurrentPage(page);
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
