import { Module } from '@nestjs/common';
import { BookHotelMicroserviceController } from './book-hotel-microservice.controller';
import { BookHotelMicroserviceService } from './book-hotel-microservice.service';

@Module({
  imports: [],
  controllers: [BookHotelMicroserviceController],
  providers: [BookHotelMicroserviceService],
})
export class BookHotelMicroserviceModule {}
