import { Test, TestingModule } from '@nestjs/testing';
import { SearchAirlineTicketMicroserviceController } from './search-airline-ticket-microservice.controller';
import { SearchAirlineTicketMicroserviceService } from './search-airline-ticket-microservice.service';

describe('SearchAirlineTicketMicroserviceController', () => {
  let searchAirlineTicketMicroserviceController: SearchAirlineTicketMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SearchAirlineTicketMicroserviceController],
      providers: [SearchAirlineTicketMicroserviceService],
    }).compile();

    searchAirlineTicketMicroserviceController =
      app.get<SearchAirlineTicketMicroserviceController>(
        SearchAirlineTicketMicroserviceController,
      );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(searchAirlineTicketMicroserviceController.getHello()).toBe(
        'Hello World!',
      );
    });
  });
});
