import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Messages } from './messages';
import { User } from '../users/users';
import { Group } from '../group/groups';
import { CreateMessageDto } from './create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private readonly messagesRepository: Repository<Messages>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async findAll(): Promise<Messages[]> {
    return this.messagesRepository.find();
  }

  async findOne(id: number): Promise<Messages> {
    return this.messagesRepository.findOne({ where: { id } });
  }

  async create(createMessageDto: CreateMessageDto): Promise<Messages> {
    const user = await this.userRepository.findOne({
      where: { id: createMessageDto.user },
    });
    const group = await this.groupRepository.findOne({
      where: { id: createMessageDto.group },
    });

    if (!user || !group) {
      throw new NotFoundException('User or Group not found');
    }

    const message = new Messages();
    message.data = createMessageDto.data;
    message.time = new Date().toLocaleTimeString();
    message.date = new Date();
    message.user = user;
    message.group = group;

    return this.messagesRepository.save(message);
  }

  async remove(id: number) {
    await this.messagesRepository.delete(id);
  }
}
