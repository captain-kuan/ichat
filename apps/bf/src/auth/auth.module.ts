import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '@/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheModule } from '@/cache/redis-cache.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
export const jwtModule = JwtModule.registerAsync({
  imports: [ConfigModule,RedisCacheModule],
  inject: [ConfigService],
  useFactory:async (configService: ConfigService) => {
    const secret = configService.get('secret')
    return {
      secret: secret,
      signOptions: { expiresIn: '1d' },
    }
  }
})


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    ConfigModule,
    jwtModule,
    RedisCacheModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [jwtModule],
})
export class AuthModule { }
