// import { Document } from 'mongoose';
// import { EnumOrderStatus } from '../enum/order_status.enum';

// export interface Order extends Document {
//   readonly userId: string;
//   readonly orderId: string;
//   readonly total: number;
//   readonly status: EnumOrderStatus;
//   readonly items: any[];
// }

import { Order } from './order.interface';
import { ApiProperty } from '@nestjs/swagger';

export class OrderList {
  @ApiProperty({
    type: 'number',
    example: 2,
  })
  totalPage: number;

  @ApiProperty({
    type: [Order],
    example: [
      {
        status: 'cancelled',
        items: [
          {
            id: 1,
            name: 'IPhone 8',
            price: 500,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfaCbR8-6-5X4x8QNJ8hI8WedAzxsXNvPO2g&usqp=CAU',
            quantity: 1,
          },
        ],
        userId: 1,
        orderId: 'xS8U1YX3h',
        total: 500,
        createdAt: '2020-12-04T05:54:27.363Z',
      },
      {
        status: 'cancelled',
        items: [
          {
            id: 4,
            name: 'Galaxy Note 10',
            price: 700,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdHRHcBDC6tNSimHQhQGV-VtJjaVW3HfJ5pg&usqp=CAU',
            quantity: 1,
          },
          {
            id: 5,
            name: 'Galaxy Note 20',
            price: 1100,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaFMo3-KdjFLkanHnQkX-ko4HZrVLjF9wrRw&usqp=CAU',
            quantity: 1,
          },
        ],
        userId: 1,
        orderId: 'mXt5xZawG',
        total: 1800,
        createdAt: '2020-12-01T05:54:43.586Z',
      },
    ],
  })
  list: Order[];
}
