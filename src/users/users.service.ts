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

  async findAll(): Promise<any[]> {
    const allusers = await this.usersRepository.find();
    return allusers.map((user) => ({
      id: user.id,
      name: user.username,
      icon: user.avatar,
    }));
  }

  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async logIn(username: string, password: string): Promise<User | null> {
    const user = await this.findOneByUsername(username);
    return user && user.password === password ? user : null;
  }

  async create(user: User): Promise<User> {
    const newUser = await this.usersRepository.save(user);
    return newUser;
  }

  async SignUp(user: User): Promise<User | null> {
    const isUser = await this.findOneByUsername(user.username);
    return isUser ? null : this.create(user);
  }

  async updateImg(id: number, img: string): Promise<void> {
    await this.usersRepository.update(id, { avatar: img });
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }
}
