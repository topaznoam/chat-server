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

  async findMyGroups(userId: number): Promise<Group[]> {
    const groups = await this.groupsRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.users', 'user')
      .where('user.id = :userId', { userId })
      .orderBy('group.id', 'ASC')
      .getMany();
    return groups;
  }

  async create(group: Group): Promise<Group> {
    const users = await this.usersRepository.findByIds(group.users);
    const newGroup = this.groupsRepository.create({
      ...group,
      users: users,
    });
    return await this.groupsRepository.save(newGroup);
  }

  async updateImg(id: number, img: string): Promise<void> {
    await this.groupsRepository.update(id, { avatar: img });
  }

  async remove(id: number) {
    await this.groupsRepository.delete(id);
  }
}
