import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BodyOrderItemDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    default: 1,
  })
  @IsNotEmpty()
  quantity: number;
}
