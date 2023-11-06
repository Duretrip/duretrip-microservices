import { All, Controller, Req, Get } from '@nestjs/common';
import axios from 'axios'; // Import Axios
import { Request } from 'express';

@Controller('api/v1')
export class AppController {
  constructor() { }

  @All('auth-service/*')
  async proxyToAuthService(@Req() req: Request) {
    const AUTH_SERVICE_HOSTNAME = process.env.AUTH_SERVICE_HOSTNAME || 'localhost';
    const AUTH_SERVICE_PORT = process.env.AUTH_SERVICE_PORT || 8000;
    const authServiceURL = `http://${AUTH_SERVICE_HOSTNAME}:${AUTH_SERVICE_PORT}`;
    // const requestURL = `${authServiceURL}/${req.params[0]}`;
    const requestURL = `${authServiceURL}/${req.params[0]}?_=${new Date().getTime()}`;

    try {
      const response = await axios({
        method: req.method,
        url: requestURL,
        headers: req.headers,
        data: req.body,
      });

      return response.data;
    } catch (error) {
      // Handle error as needed
      return error;
    }
  }

  @Get('welcome') // Define a GET route for '/api/v1/welcome'
  getWelcome() {
    return 'Welcome to the DureTrip APIs!';
  }
}
