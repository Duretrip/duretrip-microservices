import { Module } from '@nestjs/common';
import { JetBookingManagementMicroserviceController } from './jet-booking-management-microservice.controller';
import { JetBookingManagementMicroserviceService } from './jet-booking-management-microservice.service';

@Module({
  imports: [],
  controllers: [JetBookingManagementMicroserviceController],
  providers: [JetBookingManagementMicroserviceService],
})
export class JetBookingManagementMicroserviceModule {}
