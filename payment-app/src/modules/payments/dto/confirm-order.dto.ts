import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmOrderDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;
}

export class ConfirmOrderResponseDto {
  isSucceeded: boolean;
}
