import { Module } from '@nestjs/common';
import { BookAirlineTicketMicroserviceController } from './book-airline-ticket-microservice.controller';
import { BookAirlineTicketMicroserviceService } from './book-airline-ticket-microservice.service';

@Module({
  imports: [],
  controllers: [BookAirlineTicketMicroserviceController],
  providers: [BookAirlineTicketMicroserviceService],
})
export class BookAirlineTicketMicroserviceModule {}
