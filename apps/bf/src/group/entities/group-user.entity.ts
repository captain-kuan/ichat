import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GroupUser {
    @PrimaryGeneratedColumn()
    GUId: number

    @Column()
    GUGroupId: number

    @Column()
    GUUserId: number

    @Column()
    GUName: string

    @Column({ default: 1 })
    GUType: number

    @Column({ default: true })
    GUIsActive?: boolean
}
