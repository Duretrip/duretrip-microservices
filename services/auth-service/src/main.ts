/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqOptions } from '@nestjs/microservices';
import { RabbitmqService } from 'libs/shared/src/services';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const rabbitmqService = app.get<RabbitmqService>(RabbitmqService);

  const configService = app.get(ConfigService);

  const queue = configService.get('RABBITMQ_AUTH_QUEUE');

  app.connectMicroservice<RmqOptions>(rabbitmqService.getRmqOptions(queue), {
    inheritAppConfig: true,
  });

  await app.startAllMicroservices();
}

bootstrap();
