/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/auth.module';
import { RedisConfig, configKeys } from '@/shared';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const redisConfig = config.get<RedisConfig>(configKeys.redis);
  if (!redisConfig) throw new Error('Redis not configured');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: redisConfig,
  });

  await app.startAllMicroservices();

  Logger.log('✨ Auth MicroService Started');
}

bootstrap();
