import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '@/common/current-user/SetMetadata';
import { Observable } from 'rxjs';
import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { RedisCacheService } from '@/cache/redis-cache.service';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private redisCacheService: RedisCacheService,
  ) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    try {
      const user: Partial<User> = this.jwtService.verify(token);
      if (this.redisCacheService.cacheGet(`user-${user.id}-${user.account}`)) {
        this.redisCacheService.cacheSet(
          `user-${user.id}-${user.account}`,
          token,
          1800,
        );
      } else {
        return false;
      }
    } catch (error) {
      throw new UnauthorizedException('身份验证失败');
    }
    return super.canActivate(context);
  }
  getRequest(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    return request;
  }
  handleRequest<User>(err, user: User): User {
    if (err || !user) {
      throw new UnauthorizedException('身份验证失败');
    }
    return user;
  }
}
