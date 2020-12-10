// import { Document } from 'mongoose';
// import { EnumOrderStatus } from '../enum/order_status.enum';

// export interface Order extends Document {
//   readonly userId: string;
//   readonly orderId: string;
//   readonly total: number;
//   readonly status: EnumOrderStatus;
//   readonly items: any[];
// }

import { EnumOrderStatus } from '../enum/order_status.enum';

export interface Order {
  userId: string;
  orderId: string;
  total: number;
  status: EnumOrderStatus;
  items: any[];
}
