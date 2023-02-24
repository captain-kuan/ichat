import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    GId: number

    @Column()
    GName: string

    @Column({ default: 1 })
    GType: number
    
    @Column({ default: true })
    GIsActive?: boolean
}
