import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessageGateway } from './message.gateway';
import { JwtModule } from '@nestjs/jwt';
import { jwtModule } from '@/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Message]), jwtModule],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway, JwtModule],
})
export class MessageModule {}
