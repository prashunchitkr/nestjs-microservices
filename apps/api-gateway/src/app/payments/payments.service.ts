import {
  MakePaymentDto,
  PAYMENT_QUEUE,
  PROCESS_PAYMENT,
  PaymentResponseDto,
} from '@/shared';
import { Inject, Injectable } from '@nestjs/common';

import { ClientRMQ, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(PAYMENT_QUEUE)
    private readonly paymentClient: ClientRMQ
  ) {}

  makePayment(makePaymentDto: MakePaymentDto) {
    return this.paymentClient
      .send<PaymentResponseDto>(PROCESS_PAYMENT, makePaymentDto)
      .pipe(
        catchError((err) => throwError(() => new RpcException(err.response)))
      );
  }
}
