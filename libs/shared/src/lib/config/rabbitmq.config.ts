export interface RabbitMQConfig {
  host: string;
  port: number;
  url: string;
}

export const rabbitMQConfig = (): RabbitMQConfig => ({
  host: process.env['RABBITMQ_HOST'] ?? 'localhost',
  port: parseInt(process.env['RABBITMQ_PORT'] ?? '5672'),
  url: process.env['RABBITMQ_URL'] ?? 'amqp://localhost:5672',
});
