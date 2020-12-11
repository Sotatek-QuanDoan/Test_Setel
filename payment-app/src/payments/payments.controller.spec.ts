import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { EnumOrderStatus } from './enum/order_status.enum';

describe('PaymentsController', () => {
  let paymentsController: PaymentsController;
  let paymentsService: PaymentsService;

  beforeEach(() => {
    paymentsService = new PaymentsService();
    paymentsController = new PaymentsController(paymentsService);
  });

  describe('confirmOrder', () => {
    test('should return an object with status property is confirmed or declined', async () => {
      const result = EnumOrderStatus.ORDER_CONFIRMED;

      jest
        .spyOn(paymentsService, 'confirmOrder')
        .mockImplementation(() => Promise.resolve(result));

      expect(await paymentsController.confirmOrder({ orderId: '1' })).toEqual(
        result,
      );
    });
  });
});
