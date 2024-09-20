import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from '../../environments/env.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService<EnvVariables>,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
}
