import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisStore } from 'cache-manager-redis-store';

const TTL_OTP = 500000;
@Injectable()
export class RedisService {
  private readonly redisStore!: RedisStore;

  constructor(@Inject(CACHE_MANAGER) private readonly redisService: Cache) {
    this.redisStore = redisService.store as unknown as RedisStore;
  }

  public async setOTP(key: string, value: any): Promise<any> {
    return await this.redisService.set(key, value, TTL_OTP);
  }

  public async getOTP(key: string): Promise<any> {
    return await this.redisService.get(key);
  }

  public async delOTP(key: string): Promise<any> {
    return await this.redisService.del(key);
  }
}
