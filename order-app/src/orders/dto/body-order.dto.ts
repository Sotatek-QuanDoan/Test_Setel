import { IsNotEmpty } from 'class-validator';
import { BodyOrderItemDto } from './body-order-item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BodyOrderDto {
  @ApiProperty({
    default: '1',
  })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    type: [BodyOrderItemDto],
  })
  @IsNotEmpty()
  order: BodyOrderItemDto[];
}
