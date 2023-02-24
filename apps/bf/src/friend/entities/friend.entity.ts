import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Friend {
    @PrimaryGeneratedColumn()
    FId: number;//主键

    @Column()
    FUserId: number; //自己的ID

    @Column()
    FFriendId: number;//朋友的ID

    @Column({ nullable: true })
    FName: string;//备注昵称

    @Column({ default: true })
    FIsActive?: boolean;
}
