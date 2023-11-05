import { Controller, Get } from '@nestjs/common';
import { HotelBookingManagementMicroserviceService } from './hotel-booking-management-microservice.service';

@Controller()
export class HotelBookingManagementMicroserviceController {
  constructor(
    private readonly hotelBookingManagementMicroserviceService: HotelBookingManagementMicroserviceService,
  ) {}

  @Get()
  getHello(): string {
    return this.hotelBookingManagementMicroserviceService.getHello();
  }
}
