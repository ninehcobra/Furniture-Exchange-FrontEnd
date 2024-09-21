import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from '../../environments/env.interface';

import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import * as utils from '../../utils';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/config/mail/mail.service';
import { RedisService } from 'src/config/cache/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService<EnvVariables>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly redisService: RedisService,
  ) {}

  async register(dto: RegisterDto) {
    // step 1: Check if user with the same email, phone number exists or not
    const user = await this.userService.findOneByEmail(dto.email);

    if (user) {
      throw new BadRequestException('User with the same email already exists');
    }

    // if not exists => create new user
    const hashedPassword = await utils.hashPassword(dto.password);

    // create new user
    const newUser = await this.userService.create({
      email: dto.email,
      password: hashedPassword,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phoneNumber: dto.phoneNumber,
    });

    if (!newUser) {
      throw new BadRequestException('Failed to create new user');
    }

    // step 2: Generate OTP store in redis (cache) and send email to user'email
    const otp = utils.generateOTP(5);

    const url = await this.sendEmailVerification(
      newUser.email,
      otp,
      newUser.firstName,
      newUser.lastName,
    );

    return {
      url,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findOneByEmail(dto.email);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    if (!user.emailVerified) {
      const otp = utils.generateOTP(5);

      const url = await this.sendEmailVerification(
        user.email,
        otp,
        user.firstName,
        user.lastName,
      );

      return {
        url,
      };
    }

    const payload = {
      email: user.email,
      role: user.role,
    };

    const { accessToken, refreshToken } = utils.createTokenPair(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async verify(q: string, otp: string) {
    const payload = this.jwtService.verify(q, {
      secret: this.config.get('MAIL_TOKEN_SECRET'),
    });

    if (!payload) {
      throw new Error('Invalid token');
    }

    const validOTP = await this.redisService.getOTP(payload.email);

    if (validOTP !== otp) {
      throw new Error('Invalid OTP');
    }

    this.redisService.delOTP(payload.email);

    await this.userService.updateEmailVerificationStatus(payload.email);

    return {
      success: true,
    };
  }

  private async sendEmailVerification(
    email: string,
    otp: string,
    firstName: string,
    lastName: string,
  ) {
    const payload = {
      email,
      firstName,
      lastName,
    };

    const mailToken = this.jwtService.sign(payload, {
      secret: this.config.get('MAIL_TOKEN_SECRET'),
      expiresIn: this.config.get('MAIL_TOKEN_EXPIRATION'),
    });

    const url = `${this.config.get('CLIENT_URL')}/auth/verify?q=${mailToken}`;

    await this.mailService.sendEmailVerification({
      to: email,
      name: `${firstName} ${lastName}`,
      link: url,
      otp,
    });

    await this.redisService.setOTP(email, otp);

    return url;
  }
}
