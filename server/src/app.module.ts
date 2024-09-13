import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigExtModule } from './config/config.module';

@Module({
  imports: [ConfigExtModule.forRoot(), UsersModule], // Add ConfigExtModule here
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
