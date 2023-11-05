import { Module } from '@nestjs/common';
import { HotelBookingManagementMicroserviceController } from './hotel-booking-management-microservice.controller';
import { HotelBookingManagementMicroserviceService } from './hotel-booking-management-microservice.service';

@Module({
  imports: [],
  controllers: [HotelBookingManagementMicroserviceController],
  providers: [HotelBookingManagementMicroserviceService],
})
export class HotelBookingManagementMicroserviceModule {}
