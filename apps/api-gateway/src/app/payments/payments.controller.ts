import { APPLICATION_JSON, MakePaymentDto } from '@/shared';
import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiConsumes, ApiProduces, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payments.service';

@ApiTags('Payment')
@Controller('payments')
@ApiProduces(APPLICATION_JSON)
@ApiConsumes(APPLICATION_JSON)
export class PaymentsController {
  private readonly logger = new Logger(PaymentsController.name);
  constructor(private readonly paymentService: PaymentService) {}

  @Post('pay')
  makePayment(@Body() makePaymentDto: MakePaymentDto) {
    return this.paymentService.makePayment(makePaymentDto);
  }
}
