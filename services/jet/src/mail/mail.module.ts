import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Module({
  providers: [RabbitMQService],
  controllers: [MailController],
})
export class MailModule {}
