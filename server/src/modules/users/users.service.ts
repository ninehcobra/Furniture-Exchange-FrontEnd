import { Injectable } from '@nestjs/common';
import { ConfigServiceExt } from 'src/config/config.service';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigServiceExt) {}

  findAll() {
    const PORT = this.configService.get('PORT', { infer: true });
    const NODE_ENV = this.configService.get('NODE_ENV', { infer: true });

    console.log(PORT);
    console.log(NODE_ENV);

    return `This action returns all users`;
  }
}
