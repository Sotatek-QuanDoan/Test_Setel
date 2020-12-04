import { IsNotEmpty } from 'class-validator';

export class BodyOrderDto {
  @IsNotEmpty()
  order: [
    {
      id: number;
      quantity: number;
    },
  ];
}
