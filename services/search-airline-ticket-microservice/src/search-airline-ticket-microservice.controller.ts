import { Controller, Get } from '@nestjs/common';
import { SearchAirlineTicketMicroserviceService } from './search-airline-ticket-microservice.service';

@Controller()
export class SearchAirlineTicketMicroserviceController {
  constructor(
    private readonly searchAirlineTicketMicroserviceService: SearchAirlineTicketMicroserviceService,
  ) {}

  @Get()
  getHello(): string {
    return this.searchAirlineTicketMicroserviceService.getHello();
  }
}
