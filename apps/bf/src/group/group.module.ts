import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupUser } from './entities/group-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, GroupUser])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
