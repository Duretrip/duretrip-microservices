import { PaymentService } from './payment.service';
import { MakePaymentDto } from '@dure-trips/shared/dto';
import { UserRequest } from '@dure-trips/shared/interfaces';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    makePayment(req: UserRequest, makePaymetDto: MakePaymentDto): any;
}
