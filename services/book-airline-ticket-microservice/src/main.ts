import { NestFactory } from '@nestjs/core';
import { BookAirlineTicketMicroserviceModule } from './book-airline-ticket-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(BookAirlineTicketMicroserviceModule);
  await app.listen(3000);
}
bootstrap();
