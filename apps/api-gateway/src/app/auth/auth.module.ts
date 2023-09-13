import { AUTH_MICROSERVICE, registerRedisClientOptions } from '@/shared';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ClientsModule.registerAsync(
      registerRedisClientOptions([AUTH_MICROSERVICE])
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
