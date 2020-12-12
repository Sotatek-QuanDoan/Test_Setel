import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QueueName } from '../../shared/constants';
import { ProductsModule } from '../products/products.module';
import { OrderProcessor } from './order.processor';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { orderSchema } from './schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: orderSchema }]),
    BullModule.registerQueue({
      name: QueueName.ORDER,
    }),
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderProcessor],
})
export class OrdersModule {}
