import { OrderStatus } from "../enum/order.enum";

export interface Order {
  userId: string;
  orderId: string;
  total: number;
  status: OrderStatus;
  items: any[];
  createdAt: string;
}
