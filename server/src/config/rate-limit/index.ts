import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  seconds,
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler';

export class RateLimitingService implements ThrottlerOptionsFactory {
  constructor(@Inject(ConfigService) private readonly config: ConfigService) {}

  createThrottlerOptions(): ThrottlerModuleOptions {
    return [
      {
        ttl: seconds(this.config.get('THROTTLE_TTL')),
        limit: seconds(this.config.get('THROTTLE_LIMIT')),
      },
      { name: 'short', ttl: seconds(1), limit: seconds(2) },
      { name: 'medium', ttl: seconds(10), limit: seconds(3) },
      { name: 'long', ttl: seconds(60), limit: seconds(5) },
    ];
  }
}
