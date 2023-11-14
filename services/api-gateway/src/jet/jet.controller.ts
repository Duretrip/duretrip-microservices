import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  Get,
} from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { v4 as uuidv4 } from 'uuid';
import { PermissionGuard } from 'src/permissions/guards/permission.guard';
import { Permissions } from 'src/permissions/decorators/permission.decorator';
import { CreateJetDto } from './dto/create-jet.dto';
import { ApiTags } from '@nestjs/swagger';

function generateUniqueId() {
  return uuidv4();
}

const RESPONSE_TIMEOUT = 5000; // Timeout in milliseconds (adjust as needed)

@Controller('jet')
@ApiTags('Jets')
@UseGuards(PermissionGuard)
export class JetController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  private async waitForResponseWithTimeout(
    correlationId: string,
  ): Promise<any> {
    return Promise.race([
      this.rabbitMQService.waitForResponse(correlationId),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error('Timeout waiting for response')),
          RESPONSE_TIMEOUT,
        ),
      ),
    ]);
  }

  @Get()
  async getAllJets(@Body() credentials: any, @Req() req, @Res() res) {
    const correlationId = generateUniqueId();

    // Translate the HTTP request into a message
    const message = {
      action: 'find_all_jet',
      payload: credentials,
      correlationId,
    };

    try {
      // Publish the login message to the RabbitMQ queue
      await this.rabbitMQService.publishMessage('jet-queue', message);

      // Listen for the response with the specified correlation ID
      const response = await this.waitForResponseWithTimeout(correlationId);

      console.log({ response });
      if (response.action === 'jet_find_all') {
        res.status(200).json('Jets fetched successfully');
      } else {
        res.status(response.status ? response?.status : 500).json({
          message: response.message ? response.message : 'An error occurred',
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @Post()
  async createAllJet(
    @Body() credentials: CreateJetDto,
    @Req() req,
    @Res() res,
  ) {
    const correlationId = generateUniqueId();

    // Translate the HTTP request into a message
    const message = {
      action: 'create_jet',
      payload: credentials,
      correlationId,
    };

    try {
      // Publish the login message to the RabbitMQ queue
      await this.rabbitMQService.publishMessage('jet-queue', message);

      // Listen for the response with the specified correlation ID
      const response = await this.waitForResponseWithTimeout(correlationId);

      console.log({ response });
      if (response.action === 'jet_created') {
        res.status(200).json('Jet created successfully');
      } else {
        res.status(response.status ? response?.status : 500).json({
          message: response.message ? response.message : 'An error occurred',
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
