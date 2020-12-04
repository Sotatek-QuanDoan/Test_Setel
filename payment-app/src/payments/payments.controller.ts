import { Controller, Body, Post, Logger } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { PaymentsService } from './payments.service';

@Controller('payment')
export class PaymentsController {
  private logger = new Logger('PaymentController');
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  confirmOrder(@Body() body: OrderDto) {
    this.logger.verbose(`Confirm payment status of order "${body.orderId}"`);
    return this.paymentsService.confirmOrder(body);
  }
}
