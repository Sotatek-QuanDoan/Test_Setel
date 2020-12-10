import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { orderSchema } from './schemas/order.schema';
import { BullModule } from '@nestjs/bull';
import { OrderProcessor } from './order.processor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: orderSchema }]),
    BullModule.registerQueue({
      name: 'order',
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderProcessor],
})
export class OrdersModule {}
