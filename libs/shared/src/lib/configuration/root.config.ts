import { GatewayConfig, gatewayConfig } from './gateway.config';

export interface RootConfig {
  gateway: GatewayConfig;
}

export const rootConfig = (): RootConfig => ({
  gateway: gatewayConfig(),
});

export const configKeys: Record<keyof RootConfig, keyof RootConfig> = {
  gateway: 'gateway',
};
