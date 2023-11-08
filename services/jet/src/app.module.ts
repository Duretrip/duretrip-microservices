import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import { CustomPrismaModule } from 'nestjs-prisma';
import { PrismaClient as JetPrismaClient } from '@dare/jet/client';

@Module({
  imports: [
    CustomPrismaModule.forRoot({
      name: 'JetPrismaClient',
      client: new JetPrismaClient(),
    }),
  ],
  controllers: [AppController],
  providers: [RabbitmqService, AppService],
})
export class AppModule {}
