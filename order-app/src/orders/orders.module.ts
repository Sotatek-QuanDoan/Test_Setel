import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { orderSchema } from './schemas/order.schema';
import { BullModule } from '@nestjs/bull';
import { OrderProcessor } from './order.processor';
import { constants } from './constants';

const { ORDER_MODEL, ORDER_QUEUE } = constants;

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ORDER_MODEL, schema: orderSchema }]),
    BullModule.registerQueue({
      name: ORDER_QUEUE,
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderProcessor],
})
export class OrdersModule {}
