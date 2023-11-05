import { NestFactory } from '@nestjs/core';
import { HotelBookingManagementMicroserviceModule } from './hotel-booking-management-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(
    HotelBookingManagementMicroserviceModule,
  );
  await app.listen(3000);
}
bootstrap();
