import {
  MakePaymentDto,
  PAYMENT_MICROSERVICE,
  PROCESS_PAYMENT,
  PaymentResponseDto,
} from '@/shared';
import { Inject, Injectable } from '@nestjs/common';

import { ClientRedis } from '@nestjs/microservices';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(PAYMENT_MICROSERVICE)
    private readonly paymentClient: ClientRedis
  ) {}

  makePayment(makePaymentDto: MakePaymentDto) {
    return this.paymentClient.send<PaymentResponseDto>(
      PROCESS_PAYMENT,
      makePaymentDto
    );
  }
}
