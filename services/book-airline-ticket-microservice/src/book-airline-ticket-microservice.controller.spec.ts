import { Test, TestingModule } from '@nestjs/testing';
import { BookAirlineTicketMicroserviceController } from './book-airline-ticket-microservice.controller';
import { BookAirlineTicketMicroserviceService } from './book-airline-ticket-microservice.service';

describe('BookAirlineTicketMicroserviceController', () => {
  let bookAirlineTicketMicroserviceController: BookAirlineTicketMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookAirlineTicketMicroserviceController],
      providers: [BookAirlineTicketMicroserviceService],
    }).compile();

    bookAirlineTicketMicroserviceController =
      app.get<BookAirlineTicketMicroserviceController>(
        BookAirlineTicketMicroserviceController,
      );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(bookAirlineTicketMicroserviceController.getHello()).toBe(
        'Hello World!',
      );
    });
  });
});
