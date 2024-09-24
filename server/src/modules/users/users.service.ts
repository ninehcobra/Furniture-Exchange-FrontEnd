import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { RedisService } from 'src/config/cache/redis.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly redis: RedisService, // Inject RedisService
  ) {}

  async findAll(): Promise<UserDto[]> {
    return await this.userRepository
      .find()
      .then((users) => users.map((user) => UserDto.fromEntity(user)));
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ email });

    return user;
  }

  async create(dto: CreateUserDto): Promise<UserDto> {
    const newUser = await this.userRepository.save(UserDto.toEntity(dto));

    return UserDto.fromEntity(newUser);
  }

  async updateEmailVerificationStatus(email: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ email: email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.emailVerified = true;

    return await this.userRepository.save(user).then((u) => {
      return UserDto.fromEntity(u);
    });
  }
}
