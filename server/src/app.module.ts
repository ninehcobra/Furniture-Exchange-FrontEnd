import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { RateLimitingModule } from './modules/rate-limiting/rate-limiting.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configurationOptions } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(configurationOptions),
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    RateLimitingModule,
    UsersModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
