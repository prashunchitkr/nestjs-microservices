import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto, User } from '@/shared';

@Injectable()
export class AppService {
  constructor(private readonly usersRepository: UsersRepository) {}

  createUser(data: CreateUserDto): User {
    return this.usersRepository.save(data);
  }

  getUser(id: string): User | null {
    return this.usersRepository.findOne(id);
  }
}
