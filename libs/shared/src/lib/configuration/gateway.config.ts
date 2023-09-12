export interface GatewayConfig {
  host: string;
  port: number;
}

export const gatewayConfig = (): GatewayConfig => ({
  host: process.env['GATEWAY_HOST'] ?? 'localhost',
  port: parseInt(process.env['GATEWAY_PORT'] ?? '4200'),
});
