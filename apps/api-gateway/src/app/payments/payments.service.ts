import {
  MakePaymentDto,
  PAYMENT_MICROSERVICE,
  PROCESS_PAYMENT,
  PaymentResponseDto,
} from '@/shared';
import { Inject, Injectable } from '@nestjs/common';

import { ClientRedis, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(PAYMENT_MICROSERVICE)
    private readonly paymentClient: ClientRedis
  ) {}

  makePayment(makePaymentDto: MakePaymentDto) {
    return this.paymentClient
      .send<PaymentResponseDto>(PROCESS_PAYMENT, makePaymentDto)
      .pipe(
        catchError((err) => throwError(() => new RpcException(err.response)))
      );
  }
}
