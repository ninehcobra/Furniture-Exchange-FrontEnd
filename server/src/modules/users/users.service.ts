import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigServiceExt } from 'src/config/config.service';
import { LoggerService } from 'src/logger/logger.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigServiceExt,
    private readonly loggerService: LoggerService,
  ) {}

  async findAll(): Promise<UserDto[]> {
    // throw new HttpException('test', HttpStatus.FORBIDDEN);

    return await this.userRepository
      .find()
      .then((user) => user.map((e) => UserDto.fromEntity(e)));
  }

  async create(dto: CreateUserDto): Promise<UserDto> {
    return await this.userRepository.save(UserDto.toEntity(dto)).then((u) => {
      return UserDto.fromEntity(u);
    });
  }
}
