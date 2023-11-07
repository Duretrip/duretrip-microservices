import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { v4 as uuidv4 } from 'uuid';

function generateUniqueId() {
  return uuidv4();
}
@Controller()
export class AuthController {
  constructor(private readonly rabbitMQService: RabbitmqService) { }

  // {
  //   email:'',
  //   password:'',
  //   firstName: '',
  //   lastName: ''
  // }

  @Post('email/register')
  async login(@Body() credentials: any, @Req() req, @Res() res) {
    const correlationId = generateUniqueId();

    // Translate the HTTP request into a message
    const message = {
      action: 'email_register',
      payload: credentials,
      correlationId,
    };

    // Publish the login message to the RabbitMQ queue
    await this.rabbitMQService.publishMessage('auth-queue', message);

    // Listen for the response with the specified correlation ID
    this.rabbitMQService.waitForResponse(correlationId).then((response) => {
      if (message.action === 'user_created') {
        console.log('positive', response);
        res.status(200).json('User created successfully');
      } else {
        console.log('negative', response);
        res.status(response.status ? response?.status : 500).json({ message: response.message ? response.message : 'An error occured' });
      }
    }).catch(err => {
      res.status(500).json({ message: 'Internal Server Error' });
    })
  }
}