import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configurationOptions } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from './config/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { RateLimitingService } from './config/rate-limit';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './config/cache';

@Module({
  imports: [
    // Configuration environment variables
    ConfigModule.forRoot(configurationOptions),
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    // Rate limiting
    ThrottlerModule.forRootAsync({
      useClass: RateLimitingService,
    }),
    // Redis cache
    CacheModule.registerAsync(RedisOptions),
    // others business'module
    UsersModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
