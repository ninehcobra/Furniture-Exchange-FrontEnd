import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { seconds, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
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
