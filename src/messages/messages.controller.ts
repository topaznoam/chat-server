import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Messages } from './messages';
import { CreateMessageDto } from './create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':groupId')
  findAll(@Param('groupId') groupId: number): Promise<Messages[]> {
    return this.messagesService.findMessagesByGroupId(groupId);
  }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto): Promise<Messages> {
    return this.messagesService.create(createMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.messagesService.remove(id);
  }
}
