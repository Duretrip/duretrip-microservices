import { Test, TestingModule } from '@nestjs/testing';
import { SearchJetMicroserviceController } from './search-jet-microservice.controller';
import { SearchJetMicroserviceService } from './search-jet-microservice.service';

describe('SearchJetMicroserviceController', () => {
  let searchJetMicroserviceController: SearchJetMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SearchJetMicroserviceController],
      providers: [SearchJetMicroserviceService],
    }).compile();

    searchJetMicroserviceController = app.get<SearchJetMicroserviceController>(
      SearchJetMicroserviceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(searchJetMicroserviceController.getHello()).toBe('Hello World!');
    });
  });
});
