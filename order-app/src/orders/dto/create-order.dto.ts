import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  orderId: string;

  @IsNumber()
  total: number;

  @IsArray()
  items: any[];
}
