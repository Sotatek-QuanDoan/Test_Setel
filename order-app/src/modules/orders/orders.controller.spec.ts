import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    })
      .overrideProvider(OrdersService)
      .useValue({})
      .compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllByUser', () => {
    it('should call service', async () => {
      service.findAllByUser = jest.fn();
      await controller.findAllByUser('1', 1);
      expect(service.findAllByUser).toBeCalledWith('1', 1);
    });
  });

  describe('find', () => {
    it('should call service', async () => {
      service.findById = jest.fn();
      await controller.find('123');
      expect(service.findById).toBeCalledWith('123');
    });
  });

  describe('create', () => {
    it('should call service', async () => {
      service.createOrder = jest.fn();
      await controller.create({
        order: [],
        userId: 'user1',
      });
      expect(service.createOrder).toBeCalledWith({
        order: [],
        userId: 'user1',
      });
    });
  });

  describe('cancelOrder', () => {
    it('should call service', async () => {
      service.cancelOrder = jest.fn();
      await controller.cancel('12345');
      expect(service.cancelOrder).toBeCalledWith('12345');
    });
  });
});
