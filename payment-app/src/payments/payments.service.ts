import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { EnumOrderStatus } from './enum/order_status.enum';

@Injectable()
export class PaymentsService {
  async confirmOrder(order: OrderDto): Promise<EnumOrderStatus> {
    // Process order logic here

    // Mockup random result
    const status: EnumOrderStatus[] = [
      EnumOrderStatus.ORDER_DECLINED,
      EnumOrderStatus.ORDER_CONFIRMED,
    ];
    const index: number = Math.trunc(Math.random() * 2);

    return status[index];
  }
}
