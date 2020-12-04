import { IsNotEmpty } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  orderId: string;
}
