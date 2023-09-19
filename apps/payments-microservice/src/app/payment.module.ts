import { Module } from '@nestjs/common';

import { AUTH_QUEUE, registerRMQClientOptions, rootConfig } from '@/shared';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rootConfig],
    }),
    ClientsModule.registerAsync(registerRMQClientOptions([AUTH_QUEUE])),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
