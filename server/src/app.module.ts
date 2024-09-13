import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigExtModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { RateLimitingModule } from './rate-limiting/rate-limiting.module';

@Module({
  imports: [
    ConfigExtModule.forRoot(),
    LoggerModule,
    RateLimitingModule,
    UsersModule,
  ],
  providers: [AppService],
})
export class AppModule {}
