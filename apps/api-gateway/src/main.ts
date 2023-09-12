/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { GatewayConfig, configKeys } from '@/shared';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  const appConfig = app.get(ConfigService);
  const { host, port } = appConfig.get<GatewayConfig>(configKeys.gateway);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Microservices Test')
    .setDescription('Api endpoints for testing microservices in Nest.js')
    .setVersion('0.1.0')
    .addServer(`http://${host}:${port}`)
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(port);
  Logger.log(
    `🚀 Api gateway is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
