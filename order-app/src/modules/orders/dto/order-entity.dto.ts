import { OrderStatus } from '../enum/order-status.enum';
import { Order, OrderItemDetail } from '../interfaces/order.interface';

export class OrderItemDetailDto implements OrderItemDetail {
  id: string;
  quantity: number;
  image: string;
  price: number;
  name: string;
}

export class OrderEntityDto implements Order {
  userId: string;
  orderId: string;
  total: number;
  status: OrderStatus;
  items: OrderItemDetailDto[];
}
