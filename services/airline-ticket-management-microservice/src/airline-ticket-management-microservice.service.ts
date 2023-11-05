import { Injectable } from '@nestjs/common';

@Injectable()
export class AirlineTicketManagementMicroserviceService {
  getHello(): string {
    return 'Hello World!';
  }
}
