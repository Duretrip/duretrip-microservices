import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TokenInjections } from '@dure-trips/shared/constants';
import { RabbitmqModule } from '@dure-trips/shared/modules/rabbitmq.module';

@Module({
  imports: [
    RabbitmqModule.register({
      tokenInjection: TokenInjections.PAYMENT_MICROSERVICE,
      queue: process.env.RABBITMQ_PAYMENT_QUEUE,
    }),
    RabbitmqModule.register({
      tokenInjection: TokenInjections.AUTH_MICROSERVICE,
      queue: process.env.RABBITMQ_AUTH_QUEUE,
    }),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
