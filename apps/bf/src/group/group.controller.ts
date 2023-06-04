import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CurrentUser } from '@/common/current-user/current-user.decorator';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('群组')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(
    @Body() createGroupDto: CreateGroupDto,
    @CurrentUser('userId') userId: number,
  ) {
    return this.groupService.create(userId, createGroupDto);
  }

  @Get()
  findAll(@CurrentUser('Uid') userId: number) {
    return this.groupService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.groupService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
