import { Controller, Get } from '@nestjs/common';
import { BookJetMicroserviceService } from './book-jet-microservice.service';

@Controller()
export class BookJetMicroserviceController {
  constructor(
    private readonly bookJetMicroserviceService: BookJetMicroserviceService,
  ) {}

  @Get()
  getHello(): string {
    return this.bookJetMicroserviceService.getHello();
  }
}
