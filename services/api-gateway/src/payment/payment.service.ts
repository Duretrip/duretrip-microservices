import { TokenInjections, EventPatterns } from '@dure-trips/shared/constants';
// import { MakePaymentDto } from '@dure-trips/shared/dto';
// import { UserRequest } from '@dure-trips/shared/interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(TokenInjections.PAYMENT_MICROSERVICE)
    private readonly paymentClient: ClientProxy,
  ) {}

  makePayment(data: {
    amount: number;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }) {
    return this.paymentClient.send(EventPatterns.process_payment, data);
  }
}
