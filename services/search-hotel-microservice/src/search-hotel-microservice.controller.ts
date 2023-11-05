import { Controller, Get } from '@nestjs/common';
import { SearchHotelMicroserviceService } from './search-hotel-microservice.service';

@Controller()
export class SearchHotelMicroserviceController {
  constructor(
    private readonly searchHotelMicroserviceService: SearchHotelMicroserviceService,
  ) {}

  @Get()
  getHello(): string {
    return this.searchHotelMicroserviceService.getHello();
  }
}
