import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';

describe('Payment service', () => {
  let paymentsService: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsService],
    }).compile();

    paymentsService = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(paymentsService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return order status (cancelled or confirmed)', async () => {
    const result = ['declined', 'confirmed'];

    const confirmResult = await paymentsService.confirmOrder({ orderId: '1' });
    expect(result).toContain(confirmResult);
  });
});
