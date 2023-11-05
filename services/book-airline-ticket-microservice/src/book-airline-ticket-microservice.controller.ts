import { Controller, Get } from '@nestjs/common';
import { BookAirlineTicketMicroserviceService } from './book-airline-ticket-microservice.service';

@Controller()
export class BookAirlineTicketMicroserviceController {
  constructor(
    private readonly bookAirlineTicketMicroserviceService: BookAirlineTicketMicroserviceService,
  ) {}

  @Get()
  getHello(): string {
    return this.bookAirlineTicketMicroserviceService.getHello();
  }
}
