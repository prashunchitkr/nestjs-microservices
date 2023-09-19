import { AUTH_QUEUE, GET_USER, MakePaymentDto, User } from '@/shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientRMQ, RpcException } from '@nestjs/microservices';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(@Inject(AUTH_QUEUE) private readonly authClient: ClientRMQ) {}

  processPayment(makePaymentDto: MakePaymentDto) {
    const { userId, amount } = makePaymentDto;
    return this.authClient.send<User>(GET_USER, { userId }).pipe(
      catchError((err) => throwError(() => new RpcException(err))),
      tap((user) => this.logger.debug('User response:', user)),
      map((user) => {
        return {
          user,
          amount,
        };
      })
    );
  }
}
