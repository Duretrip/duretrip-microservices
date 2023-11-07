import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';

@Module({
  controllers: [AuthController],
})
export class AuthModule {}
