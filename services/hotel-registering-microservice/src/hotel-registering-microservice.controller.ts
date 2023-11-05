import { Controller, Get } from '@nestjs/common';
import { HotelRegisteringMicroserviceService } from './hotel-registering-microservice.service';

@Controller()
export class HotelRegisteringMicroserviceController {
  constructor(
    private readonly hotelRegisteringMicroserviceService: HotelRegisteringMicroserviceService,
  ) {}

  @Get()
  getHello(): string {
    return this.hotelRegisteringMicroserviceService.getHello();
  }
}
