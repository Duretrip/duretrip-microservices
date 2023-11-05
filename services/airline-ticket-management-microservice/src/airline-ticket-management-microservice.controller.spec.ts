import { Test, TestingModule } from '@nestjs/testing';
import { AirlineTicketManagementMicroserviceController } from './airline-ticket-management-microservice.controller';
import { AirlineTicketManagementMicroserviceService } from './airline-ticket-management-microservice.service';

describe('AirlineTicketManagementMicroserviceController', () => {
  let airlineTicketManagementMicroserviceController: AirlineTicketManagementMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AirlineTicketManagementMicroserviceController],
      providers: [AirlineTicketManagementMicroserviceService],
    }).compile();

    airlineTicketManagementMicroserviceController =
      app.get<AirlineTicketManagementMicroserviceController>(
        AirlineTicketManagementMicroserviceController,
      );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(airlineTicketManagementMicroserviceController.getHello()).toBe(
        'Hello World!',
      );
    });
  });
});
