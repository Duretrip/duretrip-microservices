import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { v4 as uuidv4 } from 'uuid';

function generateUniqueId() {
  return uuidv4();
}
@Controller()
export class GatewayController {
  constructor(private readonly rabbitMQService: RabbitmqService) {}

  @Post('/login')
  async login(@Body() credentials: any, @Req() req, @Res() res) {
    const correlationId = generateUniqueId();

    // Translate the HTTP request into a message
    const message = {
      action: 'login',
      payload: credentials,
      correlationId,
    };

    // Publish the login message to the RabbitMQ queue
    this.rabbitMQService.publishMessage('auth-queue', message);

    // Listen for the response with the specified correlation ID
    this.rabbitMQService.waitForResponse(correlationId).then((response) => {
      if (response) {
        // Handle the login response received from the Auth service
        res.status(200).json(response);
      } else {
        res.status(500).json({ message: 'Login request sent, waiting for response...' });
      }
    });
  }
}
