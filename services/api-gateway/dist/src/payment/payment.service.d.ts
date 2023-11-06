import { ClientProxy } from '@nestjs/microservices';
export declare class PaymentService {
    private readonly paymentClient;
    constructor(paymentClient: ClientProxy);
    makePayment(data: {
        amount: number;
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }): import("rxjs").Observable<any>;
}
