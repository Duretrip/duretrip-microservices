import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { JetsService } from './jets/jets.service';
import { CapacityService } from './capacity/capacity.service';
import { FacilityService } from './facility/facility.service';
import { RangeService } from './range/range.service';

@Controller()
export class AppController {
  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly appService: AppService,
    private readonly jetsService: JetsService,
    private readonly capacityService: CapacityService,
    private readonly facilityService: FacilityService,
    private readonly rangeService: RangeService,
  ) {}
  async onModuleInit() {
    await this.rabbitMQService.connectToRabbitMQ();
    try {
      this.rabbitMQService.consumeMessages('jet-queue', async (message) => {
        // Find All Jets
        if (message.action === 'find_all_jet') {
          const payload = message.payload;

          const response = await this.jetsService.findAll();

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'jet_find_all',
            response,
          });
        }

        // Find One Jet
        if (message.action === 'find_one_jet') {
          console.log('Why always running', message);

          const payload = message.payload;
          const response = await this.jetsService.findOne(payload);

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'jet_find_one',
            response,
          });
        }

        // Create  Jet
        if (message.action === 'create_jet') {
          const payload = message.payload;

          const response = await this.jetsService.create(payload, 2);
          await this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'jet_created',
            response,
          });
        }

        // Update  Jet
        if (message.action === 'update_jet') {
          const payload = message.payload;

          const response = await this.jetsService.update(
            Number(payload.id),
            payload.credentials,
          );
          await this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'jet_updated',
            response,
          });
        }

        // Delete  Jet
        if (message.action === 'delete_jet') {
          const payload = message.payload;

          const response = await this.jetsService.remove(Number(payload));
          await this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'jet_deleted',
            response,
          });
        }

        // Find All Facilities
        if (message.action === 'find_all_facility') {
          const payload = message.payload;

          const response = await this.facilityService.findAll();

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'facility_find_all',
            response,
          });
        }
        // Find One Facility
        if (message.action === 'find_one_facility') {
          const payload = message.payload;

          const response = await this.facilityService.findOne(payload);

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'facility_find_one',
            response,
          });
        }
        // Create Facility
        if (message.action === 'create_facility') {
          const payload = message.payload;

          const response = await this.facilityService.create(payload);

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'facility_created',
            response,
          });
        }
        // Update Facility
        if (message.action === 'update_facility') {
          const payload = message.payload;

          const response = await this.facilityService.update(
            Number(payload.id),
            payload.credentials,
          );

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'facility_updated',
            response,
          });
        }
        // Delete Facility
        if (message.action === 'delete_facility') {
          const payload = message.payload;

          const response = await this.facilityService.remove(Number(payload));

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'facility_deleted',
            response,
          });
        }
        // Find All Ranges
        if (message.action === 'find_all_range') {
          const payload = message.payload;

          const response = await this.rangeService.findAll();

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'range_find_all',
            response,
          });
        }

        // Find One Range
        if (message.action === 'find_one_range') {
          const payload = message.payload;

          const response = await this.rangeService.findOne(payload);

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'range_find_one',
            response,
          });
        }
        // Create range
        if (message.action === 'create_range') {
          const payload = message.payload;

          const response = await this.rangeService.create(payload);

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'range_created',
            response,
          });
        }
        // Update range
        if (message.action === 'update_range') {
          const payload = message.payload;

          const response = await this.rangeService.update(
            Number(payload.id),
            payload.credentials,
          );

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'range_updated',
            response,
          });
        }
        // Delete range
        if (message.action === 'delete_range') {
          const payload = message.payload;

          const response = await this.rangeService.remove(Number(payload));

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'range_deleted',
            response,
          });
        }

        // Find All Capacities
        if (message.action === 'find_all_capacity') {
          const payload = message.payload;

          const response = await this.capacityService.findAll();

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'capacity_find_all',
            response,
          });
        }
        // Find One Capacity
        if (message.action === 'find_one_capacity') {
          const payload = message.payload;

          const response = await this.capacityService.findOne(payload);

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'capacity_find_one',
            response,
          });
        }
        // Create capacity
        if (message.action === 'create_capacity') {
          const payload = message.payload;

          const response = await this.capacityService.create(payload);

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'capacity_created',
            response,
          });
        }
        // Update capacity
        if (message.action === 'update_capacity') {
          const payload = message.payload;

          const response = await this.capacityService.update(
            Number(payload.id),
            payload.credentials,
          );

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'capacity_updated',
            response,
          });
        }
        // Delete capacity
        if (message.action === 'delete_capacity') {
          const payload = message.payload;

          const response = await this.capacityService.remove(Number(payload));

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'capacity_deleted',
            response,
          });
        }
      });
    } catch (error) {
      console.log({ error: JSON.stringify(error) });
    }
  }
}
