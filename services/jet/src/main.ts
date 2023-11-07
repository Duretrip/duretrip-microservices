import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const port = process.env.APP_PORT;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`app is listening on ${port}`);
}
bootstrap();
