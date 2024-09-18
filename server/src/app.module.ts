import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { LoggerModule } from './modules/logger/logger.module';
import { RateLimitingModule } from './modules/rate-limiting/rate-limiting.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigExtModule } from './modules/config/config.module';

@Module({
  imports: [
    ConfigExtModule.forRoot(),
    DatabaseModule,
    LoggerModule,
    RateLimitingModule,
    UsersModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
