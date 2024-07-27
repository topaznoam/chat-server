import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Messages } from './messages';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll(): Promise<Messages[]> {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Messages> {
    return this.messagesService.findOne(id);
  }

  @Post()
  create(@Body() message: Messages): Promise<Messages> {
    return this.messagesService.create(message);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.messagesService.remove(id);
  }
}
