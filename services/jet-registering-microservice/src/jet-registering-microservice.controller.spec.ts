import { Test, TestingModule } from '@nestjs/testing';
import { JetRegisteringMicroserviceController } from './jet-registering-microservice.controller';
import { JetRegisteringMicroserviceService } from './jet-registering-microservice.service';

describe('JetRegisteringMicroserviceController', () => {
  let jetRegisteringMicroserviceController: JetRegisteringMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JetRegisteringMicroserviceController],
      providers: [JetRegisteringMicroserviceService],
    }).compile();

    jetRegisteringMicroserviceController =
      app.get<JetRegisteringMicroserviceController>(
        JetRegisteringMicroserviceController,
      );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(jetRegisteringMicroserviceController.getHello()).toBe(
        'Hello World!',
      );
    });
  });
});
