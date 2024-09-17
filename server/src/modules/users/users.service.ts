import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigServiceExt } from 'src/config/config.service';
import { LoggerService } from 'src/logger/logger.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigServiceExt,
    private readonly loggerService: LoggerService,
  ) {}

  findAll() {
    const PORT = this.configService.get('PORT', { infer: true });
    const NODE_ENV = this.configService.get('NODE_ENV', { infer: true });

    this.loggerService.verbose('TEST LOGGING AT USERS SERVICE');

    console.log(PORT);
    console.log(NODE_ENV);

    throw new HttpException('test', HttpStatus.FORBIDDEN);

    return `This action returns all users`;
  }

  async create(id: number) {
    const user = this.userRepository.create({
      name: 'test',
    });

    return await this.userRepository.save(user);
  }
}
