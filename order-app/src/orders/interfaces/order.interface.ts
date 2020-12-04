import { Document } from 'mongoose';

export interface Order extends Document {
  readonly userId: string;
  readonly orderId: string;
  readonly total: number;
  readonly status: string;
  readonly items: any[];
}
