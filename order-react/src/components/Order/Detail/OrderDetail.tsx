import React, { useEffect, useState } from "react";
import { getOrderDetail } from '../../../services/orders';
import { formatDate } from '../../../shared/helpers';
import { OrderStatus } from "../Common/OrderStatus";
import { ProductRow } from "./ProductRow";

interface Props {
  match: any
}

export const OrderDetail:React.FC<Props> = (props) => {
  const [order, setOrder] = useState({} as any);

  const orderId = props.match.params.id;

  useEffect(() => {
    if (orderId) {
      getOrderDetail(orderId).then((response) => {
        if (response.status === 200) {
          setOrder(response.data);
        }
      });
    }
  }, [orderId]);

  return (
    <div className="col-lg-12">
      <h1>ORDER DETAIL</h1>

      <div className="row">
        <div className="col-lg-6">
          <h4 className="float-left">Order #{order.orderId} &nbsp;</h4>
          <OrderStatus status={order.status} />
        </div>
        <div className="col-lg-6">
          <span>Created at: {formatDate(order.createdAt)}</span>
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
                <td colSpan={4} className="text-right">
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
