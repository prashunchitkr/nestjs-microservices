import { AUTH_MICROSERVICE, GET_USER, MakePaymentDto, User } from '@/shared';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientRedis } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @Inject(AUTH_MICROSERVICE) private readonly authClient: ClientRedis
  ) {}

  processPayment(makePaymentDto: MakePaymentDto) {
    const { userId, amount } = makePaymentDto;
    this.authClient
      .send<User>(GET_USER, JSON.stringify({ userId }))
      .subscribe((user) => {
        this.logger.debug(
          `Process payment for user ${user.name} -- amount: ${amount}`
        );
      });
  }
}
