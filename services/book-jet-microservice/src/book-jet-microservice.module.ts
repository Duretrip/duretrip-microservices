import { Module } from '@nestjs/common';
import { BookJetMicroserviceController } from './book-jet-microservice.controller';
import { BookJetMicroserviceService } from './book-jet-microservice.service';

@Module({
  imports: [],
  controllers: [BookJetMicroserviceController],
  providers: [BookJetMicroserviceService],
})
export class BookJetMicroserviceModule {}
