import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class PaymentsService {
  async confirmOrder(order: OrderDto): Promise<string> {
    // Process order logic here
    console.log(order);

    // Mockup random result
    let status = ['declined', 'confirmed'];
    const index = Math.trunc(Math.random() * 2);

    return status[index];
  }
}
