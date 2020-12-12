import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

describe('PaymentsController', () => {
  let paymentsController: PaymentsController;
  let paymentsService: PaymentsService;

  beforeEach(() => {
    paymentsService = new PaymentsService();
    paymentsController = new PaymentsController(paymentsService);
  });

  describe('confirmOrder', () => {
    test('should return result', async () => {
      const result = { isSucceeded: true };

      jest
        .spyOn(paymentsService, 'confirmOrder')
        .mockImplementation(() => Promise.resolve(result));

      expect(await paymentsController.confirmOrder({ orderId: '1' })).toEqual(
        result,
      );
    });
  });
});
