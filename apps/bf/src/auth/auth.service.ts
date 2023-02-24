import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { UsersService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { User } from '@/user/entities/user.entity';
import { RedisCacheService } from '@/cache/redis-cache.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisCacheService: RedisCacheService
  ) { }
  createToken(user: Partial<User>) {
    
    return this.jwtService.sign(user);
  }
  async validateUser(UAccount: string, UPassword: string): Promise<Omit<User, 'UPassword'>> {
    const user = await this.usersService.findOne(UAccount);
    if (user && user.UPassword === UPassword) {
      return user;
    }
    return null;
  }
  async login(user: User) {
    const token = this.createToken({ UId: user.UId, UAccount: user.UAccount })
    this.redisCacheService.cacheSet(`user-${user.UId}-${user.UAccount}`, token, 1800)
    return {
      access_token: token,
    };
  }
  async register(params: RegisterDto) {
    const user = await this.usersService.findOne(params.account);
    if (user != null) {
      throw new BadRequestException("该账号名已存在")
    };
    return this.usersService.create(params);
  }
  async getUser(userId: number) {    
    return this.usersService.findById(userId)
  }
}
