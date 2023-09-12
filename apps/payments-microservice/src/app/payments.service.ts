import { AUTH_MICROSERVICE, GET_USER, MakePaymentDto, User } from '@/shared';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ClientRedis, RpcException } from '@nestjs/microservices';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @Inject(AUTH_MICROSERVICE) private readonly authClient: ClientRedis
  ) {}

  processPayment(makePaymentDto: MakePaymentDto) {
    const { userId, amount } = makePaymentDto;
    return this.authClient.send<User>(GET_USER, { userId }).pipe(
      tap((user) => this.logger.debug('User response:', user)),
      map((user) => {
        if (!user) throw new RpcException(new NotFoundException());
        return {
          user,
          amount,
        };
      }),
      catchError((err) => throwError(() => new RpcException(err)))
    );
  }
}
