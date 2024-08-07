import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { GatewayConfig, RpcExceptionFilter, configKeys } from '@/shared';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get(ConfigService);
  const { host, port } = appConfig.get<GatewayConfig>(configKeys.gateway);
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new RpcExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

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
    `🚀 Api gateway is running on: http://${host}:${port}/${globalPrefix}`
  );
}

bootstrap();
