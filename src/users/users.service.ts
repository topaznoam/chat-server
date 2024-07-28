import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async logIn(username: string, password: string): Promise<number | null> {
    const user = await this.findOneByUsername(username);
    return user && user.password === password ? user.id : null;
  }

  async create(user: User): Promise<number> {
    const newUser = await this.usersRepository.save(user);
    return newUser.id;
  }

  async SignUp(user: User): Promise<number | null> {
    const isUser = await this.findOneByUsername(user.username);
    return isUser ? null : this.create(user);
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }
}
