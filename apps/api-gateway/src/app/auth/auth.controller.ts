import { APPLICATION_JSON, CreateUserDto } from '@/shared';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiConsumes, ApiProduces, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
@ApiConsumes(APPLICATION_JSON)
@ApiProduces(APPLICATION_JSON)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
}
