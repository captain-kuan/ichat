import { MessageGateway } from '@/message/message.gateway';
import { User } from '@/user/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SendAddFriendDto, AgreeFriendDto } from './dto/create-firend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friend } from './entities/friend.entity';
import { ChatType } from '@/types';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend)
    private friendsRepository: Repository<Friend>,
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
  async addFriend(friend: AgreeFriendDto, user: User) {
    const oldOne = await this.findOne(friend.friendId, user.id);
    if (oldOne) {
      throw new BadRequestException('已添加该好友');
    }
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
  sendAddFriendReq(friend: SendAddFriendDto, user: User) {
    this.ws.sendMessage('addChat', {
      content: friend.friendId,
      sendId: user.id,
      toId: friend.friendId,
      type: ChatType.system,
    });
    return {
      content: friend.friendId,
      sendId: user.id,
      toId: friend.friendId,
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
