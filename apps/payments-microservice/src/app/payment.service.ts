import { AUTH_MICROSERVICE, GET_USER, MakePaymentDto, User } from '@/shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientRedis, RpcException } from '@nestjs/microservices';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @Inject(AUTH_MICROSERVICE) private readonly authClient: ClientRedis
  ) {}

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
