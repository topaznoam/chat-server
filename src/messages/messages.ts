import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/users';
import { Group } from '../group/groups';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: string;

  @Column()
  time: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.messeges)
  user: User;

  @ManyToOne(() => Group, (group) => group.messeges)
  group: Group;
}
