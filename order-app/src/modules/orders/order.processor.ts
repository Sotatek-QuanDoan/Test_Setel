import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { OrdersService } from './orders.service';
import { OrderStatus } from './enum/order-status.enum';
import { ProcessorName, JobName } from '../../shared/constants';
import { logger } from '../../shared/logger';

@Processor(ProcessorName.ORDER)
export class OrderProcessor {
  constructor(private readonly ordersService: OrdersService) {}

  @Process(JobName.ORDER_DELIVERED)
  async orderDelivered(job: Job) {
    logger.info(job?.data, `Process job ${JobName.ORDER_DELIVERED}`);

    if (job.data && job.data.orderId) {
      this.ordersService.updateOrderStatus({
        id: job.data.orderId,
        status: OrderStatus.DELIVERED,
      });
    }
  }
}
