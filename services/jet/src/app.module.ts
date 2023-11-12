import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import { PrismaModule } from './prisma/prisma.module';
import { JetsModule } from './jets/jets.module';

@Module({
  imports: [PrismaModule, JetsModule],
  controllers: [AppController],
  providers: [RabbitmqService, AppService],
})
export class AppModule {}
