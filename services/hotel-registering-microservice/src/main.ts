import { NestFactory } from '@nestjs/core';
import { HotelRegisteringMicroserviceModule } from './hotel-registering-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(HotelRegisteringMicroserviceModule);
  await app.listen(3000);
}
bootstrap();
