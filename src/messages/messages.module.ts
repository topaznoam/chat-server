import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Messages } from './messages';
import { User } from '../users/users';
import { Group } from '../group/groups';
import { MyGateway } from './getway';

@Module({
  imports: [TypeOrmModule.forFeature([Messages, User, Group])],
  controllers: [MessagesController],
  providers: [MessagesService, MyGateway],
})
export class MessagesModule {}
