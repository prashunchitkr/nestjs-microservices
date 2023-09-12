import { CREATE_USER, CreateUserDto, GET_USER } from '@/shared';
import { Controller, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(CREATE_USER)
  handleUserCreate(@Payload(ValidationPipe) data: CreateUserDto) {
    return this.appService.createUser(data);
  }

  @MessagePattern(GET_USER)
  handleGetUser(@Payload('userId', ParseUUIDPipe) userId: string) {
    return this.appService.getUser(userId);
  }
}
