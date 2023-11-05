import { Module } from '@nestjs/common';
import { SearchJetMicroserviceController } from './search-jet-microservice.controller';
import { SearchJetMicroserviceService } from './search-jet-microservice.service';

@Module({
  imports: [],
  controllers: [SearchJetMicroserviceController],
  providers: [SearchJetMicroserviceService],
})
export class SearchJetMicroserviceModule {}
