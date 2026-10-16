import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessageGateway } from './message.gateway';
import { jwtModule } from '@/auth/auth.module';
import { GroupUser } from '@/group/entities/group-user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Message, GroupUser]), jwtModule],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway],
  exports: [MessageGateway],
})
export class MessageModule {}
