import { AUTH_QUEUE, registerRMQClientOptions } from '@/shared';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ClientsModule.registerAsync(registerRMQClientOptions([AUTH_QUEUE])),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
