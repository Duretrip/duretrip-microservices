import { Controller, ValidationPipe } from '@nestjs/common';

import { EventPattern, Payload } from '@nestjs/microservices';

import { PaymentsMicroserviceService } from './payments-microservice.service';
import { MakePaymentDto } from '@dure-trips/shared/dto';
import { EventPatterns } from '@dure-trips/shared/constants';

@Controller()
export class PaymentsMicroserviceController {
  constructor(
    private readonly paymentsMicroserviceService: PaymentsMicroserviceService,
  ) {}

  @EventPattern(EventPatterns.process_payment)
  handleProcessPayment(@Payload(ValidationPipe) data: MakePaymentDto) {
    this.paymentsMicroserviceService.processPayment(data);
  }
}
