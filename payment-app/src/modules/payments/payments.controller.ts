import {
  Controller,
  Body,
  Post,
  Logger,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ConfirmOrderDto,
  ConfirmOrderResponseDto,
} from './dto/confirm-order.dto';
import { PaymentsService } from './payments.service';

@Controller('payment')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  confirmOrder(
    @Body() body: ConfirmOrderDto,
  ): Promise<ConfirmOrderResponseDto> {
    return this.paymentsService.confirmOrder(body);
  }
}
