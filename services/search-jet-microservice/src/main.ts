import { NestFactory } from '@nestjs/core';
import { SearchJetMicroserviceModule } from './search-jet-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(SearchJetMicroserviceModule);
  await app.listen(3000);
}
bootstrap();
