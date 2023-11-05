import { NestFactory } from '@nestjs/core';
import { AirlineTicketManagementMicroserviceModule } from './airline-ticket-management-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AirlineTicketManagementMicroserviceModule,
  );
  await app.listen(3000);
}
bootstrap();
