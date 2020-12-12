import { InjectQueue } from '@nestjs/bull';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import { generate } from 'shortid';
import { config } from '../../shared/config';
import { JobName, ModelName, QueueName } from '../../shared/constants';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ListOrderDto } from './dto/list-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from './enum/order-status.enum';
import { Order, OrderDoc } from './interfaces/order.interface';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(ModelName.ORDER) private readonly orderModel: Model<OrderDoc>,
    @InjectQueue(QueueName.ORDER) private orderQueue: Queue,
    private readonly productsService: ProductsService,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const { userId, order: orderItems } = dto;

    const products = await this.productsService.getProducts(orderItems);

    const newOrder = await this.orderModel.create({
      userId,
      orderId: generate(),
      items: products,
      status: OrderStatus.CREATED,
      total: products.reduce((sum, p) => (sum += p.quantity * p.price), 0),
    } as Order);

    if (!newOrder) {
      throw new InternalServerErrorException('Create order failed');
    }

    await this.processOrder(newOrder);

    return newOrder;
  }

  async processOrder(order: Order) {
    const responsePaymentConfirm = await this.confirmOrder(order);

    if (responsePaymentConfirm?.isSucceeded) {
      const confirmedOrder = await this.updateOrderStatus({
        id: order.orderId,
        status: OrderStatus.CONFIRMED,
      });

      if (confirmedOrder.nModified === 1) {
        await this.orderQueue.add(
          JobName.ORDER_DELIVERED,
          {
            orderId: order.orderId,
          },
          { delay: Math.random() * 30000 },
        );
      }
    } else {
      this.updateOrderStatus({
        id: order.orderId,
        status: OrderStatus.CANCELLED,
      });
    }
  }

  async confirmOrder(order: Order): Promise<{ isSucceeded: boolean }> {
    const response = await axios.post(
      `${config.microservices.payment.baseUrl}/payment`,
      order,
    );

    return response.data;
  }

  async cancelOrder(id: string) {
    const order = await this.findById(id);
    if (order.status === OrderStatus.DELIVERED) {
      throw new ConflictException('Can not cancel order delivered');
    }
    return this.orderModel.findOneAndUpdate(
      { orderId: id },
      { $set: { status: OrderStatus.CANCELLED } },
      { new: true },
    );
  }

  async updateOrderStatus(dto: UpdateOrderStatusDto) {
    return this.orderModel.updateOne(
      { orderId: dto.id },
      { $set: { status: dto.status } },
    );
  }

  async findAllByUser(userId: string, page: number): Promise<ListOrderDto> {
    const limit = 5;
    const skip: number = +page >= 1 ? (+page - 1) * limit : 0;

    const [count, list] = await Promise.all([
      this.orderModel.countDocuments({ userId }),
      this.orderModel
        .find(
          { userId },
          { _id: 0, updatedAt: 0, __v: 0 },
          { skip, limit, sort: { _id: -1 } },
        )
        .exec(),
    ]);

    const totalPage = Math.ceil(count / limit);

    return {
      totalPage,
      list,
    };
  }

  async findById(id: string): Promise<Order> {
    const order = await this.orderModel.findOne({ orderId: id }).exec();
    if (!order) {
      throw new NotFoundException(`Order id '${id}' not found`);
    }
    return order;
  }
}
