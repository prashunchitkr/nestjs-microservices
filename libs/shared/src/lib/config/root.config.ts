import { GatewayConfig, gatewayConfig } from './gateway.config';
import { RabbitMQConfig, rabbitMQConfig } from './rabbitmq.config';

export interface RootConfig {
  gateway: GatewayConfig;
  rabbitmq: RabbitMQConfig;
}

export const rootConfig = (): RootConfig => ({
  gateway: gatewayConfig(),
  rabbitmq: rabbitMQConfig(),
});

export const configKeys: Record<keyof RootConfig, keyof RootConfig> = {
  gateway: 'gateway',
  rabbitmq: 'rabbitmq',
};
