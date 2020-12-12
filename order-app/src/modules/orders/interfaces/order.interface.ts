import { OrderStatus } from '../enum/order-status.enum';
import { Document } from 'mongoose';

export interface OrderItemDetail {
  id: string;
  quantity: number;
  image: string;
  price: number;
  name: string;
}

export interface Order {
  userId: string;
  orderId: string;
  total: number;
  status: OrderStatus;
  items: OrderItemDetail[];
}

export interface OrderDoc extends Order, Document {}
