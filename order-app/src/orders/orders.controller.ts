import 'dotenv';

import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { BodyOrderDto } from './dto/body-order.dto';
import products from './database-sample/products';
import { OrdersService } from './orders.service';
import { generate } from 'shortid';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './interfaces/order.interface';

@Controller('orders')
export class OrdersController {
  private logger = new Logger('OrderController');
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/user/:uid')
  async findAllByUser(
    @Param('uid') uid: string,
    @Query('page') page: number,
  ): Promise<Record<string, unknown>> {
    this.logger.verbose(`Getting orders of userId: ${uid}`);
    let totalPage = 0;
    const limit = 5;
    const skip: number = +page >= 1 ? (+page - 1) * limit : 0;

    const [count, list] = await Promise.all([
      this.ordersService.countAllByUser(uid),
      this.ordersService.findAllByUser(uid, skip, limit),
    ]);

    totalPage = Math.ceil(count / limit);

    return {
      totalPage,
      list,
    };
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Order> {
    this.logger.verbose(`Getting the order with orderId: ${id}`);
    return this.ordersService.findById(id);
  }

  @Post()
  async create(@Body() body: BodyOrderDto): Promise<Order> {
    this.logger.verbose(
      `Creating a new order with data: ${JSON.stringify(body)}`,
    );
    const { order } = body;
    const orderItems = Object.values(order);
    const newOrderData: CreateOrderDto = {
      userId: 1,
      orderId: generate(),
      items: [],
      total: 0,
    };

    if (orderItems.length === 0) {
      this.logger.error('Failed to create new order. Empty input data.');
      throw new InternalServerErrorException(`Input data invalid.`);
    }

    orderItems.map((o) => {
      const findInPoducts = products.find((p) => p.id === o.id);
      const findInOrderInput = newOrderData.items.find((p) => p.id === o.id);

      if (findInOrderInput) {
        this.logger.error(
          'Failed to create new order. Duplicate item in cart.',
        );
        throw new InternalServerErrorException(`Input data invalid.`);
      }

      if (!findInPoducts) {
        this.logger.error(
          `Failed to create new order. Item doesn't exists in list product.`,
        );
        throw new BadRequestException();
      }

      if (o.quantity > findInPoducts.quantity) {
        this.logger.error(
          `Failed to create new order. ${findInPoducts.name} temporary out of stock.`,
        );
        throw new InternalServerErrorException(
          `${findInPoducts.name} temporary out of stock.`,
        );
      }

      newOrderData.items.push({
        ...findInPoducts,
        quantity: o.quantity,
      });

      newOrderData.total += o.quantity * findInPoducts.price;
    });

    // Update products stock

    // Save order
    const newOrder = await this.ordersService.create(newOrderData);

    // console.log(` ---------- newOrder ---------- `);
    // console.log(newOrder);
    // console.log(` ---------- newOrder ---------- `);

    if (!newOrder) {
      this.logger.error('Failed to create new order. Insert order fail.');
      throw new InternalServerErrorException('Place order fail.');
    }

    // call payment confirm
    const responsePaymentConfirm = await this.ordersService.confirmOrder(
      newOrder,
    );

    if (responsePaymentConfirm === 'confirmed') {
      const confirmedOrder = await this.ordersService.updateStatus({
        id: newOrder.orderId,
        status: 'confirmed',
      });

      if (confirmedOrder.nModified === 1) {
        setTimeout(() => {
          this.ordersService.updateStatus({
            id: newOrder.orderId,
            status: 'delivered',
          });
        }, (1 + Math.random()) * 10000);
      }
    } else {
      this.ordersService.updateStatus({
        id: newOrder.orderId,
        status: 'cancelled',
      });
    }

    return newOrder;
  }

  @Post(':id/cancel')
  async cancelOrder(@Param('id') id: string): Promise<string> {
    try {
      this.logger.verbose(`Canceling an order with orderId: ${id}`);
      const updateOrderStatus = await this.ordersService.updateStatus({
        id,
        status: 'cancelled',
      });

      if (updateOrderStatus.nModified !== 1) {
        throw new InternalServerErrorException();
      }

      return 'Cancel order success.';
    } catch (error) {
      this.logger.error(`Failed to cancel order "${id}". Error: `, error);
    }
  }
}
