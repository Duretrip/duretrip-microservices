import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

@Module({
  imports: [GatewayModule],
  controllers: [AppController],
  providers: [AppService, RabbitmqService],
})
export class AppModule {}
