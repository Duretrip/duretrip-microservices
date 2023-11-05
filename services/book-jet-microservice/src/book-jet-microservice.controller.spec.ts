import { Test, TestingModule } from '@nestjs/testing';
import { BookJetMicroserviceController } from './book-jet-microservice.controller';
import { BookJetMicroserviceService } from './book-jet-microservice.service';

describe('BookJetMicroserviceController', () => {
  let bookJetMicroserviceController: BookJetMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookJetMicroserviceController],
      providers: [BookJetMicroserviceService],
    }).compile();

    bookJetMicroserviceController = app.get<BookJetMicroserviceController>(
      BookJetMicroserviceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(bookJetMicroserviceController.getHello()).toBe('Hello World!');
    });
  });
});
