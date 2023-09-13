import { User } from '@/shared';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(UsersRepository.name);
  private readonly users: User[] = [];

  save(user: Omit<User, 'id'>) {
    const newUser = { id: uuidV4(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  findOne(id: string): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new RpcException(new NotFoundException('User Not Found'));
    return user;
  }
}
