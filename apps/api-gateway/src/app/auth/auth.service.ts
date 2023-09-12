import { AUTH_MICROSERVICE, CREATE_USER, CreateUserDto, User } from '@/shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientRedis } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @Inject(AUTH_MICROSERVICE) private readonly authClient: ClientRedis
  ) {}

  createUser(createUserDto: CreateUserDto) {
    return this.authClient.send<User>(CREATE_USER, createUserDto);
  }
}
