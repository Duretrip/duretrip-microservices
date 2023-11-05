import { Controller, Get } from '@nestjs/common';
import { SearchJetMicroserviceService } from './search-jet-microservice.service';

@Controller()
export class SearchJetMicroserviceController {
  constructor(
    private readonly searchJetMicroserviceService: SearchJetMicroserviceService,
  ) {}

  @Get()
  getHello(): string {
    return this.searchJetMicroserviceService.getHello();
  }
}
