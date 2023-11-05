import { Controller, Get } from '@nestjs/common';
import { AirlineTicketManagementMicroserviceService } from './airline-ticket-management-microservice.service';

@Controller()
export class AirlineTicketManagementMicroserviceController {
  constructor(
    private readonly airlineTicketManagementMicroserviceService: AirlineTicketManagementMicroserviceService,
  ) {}

  @Get()
  getHello(): string {
    return this.airlineTicketManagementMicroserviceService.getHello();
  }
}
