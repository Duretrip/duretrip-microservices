import { Module } from '@nestjs/common';
import { SearchHotelMicroserviceController } from './search-hotel-microservice.controller';
import { SearchHotelMicroserviceService } from './search-hotel-microservice.service';

@Module({
  imports: [],
  controllers: [SearchHotelMicroserviceController],
  providers: [SearchHotelMicroserviceService],
})
export class SearchHotelMicroserviceModule {}
