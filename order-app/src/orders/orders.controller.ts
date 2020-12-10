import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Logger,
} from '@nestjs/common';
import { BodyOrderDto } from './dto/body-order.dto';
import { OrdersService } from './orders.service';
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
    this.logger.verbose(`Getting orders of userId: "${uid}".`);
    const orders = await this.ordersService.findAllByUser(uid, page);
    this.logger.verbose(
      `Return orders of userId: "${uid}", page: ${page}. \n data: ${orders.list}`,
    );
    return orders;
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Order> {
    this.logger.verbose(`Getting the order with orderId: "${id}".`);
    const order = await this.ordersService.findById(id);
    this.logger.verbose(`Return order "${id}". \n data: ${order}`);
    return order;
  }

  @Post()
  async create(@Body() body: BodyOrderDto): Promise<Order> {
    this.logger.verbose(
      `Creating a new order with data: ${JSON.stringify(body)}.`,
    );
    const order = await this.ordersService.create(body);
    this.logger.verbose(`Create new order successful. \n data: ${order}`);
    return order;
  }

  @Post(':id/cancel')
  async cancelOrder(@Param('id') id: string): Promise<Order> {
    this.logger.verbose(`Canceling an order with orderId: "${id}".`);
    const order = await this.ordersService.cancelOrder(id);
    this.logger.verbose(`Cancel order "${id}" successful. \n data: ${order}`);
    return order;
  }
}
