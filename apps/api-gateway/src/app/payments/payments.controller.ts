import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { APPLICATION_JSON, MakePaymentDto } from '@/shared';
import { ApiConsumes, ApiProduces } from '@nestjs/swagger';

@Controller('payments')
@ApiProduces(APPLICATION_JSON)
@ApiConsumes(APPLICATION_JSON)
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('pay')
  makePayment(@Body(ValidationPipe) MakePaymentDto: MakePaymentDto) {
    return this.paymentService.makePayment(MakePaymentDto);
  }
}
