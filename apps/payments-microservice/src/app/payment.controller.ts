import { Controller, Logger } from '@nestjs/common';

import { MakePaymentDto, PROCESS_PAYMENT } from '@/shared';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);
  constructor(private readonly appService: PaymentService) {}

  @EventPattern(PROCESS_PAYMENT)
  handleProcessPayment(@Payload() data: MakePaymentDto) {
    return this.appService.processPayment(data);
  }
}
