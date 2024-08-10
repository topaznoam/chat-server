import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
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

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async logIn(username: string, password: string): Promise<User | null> {
    const user = await this.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
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
}
