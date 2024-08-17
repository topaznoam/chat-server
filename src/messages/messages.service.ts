import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Messages } from './messages';
import { User } from '../users/users';
import { Group } from '../group/groups';
import { CreateMessageDto } from './create-message.dto';
import { promises } from 'node:dns';
import { generateSummary } from './GptApi';

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

  async getAllMessgesInGroup(groupId: number) {
    return await this.messagesRepository
      .createQueryBuilder('messages')
      .leftJoinAndSelect('messages.user', 'user')
      .leftJoinAndSelect('messages.group', 'group')
      .where('messages.groupId = :groupId', { groupId })
      .orderBy('messages.id', 'ASC')
      .getMany();
  }

  async findMessagesByGroupId(groupId: number): Promise<any[]> {
    const messages = await this.getAllMessgesInGroup(groupId);

    return messages.map((message) => ({
      id: message.id,
      text: message.data,
      time: message.time,
      senderusername: message.user.username,
      groupId: message.group.id,
    }));
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
    message.user = user;
    message.group = group;

    return this.messagesRepository.save(message);
  }
  async summaryMessagesByGroupId(groupId: number): Promise<string> {
    const messages = await this.getAllMessgesInGroup(groupId);
    let data = '';
    messages.forEach((message) => {
      data += `sender: ${message.user.username} text: ${message.data}\n`;
    });
    return generateSummary(data);
  }
}
