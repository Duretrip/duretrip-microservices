import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionTitleList, StatusCodesList } from '../constants';

export class ConflictException extends HttpException {
  constructor(message?: string, code?: number) {
    super(
      {
        message: message || ExceptionTitleList.Conflict,
        code: code || StatusCodesList.Coflict,
        statusCode: HttpStatus.CONFLICT,
        error: true,
      },
      HttpStatus.CONFLICT,
    );
  }
}
