import { User } from '@/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn('uuid')
  id: string; //主键

  @Column()
  userId: string; //自己的ID

  @Column()
  friendId: string; //朋友的ID

  @Column({ nullable: true })
  name: string; //备注昵称

  @Column({ default: true })
  isActive?: boolean;
}
