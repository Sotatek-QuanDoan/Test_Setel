import { IsNotEmpty, IsAlpha } from 'class-validator';

export class BodyUpdateOrderStatusDto {
  @IsNotEmpty()
  id: string;

  @IsAlpha()
  status: string;
}
