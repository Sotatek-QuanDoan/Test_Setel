import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  let paymentsService: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsService],
    }).compile();

    paymentsService = module.get<PaymentsService>(PaymentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(paymentsService).toBeDefined();
  });

  it('should return result', async () => {
    const confirmResult = await paymentsService.confirmOrder({ orderId: '1' });
    expect([true, false]).toContain(confirmResult.isSucceeded);
  });
});
