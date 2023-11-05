import { Module } from '@nestjs/common';
import { SearchAirlineTicketMicroserviceController } from './search-airline-ticket-microservice.controller';
import { SearchAirlineTicketMicroserviceService } from './search-airline-ticket-microservice.service';

@Module({
  imports: [],
  controllers: [SearchAirlineTicketMicroserviceController],
  providers: [SearchAirlineTicketMicroserviceService],
})
export class SearchAirlineTicketMicroserviceModule {}
