import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitMQConfig, configKeys } from '../configuration';
import { type Queue } from '../consts';

export const setupAppRmq = (app: INestApplication, queue: Queue) => {
  const config = app.get(ConfigService);
  const rabbitmqConfig = config.get<RabbitMQConfig>(configKeys.rabbitmq);
  if (!rabbitmqConfig) throw new Error('RabbitMQ not configured');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitmqConfig.url],
      queue,
      queueOptions: {
        durable: false,
      },
    },
  });
};
