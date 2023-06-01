import { CurrentUser } from '@/common/current-user/current-user.decorator';
import { User } from '@/user/entities/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AgreeFriendDto, SendAddFriendDto } from './dto/create-firend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { FriendService } from './friend.service';

@Controller('friend')
@ApiTags('朋友')
@ApiBearerAuth()
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Post('agreeAdd')
  @ApiBearerAuth()
  @ApiOperation({ summary: '同意添加好友', description: '返回好友id' })
  agreeAddFriend(
    @Body() sendAddFriend: AgreeFriendDto,
    @CurrentUser() user: User,
  ) {
    return this.friendService.addFriend(sendAddFriend, user);
  }
  @Post('sendAdd')
  @ApiBearerAuth()
  @ApiOperation({ summary: '发生添加好友请求', description: '返回好友id' })
  sendAddFriendReq(
    @Body() friend: SendAddFriendDto,
    @CurrentUser() user: User,
  ) {
    return this.friendService.sendAddFriendReq(friend, user);
  }

  @Get('')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取好友列表', description: '返回好友id' })
  getFriends(@CurrentUser() user: User) {
    return this.friendService.findAll(user);
  }
  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: '好友id' })
  @ApiOperation({ summary: '根据id获取好友', description: '返回好友id' })
  getFriendsById(@Param('id') id: string, @CurrentUser() user: User) {
    return this.friendService.findOne(id, user.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: '好友id' })
  @ApiOperation({ summary: '根据id删除好友', description: '返回好友id' })
  delFriendsById(@Param('id') id: string, @CurrentUser() user: User) {
    return this.friendService.delOne(id, user);
  }
  @Patch(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: '好友id' })
  @ApiOperation({ summary: '根据id更新好友', description: '返回好友id' })
  updateFriendsById(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() data: UpdateFriendDto,
  ) {
    return this.friendService.updateOne(id, user, data);
  }
}
