import { NestFactory } from '@nestjs/core';
import { BookJetMicroserviceModule } from './book-jet-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(BookJetMicroserviceModule);
  await app.listen(3000);
}
bootstrap();
