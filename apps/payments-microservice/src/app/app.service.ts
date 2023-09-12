import { AUTH_MICROSERVICE, GET_USER, MakePaymentDto, User } from '@/shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientRedis } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @Inject(AUTH_MICROSERVICE) private readonly authClient: ClientRedis
  ) {}

  processPayment(makePaymentDto: MakePaymentDto) {
    const { userId, amount } = makePaymentDto;
    return this.authClient
      .send<User>(GET_USER, JSON.stringify({ userId }))
      .pipe(
        map((user) => ({
          user,
          amount,
        }))
      );
  }
}
