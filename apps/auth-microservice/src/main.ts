import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/auth.module';
import { AUTH_QUEUE, RabbitMQConfig, RedisConfig, configKeys } from '@/shared';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const rabbitmqConfig = config.get<RabbitMQConfig>(configKeys.rabbitmq);
  if (!rabbitmqConfig) throw new Error('RabbitMQ not configured');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitmqConfig.url],
      queue: AUTH_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  });

  await app
    .startAllMicroservices()
    .then(() => Logger.log('✨ Auth MicroService Started'));
}

bootstrap();
