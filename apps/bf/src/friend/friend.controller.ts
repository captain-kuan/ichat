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
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateFriendDto } from './dto/create-firend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { FriendService } from './friend.service';

@Controller('friend')
@ApiTags('朋友')
@ApiBearerAuth()
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Post('add')
  @ApiBearerAuth()
  @ApiOperation({ summary: '添加好友', description: '返回好友id' })
  addFriend(@Body() addFriendDto: CreateFriendDto, @CurrentUser() user: User) {
    return this.friendService.addFriend(addFriendDto, user);
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
  getFriendsById(@Param('id') id: number, @CurrentUser() user: User) {
    return this.friendService.findOne(id, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: '好友id' })
  @ApiOperation({ summary: '根据id删除好友', description: '返回好友id' })
  delFriendsById(@Param('id') id: number, @CurrentUser() user: User) {
    return this.friendService.delOne(id, user);
  }
  @Patch(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: '好友id' })
  @ApiOperation({ summary: '根据id更新好友', description: '返回好友id' })
  updateFriendsById(
    @Param('id') id: number,
    @CurrentUser() user: User,
    @Body() data: UpdateFriendDto,
  ) {
    return this.friendService.updateOne(id, user, data);
  }
}
