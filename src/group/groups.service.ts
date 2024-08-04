import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './groups';
import { User } from 'src/users/users';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Group[]> {
    return await this.groupsRepository.find();
  }

  async findOne(id: number): Promise<Group> {
    return await this.groupsRepository.findOne({ where: { id } });
  }

  async create(group: Group): Promise<Group> {
    console.log(group.users);
    const users = await this.usersRepository.findByIds(group.users);
    console.log(users);
    const newGroup = this.groupsRepository.create({
      ...group,
      users: users,
    });
    return await this.groupsRepository.save(newGroup);
  }

  async remove(id: number) {
    await this.groupsRepository.delete(id);
  }
}
