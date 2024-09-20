import {
  CacheModuleAsyncOptions,
  CacheModuleOptions,
  CacheOptions,
  CacheOptionsFactory,
} from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { EnvVariables } from '../configuration/env.interface';
import { Injectable } from '@nestjs/common';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  inject: [ConfigService],
  useFactory: async (config: ConfigService<EnvVariables>) => {
    const store = await redisStore({
      socket: {
        host: config.get('REDIS_HOST'),
        port: config.get('REDIS_PORT'),
      },
    });

    return {
      store: () => store,
    };
  },
};

// use this class to set the for internal cache in AppModule
// @Injectable()
// export class CacheService implements CacheOptionsFactory {
//   createCacheOptions(): CacheModuleOptions {
//     return {
//       ttl: 5,
//       max: 10,
//     };
//   }
// }
