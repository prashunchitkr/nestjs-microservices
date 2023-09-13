import { ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import { RedisConfig, configKeys } from '../configuration';

export const registerRedisClientOptions = (
  names: symbol[]
): Array<ClientsProviderAsyncOptions> =>
  names.map((name) => ({
    name,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const redisConf = configService.get<RedisConfig>(configKeys.redis);
      if (!redisConf) throw new Error('Redis not configured');
      return {
        transport: Transport.REDIS,
        options: redisConf,
      };
    },
  }));
