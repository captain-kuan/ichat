import { UsersService } from './user.service';
import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { CurrentUser } from '@/common/current-user/current-user.decorator';
import { User } from './entities/user.entity';

import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('/user')
export class UsersController {
  friendService: any;
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUserInfo(@CurrentUser() user: User) {
    return this.userService.findById(user.id);
  }
  @Get('searchByName')
  @ApiBearerAuth()
  @ApiQuery({ name: 'account', description: '账号名' })
  @ApiOperation({ summary: '根据id获取好友', description: '返回好友id' })
  searchFriendByName(@Query('account') account: string) {
    return this.userService.findOne(account);
  }
  @Put()
  changeUserinfo(@CurrentUser() user: User, @Body() body: Partial<User>) {
    return this.userService.changeUser(user.id, body);
  }
}
