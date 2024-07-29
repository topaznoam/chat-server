import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users';
import { Group } from './group/groups';
import { Messages } from './messages/messages';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { GroupsModule } from './group/groups.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'chat_database',
      entities: [User, Group, Messages],
      synchronize: true,
    }),
    UsersModule,
    MessagesModule,
    GroupsModule,
  ],
})
export class AppModule {}
