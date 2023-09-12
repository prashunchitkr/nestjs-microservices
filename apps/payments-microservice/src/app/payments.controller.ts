import { Controller, Logger } from '@nestjs/common';

import { MakePaymentDto, PROCESS_PAYMENT } from '@/shared';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './payments.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @EventPattern(PROCESS_PAYMENT)
  handleProcessPayment(@Payload() data: MakePaymentDto) {
    return this.appService.processPayment(data);
  }
}
