import { MakePaymentDto } from '@dure-trips/shared/dto';
import { User } from '@dure-trips/shared/entities';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EventPatterns, TokenInjections } from '@dure-trips/shared/constants';

@Injectable()
export class PaymentsMicroserviceService implements OnModuleInit {
  constructor(
    @Inject(TokenInjections.AUTH_MICROSERVICE)
    private readonly authClient: ClientKafka,
  ) {}

  async processPayment(makePaymetDto: MakePaymentDto) {
    const { userId, amount } = makePaymetDto;

    console.log('userId', userId);
    console.log('amount', amount);

    this.authClient
      .send(EventPatterns.get_user, JSON.stringify({ userId }))
      .subscribe((user: User) => {
        console.log('user client', user);
        console.log(
          `process payment for user ${user.firstName} ${user.lastName} - amount: ${amount}`,
        );
      });
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf(EventPatterns.get_user);
  }
}
