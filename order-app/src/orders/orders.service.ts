import { Model } from 'mongoose';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Order } from './interfaces/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { BodyUpdateOrderStatusDto } from './dto/update-order-status.dto';
import { BodyOrderDto } from './dto/body-order.dto';
import { constants } from './constants';
import { InjectModel } from '@nestjs/mongoose';
import 'dotenv';
import axios from 'axios';
import { generate } from 'shortid';
import { EnumOrderStatus } from './enum/order_status.enum';
import { products } from '../database-sample/products';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

const { ORDER_MODEL, ORDER_QUEUE } = constants;

@Injectable()
export class OrdersService {
  private logger = new Logger('OrderController');
  constructor(
    @InjectModel(ORDER_MODEL)
    private readonly orderModel: Model<any>,
    @InjectQueue(ORDER_QUEUE) private orderQueue: Queue,
  ) {}

  async create(body: BodyOrderDto): Promise<Order> {
    const { userId, order } = body;
    const orderItems = Object.values(order);
    const newOrderData: CreateOrderDto = {
      userId,
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
        throw new BadRequestException(`Item doesn't exists in list product.`);
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

    const newOrder = await this.orderModel.create(newOrderData);

    if (!newOrder) {
      this.logger.error('Failed to create new order. Insert order fail.');
      throw new InternalServerErrorException('Place order fail.');
    }

    // call payment confirm
    const responsePaymentConfirm: EnumOrderStatus = await this.confirmOrder(
      newOrder,
    );

    if (responsePaymentConfirm === EnumOrderStatus.ORDER_CONFIRMED) {
      const confirmedOrder = await this.updateStatus({
        id: newOrder.orderId,
        status: EnumOrderStatus.ORDER_CONFIRMED,
      });

      if (confirmedOrder.nModified === 1) {
        await this.orderQueue.add(
          'orderDelivered',
          {
            orderId: newOrder.orderId,
          },
          { delay: Math.random() * 30000 },
        );
      }
    } else {
      this.updateStatus({
        id: newOrder.orderId,
        status: EnumOrderStatus.ORDER_CANCELLED,
      });
    }

    return newOrder;
  }

  async cancelOrder(id: string) {
    const order = await this.findById(id);

    if (
      [
        EnumOrderStatus.ORDER_CANCELLED,
        EnumOrderStatus.ORDER_DELIVERED,
      ].indexOf(order.status) > -1
    ) {
      this.logger.error(
        `Failed to cancel order: "${id}. The order status: "${order.status}".`,
      );
      throw new InternalServerErrorException(
        `You can not cancel order cancelled or delivered.`,
      );
    }

    return this.orderModel.findOneAndUpdate(
      { orderId: id },
      { $set: { status: EnumOrderStatus.ORDER_CANCELLED } },
      { new: true },
    );
  }

  async updateStatus(body: BodyUpdateOrderStatusDto) {
    let query = { orderId: body.id };

    switch (body.status) {
      case EnumOrderStatus.ORDER_CONFIRMED:
        query['status'] = EnumOrderStatus.ORDER_CREATED;
        break;
      case EnumOrderStatus.ORDER_DELIVERED:
        query['status'] = EnumOrderStatus.ORDER_CONFIRMED;
        break;
      case EnumOrderStatus.ORDER_CANCELLED:
        query['$or'] = [
          { status: EnumOrderStatus.ORDER_CREATED },
          { status: EnumOrderStatus.ORDER_CONFIRMED },
        ];
        break;

      default:
        break;
    }

    return this.orderModel.updateOne(query, { $set: { status: body.status } });
  }

  async findAllByUser(
    uid: string,
    page: number,
  ): Promise<Record<string, unknown>> {
    const limit = 5;
    const skip: number = +page >= 1 ? (+page - 1) * limit : 0;

    const [count, list] = await Promise.all([
      this.orderModel.countDocuments({ userId: uid }),
      this.orderModel
        .find(
          { userId: uid },
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
    return this.orderModel.findOne({ orderId: id }).exec();
  }

  async confirmOrder(order: Order): Promise<EnumOrderStatus> {
    const response = await axios.post(
      `${process.env.PAYMENT_BASE_URL}/payment`,
      order,
    );

    return response.data;
  }
}
