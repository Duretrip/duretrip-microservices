import { Module } from '@nestjs/common';
import { AirlineTicketManagementMicroserviceController } from './airline-ticket-management-microservice.controller';
import { AirlineTicketManagementMicroserviceService } from './airline-ticket-management-microservice.service';

@Module({
  imports: [],
  controllers: [AirlineTicketManagementMicroserviceController],
  providers: [AirlineTicketManagementMicroserviceService],
})
export class AirlineTicketManagementMicroserviceModule {}
