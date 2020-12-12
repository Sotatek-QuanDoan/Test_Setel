import { Injectable } from '@nestjs/common';
import {
  ConfirmOrderDto,
  ConfirmOrderResponseDto,
} from './dto/confirm-order.dto';

@Injectable()
export class PaymentsService {
  async confirmOrder(order: ConfirmOrderDto): Promise<ConfirmOrderResponseDto> {
    // Process order logic here

    // Mockup random result
    return {
      isSucceeded: Math.random() > 0.5,
    };
  }
}
