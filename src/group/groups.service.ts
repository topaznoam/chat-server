import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

  async findMyGroups(userId: number): Promise<Group[]> {
    const userGroups = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['groups'],
    });

    if (!userGroups) {
      return [];
    }

    const groupIds = userGroups.groups.map((group) => group.id);

    return await this.groupsRepository.findBy({
      id: In(groupIds),
    });
  }

  async create(group: Group): Promise<Group> {
    const users = await this.usersRepository.findBy({
      id: In(group.users),
    });
    const newGroup = this.groupsRepository.create({
      ...group,
      users: users,
    });
    return await this.groupsRepository.save(newGroup);
  }

  async updateImg(id: number, img: string): Promise<void> {
    await this.groupsRepository.update(id, { avatar: img });
  }
}
