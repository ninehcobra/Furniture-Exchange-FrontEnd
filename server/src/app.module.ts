import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigExtModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [ConfigExtModule.forRoot(), LoggerModule, UsersModule],
  providers: [AppService],
})
export class AppModule {}
