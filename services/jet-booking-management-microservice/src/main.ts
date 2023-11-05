import { NestFactory } from '@nestjs/core';
import { JetBookingManagementMicroserviceModule } from './jet-booking-management-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(JetBookingManagementMicroserviceModule);
  await app.listen(3000);
}
bootstrap();
