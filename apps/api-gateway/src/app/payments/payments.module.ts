import { PAYMENT_MICROSERVICE, registerRedisClientOptions } from '@/shared';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PaymentsController } from './payments.controller';
import { PaymentService } from './payments.service';

@Module({
  imports: [
    ClientsModule.registerAsync(
      registerRedisClientOptions([PAYMENT_MICROSERVICE])
    ),
  ],
  providers: [PaymentService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
