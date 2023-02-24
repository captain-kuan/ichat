import { User } from '@/user/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFriendDto } from './dto/create-firend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friend } from './entities/friend.entity';

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(Friend)
        private friendsRepository: Repository<Friend>,
    ) { }
    findAll(user: User) {
        return this.friendsRepository.findBy({ FUserId: user.UId })
    }
    async addFriend(friend: CreateFriendDto, user: User) {
        const oldOne = await this.findOne(friend.friendId, user)
        if (oldOne) {
            throw new BadRequestException("已添加该好友")
        }
        const newFriend = this.friendsRepository.create({ FFriendId: friend.friendId, FUserId: user.UId, FName: friend.nickname })
        return this.friendsRepository.save(newFriend)
    }
    findOne(friendId: number, user: User) {
        return this.friendsRepository.findOneBy({ FFriendId: friendId, FUserId: user.UId })
    }
    async delOne(friendId: number, user: User) {
        const oldOne = await this.findOne(friendId, user)
        if (oldOne == null) {
            throw new BadRequestException("未找到对应id的好友")
        }
        return this.friendsRepository.delete(oldOne.FId)
    }
    async updateOne(friendId: number, user: User, data: UpdateFriendDto) {
        const oldOne = await this.findOne(friendId, user)
        if (oldOne == null) {
            throw new BadRequestException("未找到对应id的好友")
        }
        return this.friendsRepository.update(oldOne.FId, { FName: data.nickname })
    }
}
