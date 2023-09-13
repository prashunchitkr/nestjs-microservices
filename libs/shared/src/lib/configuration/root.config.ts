import { GatewayConfig, gatewayConfig } from './gateway.config';
import { RedisConfig, redisConfig } from './redis.config';

export interface RootConfig {
  gateway: GatewayConfig;
  redis: RedisConfig;
}

export const rootConfig = (): RootConfig => ({
  gateway: gatewayConfig(),
  redis: redisConfig(),
});

export const configKeys: Record<keyof RootConfig, keyof RootConfig> = {
  gateway: 'gateway',
  redis: 'redis',
};
