/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from '@nestjs/common';
import { RmqOptions } from '@nestjs/microservices';
import { RabbitmqService } from '@dure-trips/shared/services';
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

  const port = process.env.APP_PORT || 3000;
  const globalPrefix = process.env.ENDPOINT_PREFIX || 'api/v1';
  app.enableCors();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );

  
}

bootstrap();
