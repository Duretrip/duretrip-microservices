import { Controller, Get } from '@nestjs/common';
import { JetBookingManagementMicroserviceService } from './jet-booking-management-microservice.service';

@Controller()
export class JetBookingManagementMicroserviceController {
  constructor(
    private readonly jetBookingManagementMicroserviceService: JetBookingManagementMicroserviceService,
  ) {}

  @Get()
  getHello(): string {
    return this.jetBookingManagementMicroserviceService.getHello();
  }
}
