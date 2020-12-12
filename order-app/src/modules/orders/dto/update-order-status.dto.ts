import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from '../enum/order-status.enum';

export class UpdateOrderStatusDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEnum(OrderStatus)
  status: OrderStatus;
}
