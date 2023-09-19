import { PAYMENT_QUEUE, registerRMQClientOptions } from '@/shared';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PaymentsController } from './payments.controller';
import { PaymentService } from './payments.service';

@Module({
  imports: [
    ClientsModule.registerAsync(registerRMQClientOptions([PAYMENT_QUEUE])),
  ],
  providers: [PaymentService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
