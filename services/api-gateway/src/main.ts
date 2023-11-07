import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

const port = process.env.APP_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`app listening on ${port}`)
}
bootstrap();
