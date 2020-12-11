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
import { OrderList } from './interfaces/order_list.interface';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  private logger = new Logger('OrderController');
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/user/:uid')
  @ApiOperation({ summary: 'Get all orders by user id' })
  @ApiResponse({
    status: 200,
    description: 'Multi document has been successfully returned.',
    type: OrderList,
  })
  async findAllByUser(
    @Param('uid') uid: string,
    @Query('page') page: number,
  ): Promise<OrderList> {
    this.logger.verbose(`Getting orders of userId: "${uid}".`);
    const orders = await this.ordersService.findAllByUser(uid, page);
    this.logger.verbose(
      `Return orders of userId: "${uid}", page: ${page}. response: \n ${orders}`,
    );
    return orders;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by id' })
  @ApiResponse({
    status: 200,
    description: 'A document has been successfully returned.',
    type: Order,
  })
  async find(@Param('id') id: string): Promise<Order> {
    this.logger.verbose(`Getting the order with orderId: "${id}".`);
    const order = await this.ordersService.findById(id);
    this.logger.verbose(`Return order "${id}". response: \n ${order}`);
    return order;
  }

  @Post()
  @ApiOperation({ summary: 'Create new an order' })
  @ApiResponse({
    status: 201,
    description: 'The document has been successfully created.',
    type: Order,
  })
  async create(@Body() body: BodyOrderDto): Promise<Order> {
    this.logger.verbose(
      `Creating a new order with input: \n ${JSON.stringify(body)}.`,
    );
    const order = await this.ordersService.create(body);
    this.logger.verbose(`Create new order successful. response: \n ${order}`);
    return order;
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel an order by id' })
  @ApiResponse({
    status: 201,
    description: 'The document has been successfully cancelled.',
    type: Order,
  })
  async cancelOrder(@Param('id') id: string): Promise<Order> {
    this.logger.verbose(`Canceling an order with orderId: "${id}".`);
    const order = await this.ordersService.cancelOrder(id);
    this.logger.verbose(
      `Cancel order "${id}" successful. response: \n ${order}`,
    );
    return order;
  }
}
