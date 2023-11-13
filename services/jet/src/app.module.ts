import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { PrismaModule } from './prisma/prisma.module';
import { JetsModule } from './jets/jets.module';

@Module({
  imports: [PrismaModule, JetsModule],
  controllers: [AppController],
  providers: [RabbitMQService, AppService],
})
export class AppModule { }
