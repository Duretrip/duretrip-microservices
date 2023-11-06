import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, RabbitmqService],
})
export class AppModule {}
