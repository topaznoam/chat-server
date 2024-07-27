import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './groups';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  async findAll(): Promise<Group[]> {
    return await this.groupsRepository.find();
  }

  async findOne(id: number): Promise<Group> {
    return await this.groupsRepository.findOne({ where: { id } });
  }

  async create(group: Group): Promise<Group> {
    return await this.groupsRepository.create(group);
  }

  async remove(id: number): Promise<void> {
    await this.groupsRepository.delete(id);
  }
}
