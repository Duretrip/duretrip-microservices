import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { v4 as uuidv4 } from 'uuid';

function generateUniqueId() {
    return uuidv4();
}
@Controller('jet')
export class JetController {
    constructor(private readonly rabbitMQService: RabbitmqService) { }

    @Post('/register')
    async login(@Body() credentials: any, @Req() req, @Res() res) {
        const correlationId = generateUniqueId();

        // Translate the HTTP request into a message
        const message = {
            action: 'register_jet',
            payload: credentials,
            correlationId,
        };

        // Publish the login message to the RabbitMQ queue
        await this.rabbitMQService.publishMessage('jet-queue', message);

        // Listen for the response with the specified correlation ID
        this.rabbitMQService.waitForResponse(correlationId).then((response) => {
            console.log({response});
            if (response.action === 'jet_created') {
                res.status(200).json('Jet created successfully');
            } else {
                res.status(response.status ? response?.status : 500).json({ message: response.message ? response.message : 'An error occured' });
            }
        }).catch(err => {
            res.status(500).json({ message: 'Internal Server Error' });
        })
    }
}