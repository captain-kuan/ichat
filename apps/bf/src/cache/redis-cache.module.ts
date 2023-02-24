import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheService } from './redis-cache.service';
import { CacheModule, Module, Global } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';


@Module({
    imports: [
        CacheModule.registerAsync({
            isGlobal: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const redis = configService.get('redis')
                return {
                    store: redisStore,
                    host: redis.host,
                    port: redis.port,
                    db:redis.db, //目标库,
                    auth_pass: redis.password, // 密码,没有可以不写
                    ttl:1800
                };
            },
        }),
    ],
    providers: [RedisCacheService],
    exports: [RedisCacheService],
})
export class RedisCacheModule { }
