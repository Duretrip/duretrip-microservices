import { Injectable } from '@nestjs/common';

@Injectable()
export class JetRegisteringMicroserviceService {
  getHello(): string {
    return 'Hello World!';
  }
}
