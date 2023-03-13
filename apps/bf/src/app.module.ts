import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { DataSource } from 'typeorm';
import { UsersModule } from './user/user.module';

import { User } from './user/entities/user.entity';
import { Friend } from './friend/entities/friend.entity';
import { Group } from './group/entities/group.entity';
import { GroupUser } from './group/entities/group-user.entity';
import { Message } from './message/entities/message.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GroupModule } from './group/group.module';
import { FriendModule } from './friend/friend.module';
import { MessageModule } from './message/message.module';
import configuration from './config/configuration';
import { TransformInterceptor } from '@/common/response/response.interceptor';
import { LoggingInterceptor } from '@/common/logging/logging.interceptor';
import { HttpErrorFilter } from './common/error/error.filter';
import { ValidationPipe } from './common/validation/validation.pipe';
import { RedisCacheModule } from './cache/redis-cache.module';
import { FileModule } from './file/file.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.get('database');
        return {
          type: 'mysql',
          host: 'localhost',
          ...databaseConfig,
          synchronize: true,
          entities: [User, Friend, Group, GroupUser, Message],
        };
      },
    }),
    UsersModule,
    AuthModule,
    GroupModule,
    FriendModule,
    MessageModule,
    RedisCacheModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
