import { AUTH_QUEUE, CREATE_USER, CreateUserDto, User } from '@/shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(@Inject(AUTH_QUEUE) private readonly authClient: ClientRMQ) {}

  createUser(createUserDto: CreateUserDto) {
    return this.authClient.send<User>(CREATE_USER, createUserDto);
  }
}
