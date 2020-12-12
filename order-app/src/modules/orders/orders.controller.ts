import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { ListOrderDto } from './dto/list-order.dto';
import { OrderEntityDto } from './dto/order-entity.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('')
  async findAllByUser(
    @Query('uid') uid: string,
    @Query('page') page: number,
  ): Promise<ListOrderDto> {
    return this.ordersService.findAllByUser(uid, page);
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<OrderEntityDto> {
    return this.ordersService.findById(id);
  }

  @Post()
  async create(@Body() body: CreateOrderDto): Promise<OrderEntityDto> {
    return this.ordersService.createOrder(body);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  async cancel(@Param('id') id: string): Promise<OrderEntityDto> {
    return this.ordersService.cancelOrder(id);
  }
}
