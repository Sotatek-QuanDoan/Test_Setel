import { Schema } from 'mongoose';

export const orderSchema = new Schema(
  {
    userId: Number,
    orderId: { type: String, unique: true },
    status: { type: String, default: 'created' }, // created | confirmed | delivered | cancelled
    total: Number,
    items: [],
  },
  {
    timestamps: true,
  },
);
