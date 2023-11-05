import { Test, TestingModule } from '@nestjs/testing';
import { HotelRegisteringMicroserviceController } from './hotel-registering-microservice.controller';
import { HotelRegisteringMicroserviceService } from './hotel-registering-microservice.service';

describe('HotelRegisteringMicroserviceController', () => {
  let hotelRegisteringMicroserviceController: HotelRegisteringMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HotelRegisteringMicroserviceController],
      providers: [HotelRegisteringMicroserviceService],
    }).compile();

    hotelRegisteringMicroserviceController =
      app.get<HotelRegisteringMicroserviceController>(
        HotelRegisteringMicroserviceController,
      );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(hotelRegisteringMicroserviceController.getHello()).toBe(
        'Hello World!',
      );
    });
  });
});
