import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id: number; //主键

  @Column()
  userId: number; //自己的ID

  @Column()
  friendId: number; //朋友的ID

  @Column({ nullable: true })
  name: string; //备注昵称

  @Column({ default: true })
  isActive?: boolean;
}
