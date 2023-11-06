import { All, Controller, Req, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { map } from 'rxjs/operators';

@Controller('api/v1')
export class AppController {
  constructor(private readonly httpService: HttpService) { }

  @All('auth-service/*')
  async proxyToAuthService(@Req() req: Request) {
    const AUTH_SERVICE_HOSTNAME = process.env.AUTH_SERVICE_HOSTNAME || 'localhost';
    const AUTH_SERVICE_PORT = process.env.AUTH_SERVICE_PORT || 8000;
    const authServiceURL = `http://${AUTH_SERVICE_HOSTNAME}:${AUTH_SERVICE_PORT}`;
    const requestURL = `${authServiceURL}/${req.params[0]}`;

    try {
      const response = this.httpService.request({
        method: req.method,
        url: requestURL,
        headers: req.headers,
        data: req.body,
      });

      return response.pipe(
        map((axiosResponse) => axiosResponse.data)
      );
    } catch (error) {
      console.log('error');
      
      // Handle error
      // throw ('Error: ' + error.message);
    }
  }

  @Get('welcome') // Define a GET route for '/api/v1/welcome'
  getWelcome() {
    return 'Welcome to the DureTrip APIs!';
  }
}
