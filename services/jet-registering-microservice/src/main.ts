import { NestFactory } from '@nestjs/core';
import { JetRegisteringMicroserviceModule } from './jet-registering-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(JetRegisteringMicroserviceModule);
  await app.listen(3000);
}
bootstrap();
