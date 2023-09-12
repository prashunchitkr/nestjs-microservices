import { Controller, ValidationPipe } from '@nestjs/common';

import { MakePaymentDto, PROCESS_PAYMENT } from '@/shared';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(PROCESS_PAYMENT)
  handleProcessPayment(@Payload(ValidationPipe) data: MakePaymentDto) {
    this.appService.processPayment(data);
  }
}
