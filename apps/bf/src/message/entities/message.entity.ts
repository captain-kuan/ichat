import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Message {
    @PrimaryGeneratedColumn()
    MId: number

    @Column()
    MMessage: string

    @Column({ default: 1 })
    MType: number

    @Column()
    MFromId: number

    @Column()
    MToId: number
    
    @Column({ default: true })
    MIsActive: boolean
}
