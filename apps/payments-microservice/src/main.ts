/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PaymentModule } from './app/payment.module';
import { ConfigService } from '@nestjs/config';
import { RedisConfig, configKeys } from '@/shared';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);

  const config = app.get(ConfigService);
  const redisConfig = config.get<RedisConfig>(configKeys.redis);
  if (!redisConfig) throw new Error('Redis not configured');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: redisConfig,
  });

  await app.startAllMicroservices();
  Logger.log(`✨ Payments MicroService Running`);
}

bootstrap();
