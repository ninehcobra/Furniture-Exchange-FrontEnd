import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from '../../environments/env.interface';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/config/mail/mail.service';
import { RedisService } from 'src/config/cache/redis.service';
import * as utils from '../../utils';

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
    // Check if user with the same email exists or not
    const user = await this.userService.findOneByEmail(dto.email);

    if (user) {
      throw new BadRequestException('User with the same email already exists');
    }

    // if not exists => create new user
    const hashedPassword = await utils.hashPassword(dto.password);

    const newUser = await this.userService.create({
      email: dto.email,
      password: hashedPassword,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phoneNumber: dto.phoneNumber,
      sex: dto.sex,
    });

    if (!newUser) {
      throw new BadRequestException('Failed to create new user');
    }

    // Generate OTP store in redis (caching) and send email to user'email
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
    // Check if user with the same email exists or not
    const user = await this.userService.findOneByEmail(dto.email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await utils.comparePasswords(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Wrong password');
    }

    // Check if user's email is verified or not
    // If not verified => send email verification link
    if (!user.emailVerified) {
      const otp = utils.generateOTP(5);

      const url = await this.sendEmailVerification(
        user.email,
        otp,
        user.firstName,
        user.lastName,
      );

      // Return only url to verify email
      return {
        message: 'Email not verified, verification link sent to your email',
        url,
      };
    }

    // If email is verified => generate token pair
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
    // Verify token
    const payload = await this.jwtService.verifyAsync(q, {
      secret: this.config.get('MAIL_TOKEN_SECRET'),
    });

    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    const validOTP = await this.redisService.getOTP(payload.email);

    if (validOTP !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    // Delete OTP from redis
    this.redisService.delOTP(payload.email);

    // Update user's email verification status
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
