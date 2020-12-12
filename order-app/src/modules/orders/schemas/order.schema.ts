import { Schema } from 'mongoose';
import { OrderStatus } from '../enum/order-status.enum';

export const orderItemSchema = new Schema(
  {
    id: String,
    quantity: Number,
    image: String,
    price: Number,
    name: String,
  },
  {
    _id: false,
  },
);

export const orderSchema = new Schema(
  {
    userId: String,
    orderId: { type: String, unique: true },
    status: { type: String, default: OrderStatus.CREATED },
    total: Number,
    items: [orderItemSchema],
  },
  {
    timestamps: true,
  },
);
