import { NestFactory } from '@nestjs/core';
import { BookHotelMicroserviceModule } from './book-hotel-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(BookHotelMicroserviceModule);
  await app.listen(3000);
}
bootstrap();
