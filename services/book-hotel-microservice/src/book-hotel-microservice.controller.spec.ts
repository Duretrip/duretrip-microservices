import { Test, TestingModule } from '@nestjs/testing';
import { BookHotelMicroserviceController } from './book-hotel-microservice.controller';
import { BookHotelMicroserviceService } from './book-hotel-microservice.service';

describe('BookHotelMicroserviceController', () => {
  let bookHotelMicroserviceController: BookHotelMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookHotelMicroserviceController],
      providers: [BookHotelMicroserviceService],
    }).compile();

    bookHotelMicroserviceController = app.get<BookHotelMicroserviceController>(
      BookHotelMicroserviceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(bookHotelMicroserviceController.getHello()).toBe('Hello World!');
    });
  });
});
