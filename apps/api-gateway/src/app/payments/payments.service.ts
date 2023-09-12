import {
  MakePaymentDto,
  PAYMENT_MICROSERVICE,
  PROCESS_PAYMENT,
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
    return this.paymentClient.send(PROCESS_PAYMENT, makePaymentDto);
  }
}
