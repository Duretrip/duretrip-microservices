import { Controller } from '@nestjs/common';
import { AirportService } from './airport.service';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Controller()
export class AirportController {
  constructor(
    private readonly airportService: AirportService,
    private readonly rabbitMQService: RabbitMQService
    ) { }

  async onModuleInit() {
    await this.rabbitMQService.connectToRabbitMQ();
    try {
      this.rabbitMQService.consumeMessages('integration-queue', async (message) => {
        // Find All Jets
        if (message.action === 'get_all_airports') {
          const payload = message.payload;

          const response = await this.airportService.findAll();

          this.rabbitMQService.publishMessage('api-gateway-queue', {
            correlationId: message?.correlationId,
            action: 'all_airports',
            response,
          });
        }
      })
    } catch (err) {

    }
  }
}
