import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { PAYMENT_QUEUE, RabbitMQConfig, configKeys } from '@/shared';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PaymentModule } from './app/payment.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);

  const config = app.get(ConfigService);
  const rabbitmqConfig = config.get<RabbitMQConfig>(configKeys.rabbitmq);
  if (!rabbitmqConfig) throw new Error('RabbitMQ not configured');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitmqConfig.url],
      queue: PAYMENT_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  Logger.log(`✨ Payments MicroService Running`);
}

bootstrap();
