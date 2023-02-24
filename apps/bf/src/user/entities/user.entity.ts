import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from "bcryptjs"
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  UId: number;

  @Column({ length: 100, nullable: true })
  Uname?: string;

  @Column({ length: 100, nullable: true })
  UAccount: string;

  @Exclude()
  @Column({ select: false, })
  UPassword: string;

  @Column({ default: true })
  UIsActive?: boolean;

  @Exclude()
  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  UCreateTime: Date;

  @Exclude()
  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  UUpdateTime: Date;


  @BeforeInsert()
  async encryptPwd() {
    if (!this.UPassword) return;
    this.UPassword = await bcrypt.hashSync(this.UPassword, 10);
  }
}