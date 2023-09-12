import { PAYMENT_MICROSERVICE } from '@/shared';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentService } from './payments.service';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PAYMENT_MICROSERVICE,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
  providers: [PaymentService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
