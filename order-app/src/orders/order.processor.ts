import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { OrdersService } from './orders.service';
import { EnumOrderStatus } from './enum/order_status.enum';
import { constants } from './constants';

const { ORDER_QUEUE } = constants;
@Processor(ORDER_QUEUE)
export class OrderProcessor {
  constructor(private readonly ordersService: OrdersService) {}

  @Process('orderDelivered')
  async orderDelivered(job: Job) {
    if (job.data && job.data.orderId) {
      this.ordersService.updateStatus({
        id: job.data.orderId,
        status: EnumOrderStatus.ORDER_DELIVERED,
      });
    }
  }
}
