/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PaymentsMicroserviceModule } from './payments-microservice.module';
import {
  BROKERS_ADDRESS,
  ConsumerGroupIds,
} from '@dure-trips/shared/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentsMicroserviceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [BROKERS_ADDRESS],
        },
        consumer: {
          groupId: ConsumerGroupIds.PAYMENT_CONSUMER,
        },
      },
    },
  );

  await app.listen();
}

bootstrap();
