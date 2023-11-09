import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { v4 as uuidv4 } from 'uuid';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateJetDto } from './dto/create-jet.dto';

function generateUniqueId() {
  return uuidv4();
}
@Controller('jets')
export class JetController {
  constructor(private readonly rabbitMQService: RabbitmqService) {}

  @Post('/test')
  @ApiCreatedResponse({ type: CreateJetDto })
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
    this.rabbitMQService
      .waitForResponse(correlationId)
      .then((response) => {
        console.log({ response });
        if (response.action === 'jet_created') {
          res.status(200).json('Jet tested successfully');
        } else {
          res.status(response.status ? response?.status : 500).json({
            message: response.message ? response.message : 'An error occured',
          });
        }
      })
      .catch((err) => {
        console.log(err);

        res.status(500).json({ message: 'Internal Server Error' });
      });
  }
  @Get()
  async findAll(@Body() credentials: any, @Req() req, @Res() res) {
    const correlationId = generateUniqueId();

    // Translate the HTTP request into a message
    const message = {
      action: 'find_all_jet',
      payload: credentials,
      correlationId,
    };

    // Publish the login message to the RabbitMQ queue
    await this.rabbitMQService.publishMessage('jet-queue', message);

    // Listen for the response with the specified correlation ID
    this.rabbitMQService
      .waitForResponse(correlationId)
      .then((response) => {
        console.log({ response });
        if (response.action === 'jet_find_all') {
          res.status(200).json('All Jets fetched successfully');
        } else {
          res.status(response.status ? response?.status : 500).json({
            message: response.message ? response.message : 'An error occured',
          });
        }
      })
      .catch((err) => {
        console.log(err);

        res.status(500).json({ message: 'Internal Server Error' });
      });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req, @Res() res) {
    const correlationId = generateUniqueId();

    console.log('Params-******', id);
    console.log('Response-******', res);

    // Translate the HTTP request into a message
    const message = {
      action: 'find_one_jet',
      payload: id,
      correlationId,
    };

    // Publish the login message to the RabbitMQ queue
    await this.rabbitMQService.publishMessage('jet-queue', message);

    // Listen for the response with the specified correlation ID
    this.rabbitMQService
      .waitForResponse(correlationId)
      .then((response) => {
        console.log('response', response);
        if (response.action === 'jet_find_one') {
          res.status(200).json('Jet fetched successfully');
        } else {
          res.status(response.status ? response?.status : 500).json({
            message: response.message ? response.message : 'An error occured',
          });
        }
      })
      .catch((err) => {
        console.log(err);

        res.status(500).json({ message: 'Internal Server Error' });
      });
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req, @Res() res) {
    const correlationId = generateUniqueId();

    console.log('Params-******', id);

    // Translate the HTTP request into a message
    const message = {
      action: 'delete_one_jet',
      payload: id,
      correlationId,
    };

    // Publish the login message to the RabbitMQ queue
    await this.rabbitMQService.publishMessage('jet-queue', message);

    // Listen for the response with the specified correlation ID
    this.rabbitMQService
      .waitForResponse(correlationId)
      .then((response) => {
        console.log('response', response);
        if (response.action === 'jet_delete_one') {
          res.status(200).json('Jet deleted successfully');
        } else {
          res.status(response.status ? response?.status : 500).json({
            message: response.message ? response.message : 'An error occured',
          });
        }
      })
      .catch((err) => {
        console.log(err);

        res.status(500).json({ message: 'Internal Server Error' });
      });
  }

  @Post()
  async create(@Body() credentials: any, @Req() req, @Res() res) {
    const userId = req.user.id;
    const correlationId = generateUniqueId();

    console.log('Params-******', credentials);

    // Translate the HTTP request into a message
    const message = {
      action: 'create_one_jet',
      payload: { ...credentials, userId: userId },
      correlationId,
    };

    // Publish the login message to the RabbitMQ queue
    await this.rabbitMQService.publishMessage('jet-queue', message);

    // Listen for the response with the specified correlation ID
    this.rabbitMQService
      .waitForResponse(correlationId)
      .then((response) => {
        console.log('response', response);
        if (response.action === 'jet_create_one') {
          res.status(200).json('Jet created successfully');
        } else {
          res.status(response.status ? response?.status : 500).json({
            message: response.message ? response.message : 'An error occured',
          });
        }
      })
      .catch((err) => {
        console.log(err);

        res.status(500).json({ message: 'Internal Server Error' });
      });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() credentials: any,
    @Req() req,
    @Res() res,
  ) {
    const userId = req.user.id;
    const correlationId = generateUniqueId();

    console.log('Params-******', credentials);

    // Translate the HTTP request into a message
    const message = {
      action: 'update_one_jet',
      payload: { ...credentials, userId: userId },
      correlationId,
    };

    // Publish the login message to the RabbitMQ queue
    await this.rabbitMQService.publishMessage('jet-queue', message);

    // Listen for the response with the specified correlation ID
    this.rabbitMQService
      .waitForResponse(correlationId)
      .then((response) => {
        console.log('response', response);
        if (response.action === 'jet_update_one') {
          res.status(200).json('Jet updated successfully');
        } else {
          res.status(response.status ? response?.status : 500).json({
            message: response.message ? response.message : 'An error occured',
          });
        }
      })
      .catch((err) => {
        console.log(err);

        res.status(500).json({ message: 'Internal Server Error' });
      });
  }
}
