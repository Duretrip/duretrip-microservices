import { Controller, Get } from '@nestjs/common';
import { JetRegisteringMicroserviceService } from './jet-registering-microservice.service';

@Controller()
export class JetRegisteringMicroserviceController {
  constructor(
    private readonly jetRegisteringMicroserviceService: JetRegisteringMicroserviceService,
  ) {}

  @Get()
  getHello(): string {
    return this.jetRegisteringMicroserviceService.getHello();
  }
}
