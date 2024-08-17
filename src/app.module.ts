import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users';
import { Group } from './group/groups';
import { Messages } from './messages/messages';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { GroupsModule } from './group/groups.module';
import { ROOT_DIR } from './Constant';
import { config } from 'dotenv';
import { join } from 'node:path';

config({ path: join(ROOT_DIR, './.env') });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Group, Messages],
      synchronize: true,
    }),
    UsersModule,
    MessagesModule,
    GroupsModule,
  ],
})
export class AppModule {}
