import { UsersService } from './user.service';
import { Body, Controller, Get, Put } from '@nestjs/common';
import { CurrentUser } from '@/common/current-user/current-user.decorator';
import { User } from './entities/user.entity';
@Controller('/user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUserInfo(@CurrentUser() user: User){    
    return this.userService.findById(user.UId)
  }
  @Put()
  changeUserinfo(@CurrentUser() user: User,@Body() body:Partial<User>){    
    return this.userService.changeUser(user.UId,body)
  }
}
