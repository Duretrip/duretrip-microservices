import { Module } from '@nestjs/common';
import { HotelRegisteringMicroserviceController } from './hotel-registering-microservice.controller';
import { HotelRegisteringMicroserviceService } from './hotel-registering-microservice.service';

@Module({
  imports: [],
  controllers: [HotelRegisteringMicroserviceController],
  providers: [HotelRegisteringMicroserviceService],
})
export class HotelRegisteringMicroserviceModule {}
