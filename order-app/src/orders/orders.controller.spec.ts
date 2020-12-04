import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { BodyOrderDto } from './dto/body-order.dto';

describe('Order Controller', () => {
  let controller: OrdersController;

  const arrOrders = [
    {
      userId: '1',
      orderId: '12345',
      total: 1000,
      status: 'cancelled',
      items: [],
    },
    {
      userId: '1',
      orderId: '232323',
      total: 2200,
      status: 'delivered',
      items: [],
    },
  ];

  const limit = 5;
  const countOrders = 15;
  const totalPage = Math.ceil(15 / limit);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            findAllByUser: jest
              .fn()
              .mockImplementation(() => Promise.resolve(arrOrders)),
            countAllByUser: jest
              .fn()
              .mockImplementation(() => Promise.resolve(countOrders)),
            findById: jest.fn().mockImplementation(() =>
              Promise.resolve({
                userId: '1',
                orderId: '12345',
                total: 1000,
                status: 'cancelled',
                items: [],
              }),
            ),
            create: jest.fn().mockImplementation(() =>
              Promise.resolve({
                userId: '1',
                orderId: '33333',
                total: 1300,
                status: 'created',
                items: [
                  {
                    id: 1,
                    name: 'product name 1',
                    price: 500,
                    quantity: 2,
                    image: 'image url',
                  },
                ],
              }),
            ),
            updateStatus: jest
              .fn()
              .mockImplementation(() => Promise.resolve({ nModified: 1 })),
            confirmOrder: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve({ orderId: '1', status: 'confirmed' }),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllByUser', () => {
    it('should get an array of orders', () => {
      expect(controller.findAllByUser('1', 1)).resolves.toEqual({
        list: arrOrders,
        totalPage,
      });
    });
  });
  describe('find', () => {
    it('should get an order', () => {
      expect(controller.find('12345')).resolves.toEqual({
        userId: '1',
        orderId: '12345',
        total: 1000,
        status: 'cancelled',
        items: [],
      });
    });
  });
  describe('create', () => {
    it('should create a new order', () => {
      const newOrder: BodyOrderDto = {
        order: [
          {
            id: 1,
            quantity: 2,
          },
        ],
      };
      expect(controller.create(newOrder)).resolves.toEqual({
        userId: '1',
        orderId: '33333',
        total: 1300,
        status: 'created',
        items: [
          {
            id: 1,
            name: 'product name 1',
            price: 500,
            quantity: 2,
            image: 'image url',
          },
        ],
      });
    });
  });
  describe('cancelOrder', () => {
    it('should update order status to "cancelled"', () => {
      expect(controller.cancelOrder('1')).resolves.toEqual(
        'Cancel order success.',
      );
    });
  });
});
