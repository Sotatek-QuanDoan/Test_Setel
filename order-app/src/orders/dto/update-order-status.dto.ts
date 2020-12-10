import { IsNotEmpty, IsAlpha } from 'class-validator';
import { EnumOrderStatus } from '../enum/order_status.enum';

export class BodyUpdateOrderStatusDto {
  @IsNotEmpty()
  id: string;

  @IsAlpha()
  status: EnumOrderStatus;
}
