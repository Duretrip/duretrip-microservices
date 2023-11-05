import { NestFactory } from '@nestjs/core';
import { SearchHotelMicroserviceModule } from './search-hotel-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(SearchHotelMicroserviceModule);
  await app.listen(3000);
}
bootstrap();
