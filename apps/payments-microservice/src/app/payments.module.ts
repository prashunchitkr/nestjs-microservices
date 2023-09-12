import { Module } from '@nestjs/common';

import { AppController } from './payments.controller';
import { AppService } from './payments.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_MICROSERVICE } from '@/shared';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_MICROSERVICE,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
