import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { Repository } from 'typeorm';
import { compareSync } from 'bcryptjs';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User)
  private readonly userRepository: Repository<User>,) {
    super({
      usernameField: 'account',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(account: string, password: string): Promise<any> {    
    const user = await await this.userRepository
    .createQueryBuilder('user')
    .addSelect('user.UPassword')
    .where('user.UAccount=:account', { account })
    .getOne();
    if (!user) {
      throw new BadRequestException('用户名或密码不正确！');
    }
    if (!compareSync(password, user.UPassword)) {
      throw new BadRequestException('用户名或密码不正确！');
    }
    return user;
  }
}
