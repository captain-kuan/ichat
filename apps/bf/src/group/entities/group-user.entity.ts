import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GroupUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupId: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column({ default: 1 })
  type: number;

  @Column({ default: true })
  isActive?: boolean;
}
