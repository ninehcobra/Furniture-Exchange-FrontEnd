import { Module } from '@nestjs/common';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { ConfigServiceExt } from '../config/config.service';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [ConfigServiceExt],
      useFactory: (config: ConfigServiceExt) => [
        {
          ttl: seconds(config.get('THROTTLE_TTL')),
          limit: seconds(config.get('THROTTLE_LIMIT')),
        },
        { name: 'short', ttl: seconds(1), limit: seconds(2) },
        { name: 'medium', ttl: seconds(10), limit: seconds(3) },
        { name: 'long', ttl: seconds(60), limit: seconds(5) },
      ],
    }),
  ],
})
export class RateLimitingModule {}
