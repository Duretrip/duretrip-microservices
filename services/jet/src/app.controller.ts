import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

@Controller()
export class AppController {
  constructor(
    private readonly rabbitMQService: RabbitmqService,
    private readonly appService: AppService,
  ) {}
  async onModuleInit() {
    await this.rabbitMQService.connectToRabbitMQ();
    try {
      this.rabbitMQService.consumeMessages('jet-queue', async (message) => {
        if (message.action === 'register_jet') {
          const payload = message.payload;
          const response = this.appService.sayHi();
          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'jet_created',
            response,
          });
        }
      })
    } catch (error) {
      console.log({ error: JSON.stringify(error) });
    }
  }
}
