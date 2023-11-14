import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { JetsService } from './jets/jets.service';

@Controller()
export class AppController {
  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly appService: AppService,
    private readonly jetsService: JetsService,
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

        if (message.action === 'find_all_jet') {
          const payload = message.payload;
          const response = await this.jetsService.findAll();
          // console.log(response);

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'jet_find_all',
            response,
          });
        }

        if (message.action === 'find_one_jet') {
          const payload = message.payload;
          const response = this.jetsService.findOne(payload.id);
          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'jet_find_one',
            response,
          });
        }

        if (message.action === 'create_jet') {
          const payload = message.payload;
          const response = await this.jetsService.create(payload, 2);
          await this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'jet_created',
            response,
          });
        }
      });
    } catch (error) {
      console.log({ error: JSON.stringify(error) });
    }
  }
}
