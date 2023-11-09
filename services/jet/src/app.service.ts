import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async sayHi() {
    return 'Hello Jet APIs';
  }
}
