import { Schema } from 'mongoose';
import { EnumOrderStatus } from '../enum/order_status.enum';

export const orderSchema = new Schema(
  {
    userId: String,
    orderId: { type: String, unique: true },
    status: { type: String, default: EnumOrderStatus.ORDER_CREATED },
    total: Number,
    items: [],
  },
  {
    timestamps: true,
  },
);
