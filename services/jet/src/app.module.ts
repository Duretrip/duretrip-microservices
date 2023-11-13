import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

@Module({
  controllers: [AppController],
  providers: [RabbitmqService, AppService],
})
export class AppModule {}
