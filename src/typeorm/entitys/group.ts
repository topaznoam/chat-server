import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Messages } from './messages';
import { User } from './users';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @OneToMany(() => Messages, (messeges) => messeges.group)
  messeges: Messages[];

  @ManyToMany(() => User)
  @JoinTable()
  user: User;
}
