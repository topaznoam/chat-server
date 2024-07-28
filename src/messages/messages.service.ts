import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Messages } from './messages';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private readonly messagesRepository: Repository<Messages>,
  ) {}

  async findAll(): Promise<Messages[]> {
    return this.messagesRepository.find();
  }

  async findOne(id: number): Promise<Messages> {
    return this.messagesRepository.findOne({ where: { id } });
  }

  async create(message: Messages): Promise<Messages> {
    return this.messagesRepository.save(message);
  }

  async remove(id: number) {
    await this.messagesRepository.delete(id);
  }
}
