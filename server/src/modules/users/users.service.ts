import { Injectable } from '@nestjs/common';
import { ConfigServiceExt } from 'src/config/config.service';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigServiceExt,
    private readonly loggerService: LoggerService,
  ) {}

  findAll() {
    const PORT = this.configService.get('PORT', { infer: true });
    const NODE_ENV = this.configService.get('NODE_ENV', { infer: true });

    this.loggerService.verbose('TEST LOGGING AT USERS SERVICE');

    console.log(PORT);
    console.log(NODE_ENV);

    return `This action returns all users`;
  }
}
