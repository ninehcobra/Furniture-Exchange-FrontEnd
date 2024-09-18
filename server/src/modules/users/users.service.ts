import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from 'src/modules/logger/logger.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigServiceExt } from '../config/config.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigServiceExt,
    private readonly loggerService: LoggerService,
  ) {}

  async findAll(): Promise<UserDto[]> {
    return await this.userRepository
      .find()
      .then((user) => user.map((e) => UserDto.fromEntity(e)));
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ email: email });

    return user;
  }

  async create(dto: CreateUserDto): Promise<UserDto> {
    return await this.userRepository.save(UserDto.toEntity(dto)).then((u) => {
      return UserDto.fromEntity(u);
    });
  }
}
