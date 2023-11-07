import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor() {
    this.initRabbitMQ();
  }

  private async initRabbitMQ() {
    try {
      this.connection = await amqp.connect(process.env.RABBITMQ_CONNECTION_URL);
      this.channel = await this.connection.createChannel();
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
    }
  }

  async publishMessage(queueName: string, message: any) {
    await this.waitForConnection();
    this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }

  async consumeMessages(queueName: string, callback: (message: any) => void) {
    await this.waitForConnection();
    this.channel.consume(queueName, (msg) => {
      const message = JSON.parse(msg.content.toString());
      callback(message);
      this.channel.ack(msg);
    });
  }

  async waitForResponse(correlationId: string): Promise<any> {
    await this.waitForConnection();
    return new Promise((resolve, reject) => {
      this.channel.consume('api-gateway-queue', (msg) => {
        const message = JSON.parse(msg.content.toString());
        if (message.correlationId === correlationId) {
          resolve(message)
          this.channel.ack(msg);
        }
      });
    });
  }

  private async waitForConnection() {
    while (!this.channel) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}
