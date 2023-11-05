import { Test, TestingModule } from '@nestjs/testing';
import { SearchHotelMicroserviceController } from './search-hotel-microservice.controller';
import { SearchHotelMicroserviceService } from './search-hotel-microservice.service';

describe('SearchHotelMicroserviceController', () => {
  let searchHotelMicroserviceController: SearchHotelMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SearchHotelMicroserviceController],
      providers: [SearchHotelMicroserviceService],
    }).compile();

    searchHotelMicroserviceController =
      app.get<SearchHotelMicroserviceController>(
        SearchHotelMicroserviceController,
      );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(searchHotelMicroserviceController.getHello()).toBe('Hello World!');
    });
  });
});
