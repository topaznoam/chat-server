import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Messages } from '../messages/messages';
import { Group } from '../group/groups';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @OneToMany(() => Messages, (messages) => messages.user)
  messages: Messages[];

  @ManyToMany(() => Group, (group) => group.users)
  groups: Group[];
}
