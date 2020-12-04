import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  orderId: string;

  @IsNumber()
  total: number;

  @IsArray()
  items: any[];
}
