import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getModelToken } from '@nestjs/mongoose';
import { Order } from './interfaces/order.interface';
import { createMock } from '@golevelup/nestjs-testing';
import { DocumentQuery, Model } from 'mongoose';
import constants from './constants';
import 'dotenv';

const { ORDER_MODEL } = constants;

// const mockOrder: (
//   name?: string,
//   id?: string,
//   age?: number,
//   breed?: string,
// ) => Order = (
//   name = 'Ventus',
//   id = 'a uuid',
//   age = 4,
//   breed = 'Russian Blue',
// ) => {
//   return {
//     name,
//     id,
//     age,
//     breed,
//   };
// };

const orderArray = [
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

const mockOrderDoc: (mock?: {
  userId?: string;
  orderId?: string;
  total?: number;
  status?: string;
  items?: any[];
}) => Partial<Order> = (mock?: {
  userId: string;
  orderId: string;
  total: number;
  status: string;
  items: any[];
}) => {
  return {
    userId: (mock && mock.userId) || '1',
    orderId: (mock && mock.orderId) || 'a shortid',
    total: (mock && mock.total) || 1000,
    status: (mock && mock.status) || 'confirmed',
    items: (mock && mock.items) || [],
  };
};

const orderDocArray = [
  mockOrderDoc({
    userId: '1',
    orderId: '12345',
    total: 1000,
    status: 'cancelled',
    items: [],
  }),
  mockOrderDoc({
    userId: '1',
    orderId: '232323',
    total: 2200,
    status: 'delivered',
    items: [],
  }),
];

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let model: Model<Order>;
  jest.mock('axios');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getModelToken(ORDER_MODEL),
          // notice that only the functions we call from the model are mocked
          useValue: {
            new: jest.fn().mockResolvedValue(mockOrderDoc()),
            constructor: jest.fn().mockResolvedValue(mockOrderDoc()),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
            save: jest.fn(),
            updateOne: jest.fn(),
            skip: jest.fn(),
            countDocuments: jest.fn(),
          },
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    model = module.get<Model<Order>>(getModelToken('Order'));
  });

  it('should be defined', () => {
    expect(ordersService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return count orders number', async () => {
    const countNumber = 15;
    jest.spyOn(model, 'countDocuments').mockResolvedValueOnce(countNumber);

    const countOrders = await ordersService.countAllByUser('1');
    expect(countOrders).toEqual(countNumber);
  });

  it('should return all orders', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(orderDocArray),
    } as any);

    const orders = await ordersService.findAllByUser('1', 0, 10);
    expect(orders).toEqual(orderArray);
  });

  it('should get an order by id', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<DocumentQuery<Order, Order, unknown>>({
        exec: jest.fn().mockResolvedValueOnce(
          mockOrderDoc({
            orderId: '12345',
            total: 1000,
            status: 'cancelled',
            items: [],
          }),
        ),
      }),
    );
    const findMockCat = mockOrderDoc({
      orderId: '12345',
      total: 1000,
      status: 'cancelled',
      items: [],
    });
    const foundOrder = await ordersService.findById('12345');
    expect(foundOrder).toEqual(findMockCat);
  });

  it('should create new order', async () => {
    jest.spyOn(model, 'create').mockResolvedValueOnce({
      userId: '1',
      orderId: '12fe_asita',
      total: 2000,
      status: 'created',
      items: [],
    } as any); // dreaded as any, but it can't be helped

    const newOrder = await ordersService.create({
      userId: 1,
      orderId: '12fe_asita',
      total: 2000,
      items: [],
    });

    expect(newOrder).toEqual(
      mockOrderDoc({
        userId: '1',
        orderId: '12fe_asita',
        total: 2000,
        status: 'created',
        items: [],
      }),
    );
  });

  it('should update an order status successfully', async () => {
    jest.spyOn(model, 'updateOne').mockResolvedValueOnce({ nModified: 1 });
    const updatedOrderStatus = await ordersService.updateStatus({
      id: '12345',
      status: 'cancelled',
    });

    expect(updatedOrderStatus).toEqual({ nModified: 1 });
  });

  it('should return an order status (declined or delivered)', async () => {
    const result = ['declined', 'confirmed'];

    jest
      .spyOn(ordersService, 'confirmOrder')
      .mockImplementation(() => Promise.resolve('confirmed'));

    const confirmResult = await ordersService.confirmOrder({
      userId: 1,
      orderId: '12fe_asita',
      total: 2000,
      items: [],
      status: 'created',
    });

    expect(result).toContain(confirmResult);
  });
});
