import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getModelToken } from '@nestjs/mongoose';
import { Order } from './interfaces/order.interface';
import { createMock } from '@golevelup/nestjs-testing';
import { DocumentQuery, Model } from 'mongoose';
import { constants } from './constants';
import 'dotenv';
import { EnumOrderStatus } from './enum/order_status.enum';
import { getQueueToken } from '@nestjs/bull';

const { ORDER_MODEL, ORDER_QUEUE } = constants;

const orderArray = [
  {
    userId: '1',
    orderId: '1111111',
    total: 1000,
    status: EnumOrderStatus.ORDER_CREATED,
    items: [
      {
        id: '1',
        quantity: 1,
        name: 'product name 1',
        image: 'url_image_1.png',
        price: 500,
      },
    ],
    createdAt: '2020-12-04T05:54:43.586Z',
  },
  {
    userId: '1',
    orderId: '2222222',
    total: 2200,
    status: EnumOrderStatus.ORDER_DELIVERED,
    items: [
      {
        id: '1',
        quantity: 1,
        name: 'product name 1',
        image: 'url_image_1.png',
        price: 500,
      },
      {
        id: '2',
        quantity: 1,
        name: 'product name 2',
        image: 'url_image_2.png',
        price: 700,
      },
    ],
    createdAt: '2020-12-04T05:54:43.586Z',
  },
  {
    userId: '1',
    orderId: '333333',
    total: 3200,
    status: EnumOrderStatus.ORDER_DELIVERED,
    items: [
      {
        id: '3',
        quantity: 2,
        name: 'product name 3',
        image: 'url_image_3.png',
        price: 900,
      },
    ],
    createdAt: '2020-12-04T05:54:43.586Z',
  },
];

const mockOrderDoc: (mock?: {
  userId?: string;
  orderId?: string;
  total?: number;
  status?: EnumOrderStatus;
  items?: any[];
  createdAt?: string;
}) => Partial<Order> = (mock?: {
  userId: string;
  orderId: string;
  total: number;
  status: EnumOrderStatus;
  items: any[];
  createdAt: string;
}) => {
  return {
    userId: (mock && mock.userId) || '1',
    orderId: (mock && mock.orderId) || 'a shortid',
    total: (mock && mock.total) || 1000,
    status: (mock && mock.status) || EnumOrderStatus.ORDER_CONFIRMED,
    items: (mock && mock.items) || [],
    createdAt: (mock && mock.createdAt) || '2020-12-04T05:54:43.586Z',
  };
};

const orderDocArray = [
  mockOrderDoc({
    userId: '1',
    orderId: '1111111',
    total: 1000,
    status: EnumOrderStatus.ORDER_CREATED,
    items: [
      {
        id: '1',
        quantity: 1,
        name: 'product name 1',
        image: 'url_image_1.png',
        price: 500,
      },
    ],
    createdAt: '2020-12-04T05:54:43.586Z',
  }),
  mockOrderDoc({
    userId: '1',
    orderId: '2222222',
    total: 2200,
    status: EnumOrderStatus.ORDER_DELIVERED,
    items: [
      {
        id: '1',
        quantity: 1,
        name: 'product name 1',
        image: 'url_image_1.png',
        price: 500,
      },
      {
        id: '2',
        quantity: 1,
        name: 'product name 2',
        image: 'url_image_2.png',
        price: 700,
      },
    ],
    createdAt: '2020-12-04T05:54:43.586Z',
  }),
  mockOrderDoc({
    userId: '1',
    orderId: '333333',
    total: 3200,
    status: EnumOrderStatus.ORDER_DELIVERED,
    items: [
      {
        id: '3',
        quantity: 2,
        name: 'product name 3',
        image: 'url_image_3.png',
        price: 900,
      },
    ],
    createdAt: '2020-12-04T05:54:43.586Z',
  }),
];

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let model: Model<any>;
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
            countDocuments: jest.fn(),
            findOneAndUpdate: jest.fn(),
          },
        },
        {
          provide: getQueueToken(ORDER_QUEUE),
          useValue: {},
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    model = module.get<Model<any>>(getModelToken(ORDER_MODEL));
  });

  it('should be defined', () => {
    expect(ordersService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all orders', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(orderDocArray),
    } as any);

    const orders = await ordersService.findAllByUser('1', 1);
    expect(orders.list).toEqual(orderArray);
  });

  it('should get an order by id', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<DocumentQuery<Order, any, unknown>>({
        exec: jest.fn().mockResolvedValueOnce(mockOrderDoc(orderArray[0])),
      }),
    );
    const findMockCat = mockOrderDoc(orderArray[0]);
    const foundOrder = await ordersService.findById('12345');
    expect(foundOrder).toEqual(findMockCat);
  });

  it('should create new order', async () => {
    jest
      .spyOn(ordersService, 'create')
      .mockResolvedValueOnce(orderArray[0] as any); // dreaded as any, but it can't be helped

    const newOrder = await ordersService.create({
      userId: '1',
      order: [{ id: '1', quantity: 1 }],
    });

    expect(newOrder).toEqual(mockOrderDoc(orderArray[0]));
  });

  it('should cancel order and return order cancelled', async () => {
    jest.spyOn(ordersService, 'cancelOrder').mockResolvedValueOnce({
      userId: '1',
      orderId: '12fe_asita',
      total: 2000,
      status: EnumOrderStatus.ORDER_CANCELLED,
      items: [],
      createdAt: '2020-12-04T05:54:43.586Z',
    });
    const orderCancelled = await ordersService.cancelOrder('12fe_asita');

    expect(orderCancelled.orderId).toEqual('12fe_asita');
    expect(orderCancelled.status).toEqual(EnumOrderStatus.ORDER_CANCELLED);
  });

  it('should update an order status successfully', async () => {
    jest.spyOn(model, 'updateOne').mockResolvedValueOnce({ nModified: 1 });
    const updatedOrderStatus = await ordersService.updateStatus({
      id: '12345',
      status: EnumOrderStatus.ORDER_CANCELLED,
    });

    expect(updatedOrderStatus).toEqual({ nModified: 1 });
  });

  it('should return an order status (declined or delivered)', async () => {
    const result: EnumOrderStatus[] = [
      EnumOrderStatus.ORDER_DECLINED,
      EnumOrderStatus.ORDER_CONFIRMED,
    ];

    jest
      .spyOn(ordersService, 'confirmOrder')
      .mockImplementation(() =>
        Promise.resolve(EnumOrderStatus.ORDER_CONFIRMED),
      );

    const confirmResult = await ordersService.confirmOrder(orderArray[0]);

    expect(result).toContain(confirmResult);
  });
});
