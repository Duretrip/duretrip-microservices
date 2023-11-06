import { All, Controller, Req, Get } from '@nestjs/common';
import axios from 'axios'; // Import Axios
import { Request } from 'express';
import * as url from 'url';

@Controller('api/v1')
export class AppController {
  constructor() { }

  @All('auth-service/*')
  async proxyToAuthService(@Req() req: Request) {
    const AUTH_SERVICE_HOSTNAME = process.env.AUTH_SERVICE_HOSTNAME || 'localhost';
    const AUTH_SERVICE_PORT = process.env.AUTH_SERVICE_PORT || 8000;
    // Parse the request URL
    // Parse the URL
    const originalUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const newUrl = originalUrl.replace('/api/v1/auth-service', '');
    
    const url = new URL(newUrl);

    // Get the parts you need
    const path = url.pathname;  // Get the path, e.g., "/path/to/resource"
    const query = url.search;   // Get the query string, e.g., "?query=value"
    const fragment = url.hash; // Get the fragment, e.g., "#fragment"

    // Build the modified URL
    const newUrlString = `http://${AUTH_SERVICE_HOSTNAME}${AUTH_SERVICE_PORT ? `:${AUTH_SERVICE_PORT}` : ""}${path}${query}${fragment}`;

    try {
      const response = await axios({
        method: req.method,
        url: newUrlString,
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
