import { Injectable } from '@nestjs/common';

@Injectable()
export class BookHotelMicroserviceService {
  getHello(): string {
    return 'Hello World!';
  }
}
