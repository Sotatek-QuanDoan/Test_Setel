import { EnumOrderStatus } from "../enum/order_status.enum";

export interface Order {
  userId: string;
  orderId: string;
  total: number;
  status: EnumOrderStatus;
  items: any[];
  createdAt: string;
}
