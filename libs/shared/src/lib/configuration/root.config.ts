import { GatewayConfig, gatewayConfig } from './gateway.config';
import { RabbitMQConfig, rabbitMQConfig } from './rabbitmq.config';
import { RedisConfig, redisConfig } from './redis.config';

export interface RootConfig {
  gateway: GatewayConfig;
  redis: RedisConfig;
  rabbitmq: RabbitMQConfig;
}

export const rootConfig = (): RootConfig => ({
  gateway: gatewayConfig(),
  redis: redisConfig(),
  rabbitmq: rabbitMQConfig(),
});

export const configKeys: Record<keyof RootConfig, keyof RootConfig> = {
  gateway: 'gateway',
  redis: 'redis',
  rabbitmq: 'rabbitmq',
};
