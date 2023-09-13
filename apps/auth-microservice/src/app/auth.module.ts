import { rootConfig } from '@/shared';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './auth.controller';
import { AppService } from './auth.service';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rootConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UsersRepository],
})
export class AppModule {}
