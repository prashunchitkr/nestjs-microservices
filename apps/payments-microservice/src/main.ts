import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { PAYMENT_QUEUE, setupAppRmq } from '@/shared';
import { PaymentModule } from './app/payment.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);

  setupAppRmq(app, PAYMENT_QUEUE);

  await app.startAllMicroservices();
  Logger.log(`✨ Payments MicroService Running`);
}

bootstrap();
