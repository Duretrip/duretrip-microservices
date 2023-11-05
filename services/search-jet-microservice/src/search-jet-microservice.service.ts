import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchJetMicroserviceService {
  getHello(): string {
    return 'Hello World!';
  }
}
