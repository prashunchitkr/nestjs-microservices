import { ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import { RabbitMQConfig, configKeys } from '../configuration';
import { AUTH_QUEUE, PAYMENT_QUEUE } from '../consts';

type Queue = typeof AUTH_QUEUE | typeof PAYMENT_QUEUE;

export const registerRMQClientOptions = (
  qNames: Queue[]
): Array<ClientsProviderAsyncOptions> =>
  qNames.map((qName) => ({
    name: qName,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const rmqConf = configService.get<RabbitMQConfig>(configKeys.rabbitmq);
      if (!rmqConf) throw new Error('RabbitMQ not configured');
      return {
        transport: Transport.RMQ,
        options: {
          urls: [rmqConf.url],
          queue: qName,
          queueOptions: {
            durable: false,
          },
        },
      };
    },
  }));
