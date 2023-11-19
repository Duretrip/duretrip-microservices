import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { v4 as uuidv4 } from 'uuid';
import { PermissionGuard } from 'src/permissions/guards/permission.guard';
import { CreateJetDto } from './dto/create-jet.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateJetDto } from './dto/update-jet.dto';
import { Permissions } from 'src/permissions/decorators/permission.decorator';
import { AuthGuard } from '@nestjs/passport';

function generateUniqueId() {
  return uuidv4();
}

@Controller('jet')
@ApiTags('Jets')
@UseGuards(AuthGuard('jwt'), PermissionGuard)

export class JetController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}
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
      const response = await this.rabbitMQService.waitForResponseWithTimeout(correlationId);

      if (response.action === 'jet_find_all') {
        res.status(200).json({
          message: 'Jets fetched successfully',
          data: response.response,
        });
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

  @Get('facility')
  async getAllFacilities(@Req() req, @Res() res) {
    const correlationId = generateUniqueId();

    // Translate the HTTP request into a message
    const message = {
      action: 'find_all_facility',
      payload: {},
      correlationId,
    };

    try {
      // Publish the login message to the RabbitMQ queue
      await this.rabbitMQService.publishMessage('jet-queue', message);

      // Listen for the response with the specified correlation ID
      const response = await this.rabbitMQService.waitForResponseWithTimeout(correlationId);

      if (response.action === 'facility_find_all') {
        res.status(200).json({
          message: 'Facility fetched successfully',
          data: response.response,
        });
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

  @Get('capacity')
  async getAllCapacities(@Req() req, @Res() res) {
    const correlationId = generateUniqueId();

    // Translate the HTTP request into a message
    const message = {
      action: 'find_all_capacity',
      payload: {},
      correlationId,
    };

    try {
      // Publish the login message to the RabbitMQ queue
      this.rabbitMQService
        .publishMessage('jet-queue', message)
        .then(() => console.log('sent'))
        .catch(() => console.log('not sent'));

      // Listen for the response with the specified correlation ID
      const response = await this.rabbitMQService.waitForResponseWithTimeout(correlationId);

      if (response.action === 'capacity_find_all') {
        res.status(200).json({
          message: 'Capacity fetched successfully',
          data: response.response,
        });
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

  @Get('range')
  async getAllRanges(@Req() req, @Res() res) {
    const correlationId = generateUniqueId();

    // Translate the HTTP request into a message
    const message = {
      action: 'find_all_range',
      payload: {},
      correlationId,
    };

    try {
      // Publish the login message to the RabbitMQ queue
      await this.rabbitMQService.publishMessage('jet-queue', message);

      // Listen for the response with the specified correlation ID
      const response = await this.rabbitMQService.waitForResponseWithTimeout(correlationId);

      if (response.action === 'range_find_all') {
        res.status(200).json({
          message: 'Range fetched successfully',
          data: response.response,
        });
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

  @Permissions('CREATE_JET')
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
      const response = await this.rabbitMQService.waitForResponseWithTimeout(correlationId);

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

  @Permissions('UPDATE_JET')
  @Patch(':id')
  async updateJet(
    @Param('id') id: string,
    @Body() credentials: UpdateJetDto,
    @Req() req,
    @Res() res,
  ) {
    const correlationId = generateUniqueId();

    // Translate the HTTP request into a message
    const message = {
      action: 'update_jet',
      payload: { id, credentials },
      correlationId,
    };

    try {
      // Publish the login message to the RabbitMQ queue
      await this.rabbitMQService.publishMessage('jet-queue', message);

      // Listen for the response with the specified correlation ID
      const response = await this.rabbitMQService.waitForResponseWithTimeout(correlationId);

      if (response.action === 'jet_updated') {
        res.status(200).json('Jet updated successfully');
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

  @Permissions('DELETE_JET')
  @Delete(':id')
  async deleteJet(@Param('id') id: string, @Req() req, @Res() res) {
    const correlationId = generateUniqueId();

    // Translate the HTTP request into a message
    const message = {
      action: 'delete_jet',
      payload: +id,
      correlationId,
    };

    try {
      // Publish the login message to the RabbitMQ queue
      await this.rabbitMQService.publishMessage('jet-queue', message);

      // Listen for the response with the specified correlation ID
      const response = await this.rabbitMQService.waitForResponseWithTimeout(correlationId);

      if (response.action === 'jet_deleted') {
        res.status(200).json('Jet deleted successfully');
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

  @Permissions('GET_ONE_JET')
  @Get(':id')
  async getOneJet(@Param('id') id: string, @Req() req, @Res() res) {
    const correlationId = generateUniqueId();

    // Translate the HTTP request into a message
    const message = {
      action: 'find_one_jet',
      payload: +id,
      correlationId,
    };

    try {
      // Publish the login message to the RabbitMQ queue
      await this.rabbitMQService.publishMessage('jet-queue', message);

      // Listen for the response with the specified correlation ID
      const response = await this.rabbitMQService.waitForResponseWithTimeout(correlationId);

      if (response.action === 'jet_find_one') {
        res.status(200).json({
          message: 'Jet fetched successfully',
          data: response.response,
        });
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
