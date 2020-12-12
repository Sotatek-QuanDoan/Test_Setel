import { Type } from 'class-transformer/decorators';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => OrderItemDto)
  order: OrderItemDto[];
}

export class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
