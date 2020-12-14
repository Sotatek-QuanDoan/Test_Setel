import { Subject } from "rxjs";
import { Order } from "../interface/order.interface";
import { EnumOrderStatus } from "../enum/order_status.enum";

const subject = new Subject();

interface stateInterface {
  orders: Order[];
  totalPage: number;
  currentPage: number;
}

const initialState: stateInterface = {
  orders: [],
  totalPage: 1,
  currentPage: 1,
};

let state = initialState;

export const orderStore = {
  initialState,
  init: () => {
    subject.next(state);
  },
  subscribe: (setState) => subject.subscribe(setState),
  getOrders: (data) => {
    state = {
      orders: data.orders,
      totalPage: data.totalPage,
      currentPage: data.currentPage,
    };
    subject.next(state);
  },
  cancelOrder: (orderId) => {
    const newOrders = state.orders.map((o: Order) => {
      if (o.orderId === orderId) {
        o.status = EnumOrderStatus.ORDER_CANCELLED;
      }

      return o;
    });

    state = {
      orders: newOrders,
      totalPage: state.totalPage,
      currentPage: state.currentPage,
    };
    subject.next(state);
  },
};
