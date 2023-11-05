import { NestFactory } from '@nestjs/core';
import { SearchAirlineTicketMicroserviceModule } from './search-airline-ticket-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(SearchAirlineTicketMicroserviceModule);
  await app.listen(3000);
}
bootstrap();
