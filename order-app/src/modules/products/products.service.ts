import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { OrderItemDto } from '../orders/dto/create-order.dto';
import { products } from './products.constants';

@Injectable()
export class ProductsService {
  async getProducts(orderItems: OrderItemDto[]): Promise<any[]> {
    if (orderItems.length === 0) {
      throw new BadRequestException('Order items can not be empty');
    }

    const res = [];

    orderItems.map((orderItem) => {
      const product = products.find((p) => p.id === orderItem.id);
      if (!product) {
        throw new BadRequestException(`Product ID '${orderItem.id}' not found`);
      }
      if (orderItem.quantity > product.quantity) {
        throw new ConflictException(
          `Product ${product.name} is temporary out of stock`,
        );
      }
      res.push({
        ...product,
        quantity: orderItem.quantity,
      });
    });

    return res;
  }
}
