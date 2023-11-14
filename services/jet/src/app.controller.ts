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
        // if (message.action === 'register_jet') {
        //   const payload = message.payload;
        //   const response = this.appService.sayHi();
        //   this.rabbitMQService.publishMessage('api-gateway-queue', {
        //     correlationId: message?.correlationId,
        //     action: 'jet_created',
        //     response,
        //   });
        // }

        // Find All Jets
        if (message.action === 'find_all_jet') {
          const payload = message.payload;
          console.log('message', message);
          const response = await this.jetsService.findAll();
          console.log(response);

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'jet_find_all',
            response,
          });
        }

        // Find One Jet
        if (message.action === 'find_one_jet') {
          const payload = message.payload;
          const response = this.jetsService.findOne(payload);
          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'jet_find_one',
            response,
          });
        }

        // Create  Jet
        if (message.action === 'create_jet') {
          const payload = message.payload;
          console.log('payload', payload);

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
          console.log('payload', payload);

          const response = await this.jetsService.update(payload.id, payload);
          await this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'jet_updated',
            response,
          });
        }

        // Delete  Jet
        if (message.action === 'delete_jet') {
          const payload = message.payload;
          console.log('payload', payload);

          const response = await this.jetsService.remove(payload);
          await this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'jet_deleted',
            response,
          });
        }

        // Find All Facilities
        if (message.action === 'find_all_facility') {
          const payload = message.payload;
          console.log('payload', payload);
          console.log('message', message);
          const response = await this.facilityService.findAll();
          console.log(response);

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'facility_find_all',
            response,
          });
        }
        // Find All Ranges
        if (message.action === 'find_all_range') {
          const payload = message.payload;
          console.log('message', message);
          const response = await this.rangeService.findAll();
          console.log(response);

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'range_find_all',
            response,
          });
        }

        // Find All Capacities
        if (message.action === 'find_all_capacity') {
          const payload = message.payload;
          console.log('message', message);
          const response = await this.capacityService.findAll();
          console.log(response);

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'capacity_find_all',
            response,
          });
        }
      });
    } catch (error) {
      console.log({ error: JSON.stringify(error) });
    }
  }
}
