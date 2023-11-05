import { Test, TestingModule } from '@nestjs/testing';
import { HotelBookingManagementMicroserviceController } from './hotel-booking-management-microservice.controller';
import { HotelBookingManagementMicroserviceService } from './hotel-booking-management-microservice.service';

describe('HotelBookingManagementMicroserviceController', () => {
  let hotelBookingManagementMicroserviceController: HotelBookingManagementMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HotelBookingManagementMicroserviceController],
      providers: [HotelBookingManagementMicroserviceService],
    }).compile();

    hotelBookingManagementMicroserviceController =
      app.get<HotelBookingManagementMicroserviceController>(
        HotelBookingManagementMicroserviceController,
      );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(hotelBookingManagementMicroserviceController.getHello()).toBe(
        'Hello World!',
      );
    });
  });
});
