import { User } from '@/shared';
import { Injectable, Logger } from '@nestjs/common';
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

  findOne(id: string): User | null {
    return this.users.find((u) => u.id === id) || null;
  }
}
