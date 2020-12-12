import { OrderEntityDto } from './order-entity.dto';

export class ListOrderDto {
  totalPage: number;
  list: OrderEntityDto[];
}
