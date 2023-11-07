import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor() {
    this.connectToRabbitMQ();
  }

  private async connectToRabbitMQ() {
    this.connection = await amqp.connect(process.env.RABBITMQ_CONECTION_URL); // Replace with your RabbitMQ server URL
    this.channel = await this.connection.createChannel();
  }

  async publishMessage(queueName: string, message: any) {
    this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }

  async consumeMessages(queueName: string, callback: (message: any) => void) {
    this.channel.consume(queueName, (msg) => {
      const message = JSON.parse(msg.content.toString());
      callback(message);
      this.channel.ack(msg);
    });
  }

  async waitForResponse(correlationId: string): Promise<any> {
    return new Promise((resolve) => {
      // Listen for responses with the specified correlationId
      this.channel.consume('api-gateway-queue', (msg) => {
        console.log(msg);
        const message = JSON.parse(msg.content.toString());
        if (message.correlationId === correlationId) {
          resolve(message.response);
          // Acknowledge the message
          this.channel.ack(msg);
        }
      });
    });
  }
}
