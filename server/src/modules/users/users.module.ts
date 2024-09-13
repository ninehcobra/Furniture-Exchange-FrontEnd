import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigExtModule } from '../../config/config.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
