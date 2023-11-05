import { Controller, Get } from '@nestjs/common';
import { BookHotelMicroserviceService } from './book-hotel-microservice.service';

@Controller()
export class BookHotelMicroserviceController {
  constructor(
    private readonly bookHotelMicroserviceService: BookHotelMicroserviceService,
  ) {}

  @Get()
  getHello(): string {
    return this.bookHotelMicroserviceService.getHello();
  }
}
