import { ChatType } from '@/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: ChatType,
  })
  type: ChatType;

  @Column()
  sendId: string;

  @Column()
  toId: string;

  @Column({ nullable: true })
  groupId?: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  sendTime: Date;

  @Column({ default: true })
  isActive: boolean;
}
