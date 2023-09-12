import { Module } from '@nestjs/common';
import { AppController } from './auth.controller';
import { AppService } from './auth.service';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [AppController],
  providers: [AppService, UsersRepository],
})
export class AppModule {}
