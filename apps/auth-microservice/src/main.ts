import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AUTH_QUEUE, setupAppRmq } from '@/shared';
import { AppModule } from './app/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupAppRmq(app, AUTH_QUEUE);

  await app
    .startAllMicroservices()
    .then(() => Logger.log('✨ Auth MicroService Started'));
}

bootstrap();
