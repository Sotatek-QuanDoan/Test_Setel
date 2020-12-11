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
import { OrderItem } from './order_item.interface';
import { ApiProperty } from '@nestjs/swagger';
export class Order {
  @ApiProperty({
    type: 'string',
    example: '1',
  })
  userId: string;

  @ApiProperty({
    type: 'string',
    example: 'a_short_id',
  })
  orderId: string;

  @ApiProperty({
    type: 'number',
    example: 1200,
  })
  total: number;

  @ApiProperty({
    type: 'string',
    example: EnumOrderStatus.ORDER_CREATED,
  })
  status: EnumOrderStatus;

  @ApiProperty({
    type: 'date',
    example: '2020-12-11T08:40:29.610Z',
  })
  createdAt: string;

  @ApiProperty({
    type: [OrderItem],
    example: [
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
  })
  items: OrderItem[];
}
