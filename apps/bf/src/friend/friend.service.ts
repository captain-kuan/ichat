import { MessageGateway } from '@/message/message.gateway';
import { ChatType } from '@/types';
import { User } from '@/user/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgreeFriendDto, SendAddFriendDto } from './dto/create-firend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friend } from './entities/friend.entity';
import {
  FriendRequest,
  FriendRequestStatus,
} from './entities/friend-request.entity';

const FRIEND_REQUEST_EXPIRE_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendsRepository: Repository<Friend>,
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    private readonly ws: MessageGateway,
  ) {}

  findAll(user: User) {
    const query = this.friendsRepository.createQueryBuilder('friend');
    return query
      .leftJoinAndMapOne(
        'friend.info',
        User,
        'user',
        'user.id = friend.friendId',
      )
      .where('friend.userId = :id', { id: user.id })
      .getMany();
  }

  async getPendingRequests(user: User) {
    const now = new Date();
    await this.friendRequestRepository
      .createQueryBuilder()
      .update(FriendRequest)
      .set({
        status: FriendRequestStatus.expired,
        updatedAt: now,
      })
      .where('toUserId = :userId', { userId: user.id })
      .andWhere('status = :status', { status: FriendRequestStatus.pending })
      .andWhere('expiredAt <= :now', { now })
      .execute();

    const query = this.friendRequestRepository
      .createQueryBuilder('fr')
      .leftJoinAndMapOne('fr.fromUser', User, 'user', 'user.id = fr.fromUserId')
      .where('fr.toUserId = :userId', { userId: user.id })
      .andWhere('fr.status = :status', { status: FriendRequestStatus.pending })
      .andWhere('fr.expiredAt > :now', { now })
      .orderBy('fr.createdAt', 'DESC');

    return query.getMany();
  }

  async addFriend(friend: AgreeFriendDto, user: User) {
    const oldOne = await this.findOne(friend.friendId, user.id);
    if (oldOne) {
      throw new BadRequestException('已添加该好友');
    }

    const now = new Date();
    await this.friendRequestRepository
      .createQueryBuilder()
      .update(FriendRequest)
      .set({
        status: FriendRequestStatus.accepted,
        updatedAt: now,
      })
      .where('fromUserId = :fromUserId', { fromUserId: friend.friendId })
      .andWhere('toUserId = :toUserId', { toUserId: user.id })
      .andWhere('status = :status', { status: FriendRequestStatus.pending })
      .andWhere('expiredAt > :now', { now })
      .execute();

    const newFriend = this.friendsRepository.create({
      friendId: friend.friendId,
      userId: user.id,
      name: friend.nickname || friend.friendId,
    });
    const xFriend = this.friendsRepository.create({
      friendId: user.id,
      userId: friend.friendId,
      name: friend.nickname || friend.friendId,
    });
    await this.friendsRepository.save(xFriend);
    return this.friendsRepository.save(newFriend);
  }

  async sendAddFriendReq(friend: SendAddFriendDto, user: User) {
    if (friend.friendId === user.id) {
      throw new BadRequestException('不能添加自己为好友');
    }

    const oldOne = await this.findOne(friend.friendId, user.id);
    if (oldOne) {
      throw new BadRequestException('已添加该好友');
    }

    const now = new Date();
    await this.friendRequestRepository
      .createQueryBuilder()
      .update(FriendRequest)
      .set({
        status: FriendRequestStatus.expired,
        updatedAt: now,
      })
      .where('fromUserId = :fromUserId', { fromUserId: user.id })
      .andWhere('toUserId = :toUserId', { toUserId: friend.friendId })
      .andWhere('status = :status', { status: FriendRequestStatus.pending })
      .andWhere('expiredAt <= :now', { now })
      .execute();

    const activeRequest = await this.friendRequestRepository.findOne({
      where: {
        fromUserId: user.id,
        toUserId: friend.friendId,
        status: FriendRequestStatus.pending,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (activeRequest && activeRequest.expiredAt > now) {
      const remainSeconds = Math.ceil(
        (activeRequest.expiredAt.getTime() - now.getTime()) / 1000,
      );
      throw new BadRequestException(
        `好友申请已发送，请在 ${remainSeconds} 秒后重试`,
      );
    }

    const expireAt = new Date(now.getTime() + FRIEND_REQUEST_EXPIRE_MS);
    const request = this.friendRequestRepository.create({
      fromUserId: user.id,
      toUserId: friend.friendId,
      status: FriendRequestStatus.pending,
      expiredAt: expireAt,
      updatedAt: now,
    });
    await this.friendRequestRepository.save(request);

    await this.ws.sendMessage('addChat', {
      content: friend.friendId,
      sendId: user.id,
      toId: friend.friendId,
      type: ChatType.system,
    });

    return {
      requestId: request.id,
      content: friend.friendId,
      sendId: user.id,
      toId: friend.friendId,
      expiredAt: request.expiredAt,
    };
  }

  findOne(friendId: string, userId: User['id']) {
    return this.friendsRepository.findOneBy({
      friendId,
      userId: userId,
    });
  }

  async delOne(friendId: string, user: User) {
    const oldOne = await this.findOne(friendId, user.id);
    if (oldOne == null) {
      throw new BadRequestException('未找到对应id的好友');
    }
    return this.friendsRepository.delete(oldOne.id);
  }

  async updateOne(friendId: string, user: User, data: UpdateFriendDto) {
    const oldOne = await this.findOne(friendId, user.id);
    if (oldOne == null) {
      throw new BadRequestException('未找到对应id的好友');
    }
    return this.friendsRepository.update(oldOne.id, { name: data.nickname });
  }
}
