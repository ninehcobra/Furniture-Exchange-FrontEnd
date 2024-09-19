import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
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
