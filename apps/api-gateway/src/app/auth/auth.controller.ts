import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { APPLICATION_JSON, CreateUserDto } from '@/shared';
import { ApiConsumes, ApiProduces } from '@nestjs/swagger';

@Controller('auth')
@ApiConsumes(APPLICATION_JSON)
@ApiProduces(APPLICATION_JSON)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
}
