import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MakePaymentDto } from '@dure-trips/shared/dto';
import { AuthGuard } from '@dure-trips/shared/guards';
import { UserInterceptor } from '@dure-trips/shared/interceptors';
import { UserRequest } from '@dure-trips/shared/interfaces';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Post('pay')
  makePayment(
    @Req() req: UserRequest,
    @Body(ValidationPipe) makePaymetDto: MakePaymentDto,
  ) {
    if (!req?.user) {
      throw new BadRequestException();
    }
    console.log('Request User', req.user);
    const user = req?.user;
    return this.paymentService.makePayment({
      amount: makePaymetDto.amount,
      ...user,
    });
    // return { success: true, message: 'Payment created', data: payment };
  }
}
