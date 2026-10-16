import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum FriendRequestStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
  expired = 'expired',
}

@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fromUserId: string;

  @Column()
  toUserId: string;

  @Column({
    type: 'enum',
    enum: FriendRequestStatus,
    default: FriendRequestStatus.pending,
  })
  status: FriendRequestStatus;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
  })
  expiredAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  updatedAt?: Date;
}
