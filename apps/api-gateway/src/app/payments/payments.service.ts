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
    this.paymentClient.emit(PROCESS_PAYMENT, JSON.stringify(makePaymentDto));
  }
}
