import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ default: 1 })
  type: number;

  @Column()
  fromId: number;

  @Column()
  toId: number;

  @Column({ default: true })
  isActive: boolean;
}
