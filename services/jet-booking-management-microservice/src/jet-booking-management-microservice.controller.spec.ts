import { Test, TestingModule } from '@nestjs/testing';
import { JetBookingManagementMicroserviceController } from './jet-booking-management-microservice.controller';
import { JetBookingManagementMicroserviceService } from './jet-booking-management-microservice.service';

describe('JetBookingManagementMicroserviceController', () => {
  let jetBookingManagementMicroserviceController: JetBookingManagementMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JetBookingManagementMicroserviceController],
      providers: [JetBookingManagementMicroserviceService],
    }).compile();

    jetBookingManagementMicroserviceController =
      app.get<JetBookingManagementMicroserviceController>(
        JetBookingManagementMicroserviceController,
      );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(jetBookingManagementMicroserviceController.getHello()).toBe(
        'Hello World!',
      );
    });
  });
});
