import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Order } from './interfaces/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { BodyUpdateOrderStatusDto } from './dto/update-order-status.dto';
import constants from './constants';
import { InjectModel } from '@nestjs/mongoose';
import 'dotenv';
import axios from 'axios';

const { ORDER_MODEL } = constants;

@Injectable()
export class OrdersService {
  private logger = new Logger('OrderController');
  constructor(
    @InjectModel(ORDER_MODEL)
    private readonly orderModel: Model<Order>,
  ) {}

  async create(body: CreateOrderDto): Promise<Order> {
    return this.orderModel.create(body);
  }

  async updateStatus(body: BodyUpdateOrderStatusDto) {
    return this.orderModel.updateOne(
      { orderId: body.id },
      { $set: { status: body.status } },
    );
  }

  async countAllByUser(uid: string): Promise<number> {
    return this.orderModel.countDocuments({ userId: uid });
  }

  async findAllByUser(
    uid: string,
    skip: number,
    limit: number,
  ): Promise<Order[]> {
    return this.orderModel
      .find(
        { userId: uid },
        { _id: 0, updatedAt: 0, __v: 0 },
        { skip, limit, sort: { _id: -1 } },
      )
      .exec();
  }

  async findById(id: string): Promise<Order> {
    return this.orderModel.findOne({ orderId: id }).exec();
  }

  async confirmOrder(order: Order): Promise<string> {
    const response = await axios.post(
      `${process.env.PAYMENT_BASE_URL}/payment`,
      order,
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      },
    );

    return response.data;
  }
}
