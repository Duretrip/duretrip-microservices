import { Module } from '@nestjs/common';
import { JetRegisteringMicroserviceController } from './jet-registering-microservice.controller';
import { JetRegisteringMicroserviceService } from './jet-registering-microservice.service';

@Module({
  imports: [],
  controllers: [JetRegisteringMicroserviceController],
  providers: [JetRegisteringMicroserviceService],
})
export class JetRegisteringMicroserviceModule {}
