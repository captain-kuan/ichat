import { Injectable } from '@nestjs/common';
import { RedisCacheService } from './cache/redis-cache.service';
@Injectable()
export class AppService {
  constructor(private readonly redis: RedisCacheService) { }
  getHello(): string {
    this.redis.cacheSet('token', '123123', 1800)
    return 'Hello World!';
  }
}
