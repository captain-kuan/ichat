import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity';
import { MessageModule } from '../message/message.module';
import { FriendRequest } from './entities/friend-request.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Friend, FriendRequest]), MessageModule],
  providers: [FriendService],
  controllers: [FriendController],
})
export class FriendModule {}
